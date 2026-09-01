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
          <a href="#" className={styles.link}>{t.footerFB}</a>
          <a href="#" className={styles.link}>{t.footerTG}</a>
          <a href="#" className={styles.link}>{t.footerYT}</a>
        </div>
      </div>
    </footer>
  );
}
