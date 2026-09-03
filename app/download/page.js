'use client';
import styles from './Download.module.css';
import { FiDownload } from 'react-icons/fi';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import Link from 'next/link';

export default function DownloadPage() {
  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>ទាញយករូបឡូហ្គោ</h1>
          <p className={styles.desc}>
            អ្នកអាចទាញយករូបឡូហ្គោផ្លូវការរបស់សាកលវិទ្យាល័យភូមិន្ទកសិកម្ម (គុណភាពច្បាស់) សម្រាប់យកទៅប្រើប្រាស់បាននៅទីនេះ។
          </p>
          <div className={styles.logosGrid}>
            {/* Logo 1 */}
            <div className={styles.logoItem}>
              <h3 className={styles.logoLabel}>សាកលវិទ្យាល័យភូមិន្ទកសិកម្ម</h3>
              <img src="/logo/ដោនលូត/rua download.png" alt="RUA Logo" className={styles.logoPreview} />
              <a href="/logo/ដោនលូត/rua download.png" download="RUA_Logo.png" className={styles.downloadBtn}>
                <FiDownload /> ទាញយក
              </a>
            </div>

            {/* Logo 2 */}
            <div className={styles.logoItem}>
              <h3 className={styles.logoLabel}>មហាវិទ្យាល័យ វិទ្យាសាស្ត្រកសិកម្ម</h3>
              <img src="/logo/ដោនលូត/សកលវិទ្យាល័យភូមិន្ទកសិកម្ម.png" alt="Faculty of Agricultural Science Logo" className={styles.logoPreview} />
              <a href="/logo/ដោនលូត/សកលវិទ្យាល័យភូមិន្ទកសិកម្ម.png" download="Faculty_Agri_Science_Logo.png" className={styles.downloadBtn}>
                <FiDownload /> ទាញយក
              </a>
            </div>
          </div>

          <div>
            <Link href="/" className={styles.backLink}>
              ត្រឡប់ទៅទំព័រដើមវិញ
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
