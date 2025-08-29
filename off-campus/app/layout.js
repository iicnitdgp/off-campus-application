import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/component/sessionwrapper";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "IIC Off-Campus Placements | NIT Durgapur",
  description: "Gateway to exciting off-campus opportunities and internships at NIT Durgapur",
  icons: {
    icon: '/images/iiclogo.png',
    shortcut: '/images/iiclogo.png',
    apple: '/images/iiclogo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body className={inter.className} suppressHydrationWarning={true}>
          <div className="app-container">
            <Header />
            <main className="main-content">
              {children}
            </main>
            <Footer />
          </div>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </body>
      </SessionWrapper>
    </html>
  );
}