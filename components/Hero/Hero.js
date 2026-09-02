'use client';
import styles from './Hero.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { FiPlayCircle, FiImage } from 'react-icons/fi';
import Image from 'next/image';

export default function Hero() {
  const { t } = useLanguage();
  const scrollToVideo = () => document.getElementById('video')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className={styles.hero}>
      <div className={styles.bannerSlider}>
        <Image src="/photo/IMG_9300 (2).JPG" alt="Banner 1" className={styles.bannerSlide} fill priority sizes="100vw" />
        <Image src="/photo/IMG_9315 (4).JPG" alt="Banner 2" className={styles.bannerSlide} fill loading="lazy" sizes="100vw" />
        <Image src="/photo/IMG_9298 (3).JPG" alt="Banner 3" className={styles.bannerSlide} fill loading="lazy" sizes="100vw" />
        <Image src="/photo/IMG_9254 (2).JPG" alt="Banner 4" className={styles.bannerSlide} fill loading="lazy" sizes="100vw" />
      </div>
      <div className="container">
        <div className={styles.content}>
          <h1 className={styles.title}>
            <span className={styles.generation}>{t.generation}</span>
          </h1>
          <p className={styles.subtitle}>
            {t.heroDesc}
          </p>
          <div className={styles.actions}>
            <button className={styles.btnPrimary} onClick={scrollToVideo}>
              <FiPlayCircle className={styles.btnIcon} />
              {t.btnWatchVideo}
            </button>
            <button 
              className={styles.btnSecondary}
              onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <FiImage className={styles.btnIcon} />
              {t.btnPhotoGallery}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
