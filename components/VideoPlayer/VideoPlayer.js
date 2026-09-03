'use client';
import styles from './VideoPlayer.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function VideoPlayer() {
  const { t } = useLanguage();
  const youtubeId = '1FzL7gfsEJ0';

  return (
    <section id="video" className={styles.section}>
      <div className="container">
        
        <div className={styles.header}>
          <div>
            <h2 className="section-title">{t.videoTitle}</h2>
          </div>
        </div>

        <div className={styles.videoCard}>
          <div className={styles.videoWrapper}>
            <iframe
              className={styles.iframe}
              src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
        
      </div>
    </section>
  );
}
