'use client';
import styles from './VideoPlayer.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function VideoPlayer() {
  const { t } = useLanguage();
  const youtubeId = 'Q_WtKnSZ8qk';

  return (
    <section id="video" className={styles.section}>
      <div className="container">
        
        <div className={styles.header}>
          <div>
            <h2 className="section-title">{t.videoTitle}</h2>
            <p className="section-subtitle">{t.videoDesc}</p>
          </div>
        </div>

        <div className={styles.videoCard}>
          <div className={styles.videoWrapper}>
            <iframe
              className={styles.iframe}
              src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&controls=0&disablekb=1`}
              allow="autoplay; fullscreen"
              sandbox="allow-scripts allow-same-origin allow-presentation"
            />
          </div>
        </div>
        
      </div>
    </section>
  );
}
