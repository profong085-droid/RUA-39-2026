'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import styles from './Testimonial.module.css';

const testimonials = [
  {
    id: 1,
    name: 'ផូ ឆៃហ្វុង',
    image: '/photo profile/ផូ ឆៃហ្វុង.jpg',
  },
  {
    id: 2,
    name: 'ឆន កុសល',
    image: '/photo profile/ឆន កុសល.jpg',
  },
  {
    id: 3,
    name: 'ជួន ចាន់ឌីណា',
    image: '/photo profile/ជួន ចាន់ឌីណា.jpg',
  },
  {
    id: 4,
    name: 'ញ៉ ចាន់ថា',
    image: '/photo profile/ញ៉ ចាន់ថា.jpg',
  },
  {
    id: 5,
    name: 'បូ ភក្តី',
    image: '/photo profile/បូ ភក្តី.jpg',
  },
  {
    id: 6,
    name: 'ផូ ឆៃហ្វីន',
    image: '/photo profile/ផូ ឆៃហ្វីន.jpg',
  }
];

export default function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

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
                <img 
                  src={currentTestimonial.image} 
                  alt={currentTestimonial.name} 
                  className={styles.avatarLarge} 
                />
                <div className={styles.header}>
                  <h3 className={styles.name}>{currentTestimonial.name}</h3>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className={styles.controls}>
            <button className={styles.navBtn} onClick={() => paginate(-1)}>
              <FiArrowLeft size={20} />
            </button>
            
            <div className={styles.thumbnails}>
              {testimonials.map((test, idx) => (
                <button 
                  key={test.id} 
                  className={`${styles.thumbBtn} ${idx === currentIndex ? styles.active : ''}`}
                  onClick={() => goToSlide(idx)}
                >
                  <img src={test.image} alt={test.name} className={styles.thumbImg} />
                </button>
              ))}
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
