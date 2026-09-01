'use client';
import { useState } from 'react';
import styles from './Gallery.module.css';

const photos = [
  { id: 1, title: 'ថ្ងៃបញ្ចប់ការសិក្សា', url: '/photo/IMG_9298 (3).JPG', size: 'large' },
  { id: 2, title: 'មិត្តភាព', url: '/photo/IMG_9300 (2).JPG', size: 'small' },
  { id: 3, title: 'អនុស្សាវរីយ៍', url: '/photo/IMG_9315 (4).JPG', size: 'tall' },
  { id: 4, title: 'សមិទ្ធផល', url: '/photo/IMG_9325.JPG', size: 'wide' },
  { id: 5, title: 'ភាពជោគជ័យ', url: '/photo/IMG_9349 (3).JPG', size: 'small' },
  { id: 6, title: 'ជីវិតក្នុងសាលា', url: '/photo/IMG_9350 (3).JPG', size: 'small' },
  { id: 7, title: 'ការអបអរសាទរ', url: '/photo/IMG_9353 (2).JPG', size: 'large' },
  { id: 8, title: 'ស្នាមញញឹម', url: '/photo/IMG_9356 (3).JPG', size: 'wide' },
  { id: 9, title: 'ក្ដីសង្ឃឹម', url: '/photo/IMG_9357 (2).JPG', size: 'tall' },
];

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section id="gallery" className={styles.section}>
      <div className="container">
        
        <div className={styles.header}>
          <h2 className="section-title">រូបភាព</h2>
          <p className="section-subtitle">កម្រងរូបភាពអនុស្សាវរីយ៍ក្នុងថ្ងៃបញ្ចប់ការសិក្សា។</p>
        </div>

        <div className={styles.bentoGrid}>
          {photos.map((p) => (
            <div key={p.id} className={styles.card} onClick={() => setSelectedPhoto(p)}>
              <img src={p.url} alt={p.title} className={styles.img} />
            </div>
          ))}
        </div>

      </div>

      {selectedPhoto && (
        <div className={styles.modal} onClick={() => setSelectedPhoto(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setSelectedPhoto(null)}>✕</button>
            <img src={selectedPhoto.url} alt={selectedPhoto.title} className={styles.modalImg} />
            <a href={selectedPhoto.url} download className="btn-primary" style={{ marginTop: '20px' }}>
              ទាញយករូបភាព (Download)
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
