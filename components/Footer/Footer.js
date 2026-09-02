'use client';
import styles from './Footer.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { FiFacebook, FiSend, FiGlobe } from 'react-icons/fi';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <div className={styles.brandWrapper}>
            <img src="/logo/rua2.png" alt="RUA Logo" className={styles.logo} />
            <div className={styles.brandText}>
              <div className={styles.brand}>{t.footerBrand}</div>
              <p className={styles.copyright}>{t.footerCopyright}</p>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <a href="https://web.facebook.com/Phochaifong007/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Facebook">
            <FiFacebook className={styles.icon} />
            <span className={styles.socialText}>{t.footerFB}</span>
          </a>
          <a href="https://t.me/Phochaifong" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Telegram">
            <FiSend className={styles.icon} />
            <span className={styles.socialText}>{t.footerTG}</span>
          </a>
          <a href="https://chaifong.website/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Website">
            <FiGlobe className={styles.icon} />
            <span className={styles.socialText}>{t.footerWeb}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
