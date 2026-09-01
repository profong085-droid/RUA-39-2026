'use client';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    if (href === '#') window.scrollTo({ top: 0, behavior: 'smooth' });
    else document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#" className={styles.logoContainer} onClick={(e) => handleNav(e, '#')}>
          <img src="/logo/RUA.png" alt="RUA Logo" className={styles.navLogo} />
          <div className={styles.logoText}>
            RUA <span className={styles.tag}>២០២៦</span>
          </div>
        </a>

        <div className={styles.links}>
          <a href="#video" className={styles.link} onClick={(e) => handleNav(e, '#video')}>វីដេអូ</a>
          <a href="#gallery" className={styles.link} onClick={(e) => handleNav(e, '#gallery')}>រូបភាព</a>
          <a href="#about" className={styles.link} onClick={(e) => handleNav(e, '#about')}>អំពីពួកយើង</a>
        </div>
      </div>
    </nav>
  );
}
