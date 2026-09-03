'use client';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { membersData } from '@/utils/membersData';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import styles from './Alumni.module.css';

export default function AlumniPage() {
  const { lang, t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);

  const getTranslatedName = (name) => {
    if (lang === 'km') return name;
    const map = {
      'ផូ ឆៃហ្វុង': 'Pho Chhayfong',
      'ឆន កុសល': 'Chhon Kosal',
      'ជួន ចាន់ឌីណា': 'Chuon Chandina',
      'ញ៉ ចាន់ថា': 'Nha Chantha',
      'បូ ភក្តី': 'Bo Phakdey',
      'ផូ ឆៃហ្វីន': 'Pho Chhayfin'
    };
    return map[name] || name;
  };

  return (
    <>
      <Navbar />
      <main className={styles.section}>
        <div className="container">
          <div className={styles.header}>
            <h1 className="section-title">អតីតនិស្សិត ជំនាន់ទី ៣៩</h1>
            <p className="section-subtitle">Royal University of Agriculture - Class of 2026</p>
          </div>
          
          <div className={styles.grid}>
            {membersData.map((member) => (
              <div 
                key={member.id} 
                className={styles.card}
                onClick={() => setSelectedImage(member)}
                style={{ cursor: 'pointer' }}
              >
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className={styles.avatar} 
                />
                <h3 className={styles.name}>{getTranslatedName(member.name)}</h3>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/" className={styles.backBtn}>
              {t.btnBackToHome || 'ត្រឡប់ទៅទំព័រដើមវិញ'}
            </Link>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.modalBackdrop}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className={styles.closeBtn}
                onClick={() => setSelectedImage(null)}
              >
                <FiX />
              </button>
              <img 
                src={selectedImage.image} 
                alt={selectedImage.name} 
                className={styles.modalImage} 
              />
              <h3 className={styles.modalName}>{getTranslatedName(selectedImage.name)}</h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
