import Link from 'next/link';
import styles from './styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>IIC Off-Campus Placements</h3>
            <p className={styles.description}>
              Your gateway to exciting off-campus opportunities and internships.
              Stay updated with the latest placement drives and career opportunities.
            </p>
          </div>
          
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Quick Links</h3>
            <div className={styles.links}>
              {/* <Link href="/" className={styles.link}>Home</Link> */}
              <Link href="/" className={styles.link}>All Opportunities</Link>
              <Link href="/about" className={styles.link}>About IIC</Link>
            </div>
          </div>
          
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Contact</h3>
            <div className={styles.contact}>
              <p>NIT Durgapur</p>
              <p>West Bengal, India</p>
              <p>Email: iic@nitdgp.ac.in</p>
            </div>
          </div>
        </div>
        
        <div className={styles.adminSection}>
          <Link href="/login" className={styles.adminLink}>
            Admin Login
          </Link>
        </div>
        
        <div className={styles.bottom}>
          <div className={styles.copyright}>
            <p>© 2024 IIC NIT Durgapur. All rights reserved.</p>
          </div>
          <div className={styles.credits}>
            <p>Made and maintained by Technical Team IIC NIT DGP</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
