'use client';
import { useState } from 'react';
import styles from './Gallery.module.css';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';

import img1 from '@/public/photo/IMG_9298 (3).JPG';
import img2 from '@/public/photo/IMG_9300 (2).JPG';
import img3 from '@/public/photo/IMG_9315 (4).JPG';
import img4 from '@/public/photo/IMG_9325.JPG';
import img5 from '@/public/photo/IMG_9349 (3).JPG';
import img6 from '@/public/photo/IMG_9350 (3).JPG';
import img12 from '@/public/photo/IMG_9352 (2).JPG';
import img7 from '@/public/photo/IMG_9353 (2).JPG';
import img8 from '@/public/photo/IMG_9356 (3).JPG';
import img9 from '@/public/photo/IMG_9357 (2).JPG';
import img10 from '@/public/photo/IMG_9254 (2).JPG';
import img11 from '@/public/photo/IMG_9303 (2).JPG';

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const { t } = useLanguage();

  const galleryItems = [
    { id: 1, title: t.galGraduation, image: img1 },
    { id: 2, title: t.galFriendship, image: img2 },
    { id: 3, title: t.galMemories, image: img3 },
    { id: 4, title: t.galAchievement, image: img4 },
    { id: 5, title: t.galSuccess, image: img5 },
    { id: 6, title: t.galSchoolLife, image: img6 },
    { id: 12, title: t.galJoy, image: img12 },
    { id: 7, title: t.galCelebration, image: img7 },
    { id: 8, title: t.galSmile, image: img8 },
    { id: 9, title: t.galHope, image: img9 },
    { id: 10, title: t.galFriends, image: img10 },
    { id: 11, title: t.galGoodTime, image: img11 },
  ];

  return (
    <section id="gallery" className={styles.section}>
      <div className="container">
        
        <div className={styles.header}>
          <h2 className="section-title">{t.galleryTitle}</h2>
        </div>

        <div className={styles.bentoGrid}>
          {photos.map((p) => (
            <div key={p.id} className={styles.card} onClick={() => setSelectedPhoto(p)}>
              <Image src={p.image} alt={p.title} className={styles.img} sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" />
            </div>
          ))}
        </div>

      </div>

      {selectedPhoto && (
        <div className={styles.modal} onClick={() => setSelectedPhoto(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setSelectedPhoto(null)}>✕</button>
            <Image src={selectedPhoto.image} alt={selectedPhoto.title} className={styles.modalImg} />
            <a href={selectedPhoto.image.src} download className="btn-primary" style={{ marginTop: '20px' }}>
              {t.btnDownload}
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
