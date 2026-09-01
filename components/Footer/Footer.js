'use client';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <div className={styles.brand}>ស.ភ.ក ២០២៦</div>
          <p className={styles.copyright}>© 2026 រក្សាសិទ្ធិគ្រប់យ៉ាង។</p>
        </div>
        <div className={styles.right}>
          <a href="#" className={styles.link}>ហ្វេសប៊ុក</a>
          <a href="#" className={styles.link}>តេឡេក្រាម</a>
          <a href="#" className={styles.link}>យូធូប</a>
        </div>
      </div>
    </footer>
  );
}
