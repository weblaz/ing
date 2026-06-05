import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';
import { LANGUAGES } from '../data/localizationData';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useI18n();
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find((l) => l.code === language);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-1 text-gray-600 hover:text-blue-900 text-sm px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span>{current?.flag} {current?.nativeName}</span>
        <ChevronDown className="w-3 h-3" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLanguage(l.code); setOpen(false); }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2 ${language === l.code ? 'text-blue-900 font-medium bg-blue-50' : 'text-gray-700'}`}
            >
              <span>{l.flag}</span>
              <span>{l.nativeName}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;