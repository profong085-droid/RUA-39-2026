'use client';
import styles from './Hero.module.css';

export default function Hero() {
  const scrollToVideo = () => document.getElementById('video')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.heroLogos}>
            <img src="/logo/Untitled-1.png" alt="មហាវិទ្យាល័យកសិកម្ម" className={styles.heroLogo} />
          </div>
          <h1 className={styles.title}>
            អបអរសាទរ ការបញ្ចប់ការសិក្សា<br/>
            <span className={styles.highlight}>មហាវិទ្យាល័យកសិកម្ម</span>
          </h1>
          <p className={styles.subtitle}>
            បណ្ណសារឌីជីថលដែលប្រមូលផ្ដុំនូវការចងចាំ អនុស្សាវរីយ៍ និងភាពជោគជ័យរបស់និស្សិតជាន់ទី២៦ នៃសាកលវិទ្យាល័យភូមិន្ទកសិកម្ម។
          </p>
          <div className={styles.actions}>
            <button className="btn-primary" onClick={scrollToVideo}>
              ទស្សនាវីដេអូ
            </button>
            <button 
              className={styles.btnGlass}
              onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
            >
              កម្រងរូបភាព
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
