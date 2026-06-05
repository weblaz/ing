import React, { useState } from 'react';
import { Settings, Bell, Webhook, Key, Mail } from 'lucide-react';

const SettingsTab: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [slackNotifications, setSlackNotifications] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Settings className="w-5 h-5 text-blue-900" />
        <h2 className="text-lg font-bold text-gray-900">Paramètres de la plateforme</h2>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center space-x-2">
          <Bell className="w-4 h-4" />
          <span>Notifications</span>
        </h3>
        <div className="space-y-3">
          {[
            { label: 'Notifications email', value: emailNotifications, setter: setEmailNotifications },
            { label: 'Notifications Slack', value: slackNotifications, setter: setSlackNotifications },
            { label: 'Mode maintenance', value: maintenanceMode, setter: setMaintenanceMode },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{item.label}</span>
              <button
                onClick={() => item.setter(!item.value)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${item.value ? 'bg-blue-900' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${item.value ? 'translate-x-5' : 'translate-x-1'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center space-x-2">
          <Mail className="w-4 h-4" />
          <span>Configuration Email SMTP</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Serveur SMTP</label>
            <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="smtp.sendgrid.net" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Port</label>
            <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="587" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Utilisateur</label>
            <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="apikey" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Mot de passe</label>
            <input type="password" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="••••••••" />
          </div>
        </div>
        <button className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
          Enregistrer la configuration
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center space-x-2">
          <Key className="w-4 h-4" />
          <span>Clés API</span>
        </h3>
        <div className="space-y-2">
          {['sk_live_••••••••••••••••••••••••', 'sk_test_••••••••••••••••••••••••'].map((key, i) => (
            <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
              <span className="text-sm font-mono text-gray-700">{key}</span>
              <button className="text-xs text-red-600 hover:text-red-800">Révoquer</button>
            </div>
          ))}
        </div>
        <button className="flex items-center space-x-2 text-sm text-blue-900 hover:text-blue-700 font-medium">
          <Key className="w-4 h-4" />
          <span>Générer une nouvelle clé</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center space-x-2">
          <Webhook className="w-4 h-4" />
          <span>Webhooks</span>
        </h3>
        <div className="space-y-2">
          {[
            { url: 'https://api.example.com/webhook/new-tenant', event: 'tenant.created' },
            { url: 'https://api.example.com/webhook/payment', event: 'payment.completed' },
          ].map((wh, i) => (
            <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
              <div>
                <p className="text-sm font-mono text-gray-700">{wh.url}</p>
                <p className="text-xs text-gray-500">{wh.event}</p>
              </div>
              <button className="text-xs text-red-600 hover:text-red-800">Supprimer</button>
            </div>
          ))}
        </div>
        <button className="flex items-center space-x-2 text-sm text-blue-900 hover:text-blue-700 font-medium">
          <Webhook className="w-4 h-4" />
          <span>Ajouter un webhook</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsTab;