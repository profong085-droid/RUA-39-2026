'use client';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { FiMenu, FiX } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const { lang, toggleLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    if (href === '#') window.scrollTo({ top: 0, behavior: 'smooth' });
    else document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#" className={styles.logoImg} onClick={(e) => handleNav(e, '#')}>
          <img src="/logo/RUA1.png" alt="RUA Logo" className={styles.navLogo} />
        </a>

        <a href="#" className={styles.logoTextCenter} onClick={(e) => handleNav(e, '#')}>
          RUA <span className={styles.tag}>២០២៦</span>
        </a>

        <div className={styles.rightSection}>
          <div className={`${styles.links} ${isOpen ? styles.open : ''}`}>
            <a href="#video" className={styles.link} onClick={(e) => handleNav(e, '#video')}>{t.navVideo}</a>
            <a href="#gallery" className={styles.link} onClick={(e) => handleNav(e, '#gallery')}>{t.navGallery}</a>
            <a href="#about" className={styles.link} onClick={(e) => handleNav(e, '#about')}>{t.navAbout}</a>
            
            <button className={styles.langBtn} onClick={toggleLanguage}>
              {lang === 'km' ? '🇬🇧 EN' : '🇰🇭 KM'}
            </button>
          </div>

          <div className={styles.navActions}>
            <button className={styles.menuBtn} onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
