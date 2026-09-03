'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '@/utils/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('km'); // default is Khmer

  // Optional: save language preference to localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('appLang');
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === 'km' ? 'en' : 'km';
    setLang(newLang);
    localStorage.setItem('appLang', newLang);
  };

  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem('appLang', newLang);
  };

  const t = translations[lang] || translations['en'];

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
