'use client';
import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className="container">
        <div className={styles.layout}>
          
          <div className={styles.textContent}>
            <h2 className="section-title">ដំណើររឿងរបស់យើង</h2>
            <p className={styles.body}>
              រយៈពេល ៤ ឆ្នាំនេះគឺជាដំណើរដ៏អស្ចារ្យនៃការសិក្សារៀនសូត្រ ការលូតលាស់ និងមិត្តភាព។ ចាប់តាំងពីថ្ងៃដំបូងដែលយើងបោះជំហានចូលសាលា រហូតដល់ថ្ងៃអបអរសាទរនេះ គ្រប់ពេលវេលាទាំងអស់បានផាត់ពណ៌ជីវិតយើងឱ្យក្លាយជាយើងនៅថ្ងៃនេះ។
            </p>
            <p className={styles.body}>
              នៅពេលដែលយើងឈានជើងចូលទៅកាន់អនាគត យើងនឹងនាំយកទៅជាមួយនូវចំណេះដឹង បទពិសោធន៍ និងចំណងមិត្តភាពដែលមិនអាចបំបែកបានពីសាកលវិទ្យាល័យភូមិន្ទកសិកម្ម។
            </p>
            
            <div className={styles.metrics}>
              <div className={styles.metric}>
                <span className={styles.metricVal}>៤</span>
                <span className={styles.metricLabel}>ឆ្នាំ</span>
              </div>
              <div className={styles.metricDivider} />
              <div className={styles.metric}>
                <span className={styles.metricVal}>៨</span>
                <span className={styles.metricLabel}>ឆមាស</span>
              </div>
              <div className={styles.metricDivider} />
              <div className={styles.metric}>
                <span className={styles.metricVal}>∞</span>
                <span className={styles.metricLabel}>អនុស្សាវរីយ៍</span>
              </div>
            </div>
          </div>

          <div className={styles.infoCard}>
            <h3 className={styles.cardTitle}>ព័ត៌មានលម្អិត</h3>
            
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>ជំនាន់</span>
              <span className={styles.detailValue}>២០២២ — ២០២៦</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>សាកលវិទ្យាល័យ</span>
              <span className={styles.detailValue}>សាកលវិទ្យាល័យភូមិន្ទកសិកម្ម</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>ទីតាំង</span>
              <span className={styles.detailValue}>រាជធានីភ្នំពេញ, កម្ពុជា</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
