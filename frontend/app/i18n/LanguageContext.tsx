'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { translations, Locale } from './translations';

interface LanguageContextType {
  locale: Locale;
  t: typeof translations['fr'];
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('fr');
  const toggleLanguage = () => setLocale(prev => prev === 'fr' ? 'en' : 'fr');
  return (
    <LanguageContext.Provider value={{ locale, t: translations[locale], toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
