'use client';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';
import styles from './Testimonial.module.css';
import { membersData as testimonials } from '@/utils/membersData';

export default function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const { lang } = useLanguage();

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

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 4000); // Auto-slide every 4 seconds

    return () => clearInterval(timer);
  }, [currentIndex]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.carousel}>
          <div className={styles.contentWrapper}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className={styles.testimonialCard}
              >
                <Link href="/alumni">
                  <img 
                    src={currentTestimonial.image} 
                    alt={currentTestimonial.name} 
                    className={styles.avatarLarge} 
                  />
                </Link>
                <div className={styles.header}>
                  <h3 className={styles.name}>{getTranslatedName(currentTestimonial.name)}</h3>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className={styles.controls}>
            <button className={styles.navBtn} onClick={() => paginate(-1)}>
              <FiArrowLeft size={20} />
            </button>
            
            <div className={styles.thumbnails}>
              {(() => {
                const startIndex = Math.floor(currentIndex / 4) * 4;
                return testimonials.slice(startIndex, startIndex + 4).map((test, idx) => {
                  const actualIndex = startIndex + idx;
                  return (
                    <button 
                      key={test.id} 
                      className={`${styles.thumbBtn} ${actualIndex === currentIndex ? styles.active : ''}`}
                      onClick={() => goToSlide(actualIndex)}
                    >
                      <img src={test.image} alt={test.name} className={styles.thumbImg} />
                    </button>
                  );
                });
              })()}
            </div>

            <button className={styles.navBtn} onClick={() => paginate(1)}>
              <FiArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
