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

const photos = [
  { id: 1, title: 'ថ្ងៃបញ្ចប់ការសិក្សា', image: img1 },
  { id: 2, title: 'មិត្តភាព', image: img2 },
  { id: 3, title: 'អនុស្សាវរីយ៍', image: img3 },
  { id: 4, title: 'សមិទ្ធផល', image: img4 },
  { id: 5, title: 'ភាពជោគជ័យ', image: img5 },
  { id: 6, title: 'ជីវិតក្នុងសាលា', image: img6 },
  { id: 12, title: 'ភាពរីករាយ', image: img12 },
  { id: 7, title: 'ការអបអរសាទរ', image: img7 },
  { id: 8, title: 'ស្នាមញញឹម', image: img8 },
  { id: 9, title: 'ក្ដីសង្ឃឹម', image: img9 },
  { id: 10, title: 'មិត្តភក្តិ', image: img10 },
  { id: 11, title: 'វេលាល្អ', image: img11 },
];

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const { t } = useLanguage();

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
