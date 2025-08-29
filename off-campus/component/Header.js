import Link from 'next/link';
import Image from 'next/image';
import styles from './styles/Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <div className={styles.logoContainer}>
            <div className={styles.logoImages}>
              <Link href="https://nitdgp.ac.in/">
                <Image
                  src="/images/nitdgplogo.png"
                  alt="NIT Durgapur Logo"
                  width={50}
                  height={50}
                  className={styles.logoImage}
                />
              </Link>

              <Link href="https://www.iicnitdgp.in/">
                <Image
                  src="/images/iiclogo.png"
                  alt="IIC Logo"
                  width={50}
                  height={50}
                  className={styles.logoImage}
                />
              </Link>
            </div>
            <Link href="/">
              <div className={styles.logoText}>
                <div className={styles.logoTitle}>Off-Campus Placements</div>
                <div className={styles.logoSubtitle}>Internship Cell • NIT Durgapur</div>
              </div>
            </Link>
          </div>
        </div>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Home</Link>
          {/* <Link href="/opportunities" className={styles.navLink}>Opportunities</Link> */}
          <Link href="/about" className={styles.navLink}>About</Link>
          <Link href="/contact" className={styles.navLink}>Contact</Link>
        </nav>
      </div>
    </header>
  );
}
