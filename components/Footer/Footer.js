'use client';
import styles from './Footer.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <div className={styles.brand}>{t.footerBrand}</div>
          <p className={styles.copyright}>{t.footerCopyright}</p>
        </div>
        <div className={styles.right}>
          <a href="https://web.facebook.com/Phochaifong007/" target="_blank" rel="noopener noreferrer" className={styles.link}>{t.footerFB}</a>
          <a href="https://t.me/Phochaifong" target="_blank" rel="noopener noreferrer" className={styles.link}>{t.footerTG}</a>
          <a href="https://chaifong.website/" target="_blank" rel="noopener noreferrer" className={styles.link}>{t.footerWeb}</a>
        </div>
      </div>
    </footer>
  );
}
