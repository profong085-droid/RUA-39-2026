'use client';
import styles from './Download.module.css';
import { FiDownload } from 'react-icons/fi';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function DownloadPage() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>{t.downloadTitle}</h1>
            <p className={styles.description}>
              {t.downloadDesc}
            </p>
          </div>

          <div className={styles.grid}>
            {/* Logo 1 */}
            <div className={styles.logoItem}>
              <h3 className={styles.logoLabel}>{t.downloadUniLabel}</h3>
              <img src="/logo/ដោនលូត/rua download.png" alt="RUA Logo" className={styles.logoPreview} />
              <a href="/logo/ដោនលូត/rua download.png" download="RUA_Logo.png" className={styles.downloadBtn}>
                <FiDownload /> {t.btnDownloadLogo}
              </a>
            </div>

            {/* Logo 2 */}
            <div className={styles.logoItem}>
              <h3 className={styles.logoLabel}>{t.downloadFacLabel}</h3>
              <img src="/logo/ដោនលូត/សកលវិទ្យាល័យភូមិន្ទកសិកម្ម.png" alt="Faculty of Agricultural Science Logo" className={styles.logoPreview} />
              <a href="/logo/ដោនលូត/សកលវិទ្យាល័យភូមិន្ទកសិកម្ម.png" download="Faculty_Agri_Science_Logo.png" className={styles.downloadBtn}>
                <FiDownload /> {t.btnDownloadLogo}
              </a>
            </div>
          </div>

          <div>
            <Link href="/" className={styles.backLink}>
              {t.btnBackToHome}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
