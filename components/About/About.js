'use client';
import styles from './About.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { FiCalendar, FiBookOpen, FiMapPin } from 'react-icons/fi';

export default function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className={styles.section}>
      <div className="container">
        <div className={styles.layout}>
          
          <div className={styles.textContent}>
            <h2 className="section-title">{t.aboutTitle}</h2>
            <p className={styles.body}>
              {t.aboutP1}
            </p>
            <p className={styles.body}>
              {t.aboutP2}
            </p>
            <p className={styles.body}>
              {t.aboutP3}
            </p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{t.infoTitle}</h3>
            </div>
            
            <div className={styles.detailGrid}>
              <div className={styles.detailCard}>
                <div className={styles.detailIcon}><FiCalendar /></div>
                <div className={styles.detailContent}>
                  <span className={styles.detailLabel}>{t.infoGen}</span>
                  <span className={styles.detailValue}>២០២២ — ២០២៦</span>
                </div>
              </div>
              
              <div className={styles.detailCard}>
                <div className={styles.detailIcon}><FiBookOpen /></div>
                <div className={styles.detailContent}>
                  <span className={styles.detailLabel}>{t.infoUni}</span>
                  <span className={styles.detailValue}>{t.infoUniName}</span>
                </div>
              </div>
              
              <div className={styles.detailCard}>
                <div className={styles.detailIcon}><FiMapPin /></div>
                <div className={styles.detailContent}>
                  <span className={styles.detailLabel}>{t.infoLocation}</span>
                  <span className={styles.detailValue}>{t.infoLocationName}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
