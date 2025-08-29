# IIC NIT Durgapur - Off-Campus Placement Portal

A comprehensive web portal for managing off-campus placement opportunities at the Innovation and Incubation Center (IIC), NIT Durgapur. This platform enables administrators to post job/internship opportunities and students to browse and apply for positions from various companies.

## 🚀 Features

### 📋 Opportunity Management
- **Create Opportunities**: Admin can post new job/internship opportunities with detailed information
- **Update Opportunities**: Edit existing opportunities with a user-friendly interface
- **Comprehensive Details**: Support for multiple job types, compensation details, eligibility criteria, and contact information
- **Pagination**: Display 18 opportunities per page for better user experience

### 🔐 Authentication System
- **Multi-Provider Login**: Support for GitHub, Google, and Credentials-based authentication
- **Secure Password Hashing**: bcrypt implementation with salt for password security
- **Admin Access Control**: Restricted access for opportunity management

### 📱 User Interface
- **Responsive Design**: Mobile-first approach with professional styling
- **Modern UI/UX**: Clean and intuitive interface with CSS modules
- **Interactive Components**: Modal-based editing, toast notifications, and smooth navigation

### 📧 Communication Features
- **Contact Form**: Integrated contact system with email notifications
- **Email Integration**: Nodemailer setup for automated email responses

### 📄 Content Pages
- **About Page**: Comprehensive information about IIC NIT Durgapur
- **Profile Dashboard**: Admin profile with opportunity management tools
- **SEO Optimized**: Proper metadata for all pages

## 🛠️ Technology Stack

### Frontend
- **Next.js 15.5.2**: React framework with App Router and Turbopack
- **React**: Component-based UI library
- **CSS Modules**: Scoped styling with responsive design
- **React Hot Toast**: Notification system

### Backend
- **Next.js API Routes**: Server-side API endpoints
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: ODM for MongoDB integration

### Authentication
- **NextAuth.js v4.24.11**: Complete authentication solution
- **bcryptjs**: Password hashing and verification
- **JWT**: Session management

### Email Service
- **Nodemailer**: Email sending functionality
- **Gmail SMTP**: Email service integration

## 📁 Project Structure

```
off-campus/
├── app/
│   ├── about/                  # About page
│   ├── contact/               # Contact page
│   ├── login/                 # Login page
│   ├── profile/               # Admin dashboard
│   ├── opportunity/           # Opportunity detail pages
│   ├── api/
│   │   ├── auth/              # NextAuth configuration
│   │   ├── contact/           # Contact form API
│   │   └── oppertunity/       # Opportunity CRUD API
│   ├── globals.css            # Global styles
│   ├── layout.js              # Root layout
│   └── page.js                # Home page
├── component/
│   ├── Footer.js              # Footer component
│   ├── Header.js              # Header with navigation
│   ├── oppertunityCreate.js   # Create opportunity form
│   ├── oppertunityFetch.js    # Display opportunities with pagination
│   ├── oppertunityUpdate.js   # Update opportunity modal
│   └── sessionwrapper.js      # Session provider
├── lib/
│   └── db.js                  # MongoDB connection
├── model/
│   ├── oppertunity.js         # Opportunity schema
│   └── user.js                # User schema
└── public/                    # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB database
- Gmail account for email service

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sandipto729/IIC-off-campus-application.git
   cd IIC-off-campus-application/off-campus
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the `off-campus` directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   GITHUB_ID=your_github_oauth_id
   GITHUB_SECRET=your_github_oauth_secret
   GOOGLE_CLIENT_ID=your_google_oauth_client_id
   GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
   EMAIL_USER=your_gmail_address
   EMAIL_PASS=your_gmail_app_password
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

### Database Schema

#### Opportunity Schema
```javascript
{
  title: String,
  companyName: String,
  opportunityType: [String], // Job, Internship, etc.
  description: String,
  responsibilities: [String],
  requirements: [String],
  eligibility: {
    branches: [String],
    cgpa: Number,
    graduationYear: [Number]
  },
  compensation: {
    salary: String,
    stipend: String,
    benefits: [String]
  },
  location: String,
  applicationDeadline: Date,
  contact: {
    email: String,
    phone: String,
    website: String
  }
}
```

#### User Schema
```javascript
{
  name: String,
  email: String,
  password: String, // bcrypt hashed
  createdAt: Date
}
```

### Authentication Providers

The application supports three authentication methods:

1. **Credentials**: Email and password login for admin
2. **GitHub OAuth**: Social login integration
3. **Google OAuth**: Social login integration

### Email Configuration

Configure Gmail SMTP for contact form:
1. Enable 2-factor authentication on Gmail
2. Generate an App Password
3. Use the App Password in `EMAIL_PASS` environment variable

## 📖 Usage

### Admin Functions

1. **Login**: Access admin dashboard at `/login`
2. **Create Opportunities**: Use the opportunity creation form in profile
3. **Update Opportunities**: Edit existing opportunities via the update modal
4. **View Analytics**: Monitor opportunity statistics

### Student Functions

1. **Browse Opportunities**: View paginated list of available positions
2. **View Details**: Access detailed opportunity information
3. **Contact**: Use contact form for inquiries

## 🎨 Styling

The application uses CSS Modules for component-scoped styling:
- Responsive design for all screen sizes
- Professional color scheme matching institute branding
- Smooth animations and transitions
- Accessible UI components

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds for secure password storage
- **Session Management**: JWT-based session handling
- **CSRF Protection**: Built-in NextAuth CSRF protection
- **Environment Variables**: Sensitive data stored in environment variables
- **Input Validation**: Server-side validation for all forms

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables for Production
Ensure all environment variables are properly set in your production environment, especially:
- `NODE_ENV=production`
- Secure `NEXTAUTH_SECRET`
- Production MongoDB URI

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Innovation and Incubation Center (IIC)**  
National Institute of Technology Durgapur  
Email: iic@nitdgp.ac.in 
Website: [NIT Durgapur](https://www.iicnitdgp.in/)

## 🙏 Acknowledgments

- NIT Durgapur for supporting this initiative
- Next.js team for the excellent framework
- All contributors and maintainers

---

**Made with ❤️ for IIC NIT Durgapur**