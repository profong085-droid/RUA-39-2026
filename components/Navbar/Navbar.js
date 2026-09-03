'use client';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { FiMenu, FiX } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const { lang, changeLanguage, t } = useLanguage();

  const languages = [
    { code: 'km', label: 'ខ្មែរ', flagUrl: 'https://flagcdn.com/w40/kh.png' },
    { code: 'en', label: 'EN', flagUrl: 'https://flagcdn.com/w40/gb.png' },
    { code: 'vn', label: 'VN', flagUrl: 'https://flagcdn.com/w40/vn.png' },
    { code: 'cn', label: 'CN', flagUrl: 'https://flagcdn.com/w40/cn.png' },
    { code: 'in', label: 'IN', flagUrl: 'https://flagcdn.com/w40/in.png' },
    { code: 'jp', label: 'JP', flagUrl: 'https://flagcdn.com/w40/jp.png' },
    { code: 'kr', label: 'KR', flagUrl: 'https://flagcdn.com/w40/kr.png' },
    { code: 'ar', label: 'AE', flagUrl: 'https://flagcdn.com/w40/ae.png' }
  ];
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
    if (window.location.pathname !== '/') {
      window.location.href = '/' + (href === '#' ? '' : href);
      return;
    }
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
            <a href="/download" className={styles.link}>ទាញយក Logo</a>
            <div className={styles.langContainer}>
              <button className={`${styles.langBtn} ${styles.desktopOnly}`}>
                <img src={languages.find(l => l.code === lang)?.flagUrl || 'https://flagcdn.com/w40/gb.png'} alt="flag" className={styles.flagImgSmall} />
                {languages.find(l => l.code === lang)?.label || 'EN'}
              </button>
              
              <div className={styles.langDropdown}>
                <div className={styles.langTitle}>LANGUAGE / ភាសា</div>
                <div className={styles.langGrid}>
                  {languages.map(l => (
                    <button 
                      key={l.code} 
                      className={`${styles.langItem} ${lang === l.code ? styles.activeLang : ''}`}
                      onClick={() => { changeLanguage(l.code); setIsOpen(false); }}
                    >
                      <img src={l.flagUrl} alt={l.code} className={styles.flagImg} />
                      <span className={styles.langName}>{l.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
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
