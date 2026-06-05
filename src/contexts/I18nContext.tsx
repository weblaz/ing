import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../supabase/client';
import { useAuth } from './AuthContext';
import { translations as localTranslations } from '../data/translations';

interface I18nContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur'];

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [language, setLanguageState] = useState('fr');
  const [dbTranslations, setDbTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    const stored = localStorage.getItem('language');
    if (stored) setLanguageState(stored);
  }, []);

  useEffect(() => {
    const loadTranslations = async () => {
      const { data } = await supabase
        .from('translations')
        .select('translation_key, translation_value')
        .eq('language_code', language);
      if (data && data.length > 0) {
        const map: Record<string, string> = {};
        data.forEach((row) => { map[row.translation_key] = row.translation_value; });
        setDbTranslations(map);
      }
    };
    loadTranslations();
  }, [language]);

  const setLanguage = async (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    if (user) {
      await supabase
        .from('user_language_preferences')
        .upsert({ user_id: user.id, tenant_id: user.tenant || null, language_code: lang }, { onConflict: 'user_id' });
    }
  };

  const t = (key: string): string => {
    if (dbTranslations[key]) return dbTranslations[key];
    const local = localTranslations[language as keyof typeof localTranslations];
    if (local && local[key as keyof typeof local]) return local[key as keyof typeof local] as string;
    const fr = localTranslations['fr'];
    if (fr && fr[key as keyof typeof fr]) return fr[key as keyof typeof fr] as string;
    return key;
  };

  const isRTL = RTL_LANGUAGES.includes(language);

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, isRTL }}>
      <div dir={isRTL ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
};