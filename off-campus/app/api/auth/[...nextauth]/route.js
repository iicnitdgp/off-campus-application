import NextAuth from 'next-auth'
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import connectDB from '@/lib/db'
import User from '@/model/user'
import bcrypt from 'bcryptjs'

const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          await connectDB();
          
          // Find user by email
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error('No user found with this email');
          }
          
          // Check if user has a password (for credentials login)
          if (!user.password) {
            throw new Error('Please use social login for this account');
          }
          
          // Compare password with bcrypt
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordValid) {
            throw new Error('Invalid password');
          }
          
          // Return user object for successful authentication
          return { 
            id: user._id.toString(), 
            name: user.name, 
            email: user.email 
          };
        } catch (error) {
          console.error('Authentication error:', error.message);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // For credentials provider, we already check in authorize function
      if (account.provider === 'credentials') {
        return true;
      }
      // Check DB for OAuth providers (Google, GitHub)
      await connectDB();
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        // User not found in DB, redirect to login with error message
        return '/login';
      }
      return true;
    },
    async jwt({ token, user }) {
      // Add database ID to JWT token
      if (user) {
        await connectDB();
        const dbUser = await User.findOne({ email: user.email });
        if (dbUser) {
          token.id = dbUser._id.toString();
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Add database ID to session
      if (token.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, 
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, 
    updateAge: 24 * 60 * 60, 
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, 
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production' 
      }
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST, authOptions }