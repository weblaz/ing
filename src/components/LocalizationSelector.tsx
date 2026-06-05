import React, { useState } from 'react';
import { Globe, X, Check } from 'lucide-react';
import { useLocalization } from '../contexts/LocalizationContext';
import { LANGUAGES, COUNTRIES, CITIES_BY_COUNTRY, CURRENCIES } from '../data/localizationData';

interface LocalizationSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const LocalizationSelector: React.FC<LocalizationSelectorProps> = ({ isOpen, onClose }) => {
  const { settings, updateSettings } = useLocalization();
  const [local, setLocal] = useState({ ...settings });

  if (!isOpen) return null;

  const selectedCountry = COUNTRIES.find((c) => c.name === local.country);
  const cities = selectedCountry ? CITIES_BY_COUNTRY[selectedCountry.code] || [] : [];

  const handleSave = () => {
    updateSettings(local);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-blue-900" />
            <h2 className="text-lg font-bold text-gray-900">Paramètres de localisation</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Langue</label>
            <select
              value={local.language}
              onChange={(e) => setLocal({ ...local, language: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>{l.flag} {l.nativeName}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
            <select
              value={local.country}
              onChange={(e) => {
                const country = COUNTRIES.find((c) => c.name === e.target.value);
                setLocal({
                  ...local,
                  country: e.target.value,
                  currency: country?.currency || local.currency,
                  timezone: country?.timezone || local.timezone,
                  city: '',
                });
              }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          {cities.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
              <select
                value={local.city}
                onChange={(e) => setLocal({ ...local, city: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionner une ville</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Devise</label>
            <select
              value={local.currency}
              onChange={(e) => setLocal({ ...local, currency: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>{c.symbol} — {c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
            Annuler
          </button>
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
          >
            <Check className="w-4 h-4" />
            <span>Enregistrer</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocalizationSelector;