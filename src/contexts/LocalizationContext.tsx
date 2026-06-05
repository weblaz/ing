import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LocalizationSettings {
  language: string;
  country: string;
  city: string;
  currency: string;
  timezone: string;
}

interface LocalizationContextType {
  settings: LocalizationSettings;
  updateSettings: (s: Partial<LocalizationSettings>) => void;
}

const defaults: LocalizationSettings = {
  language: 'fr',
  country: 'France',
  city: 'Paris',
  currency: 'EUR',
  timezone: 'Europe/Paris',
};

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<LocalizationSettings>(defaults);

  useEffect(() => {
    const stored = localStorage.getItem('localization');
    if (stored) {
      try {
        setSettings({ ...defaults, ...JSON.parse(stored) });
      } catch {
        setSettings(defaults);
      }
    }
  }, []);

  const updateSettings = (s: Partial<LocalizationSettings>) => {
    const next = { ...settings, ...s };
    setSettings(next);
    localStorage.setItem('localization', JSON.stringify(next));
  };

  return (
    <LocalizationContext.Provider value={{ settings, updateSettings }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => {
  const ctx = useContext(LocalizationContext);
  if (!ctx) throw new Error('useLocalization must be used within LocalizationProvider');
  return ctx;
};