import React from 'react';
import { Shield, AlertTriangle, CheckCircle, Lock } from 'lucide-react';

const alerts = [
  { type: 'warning', message: '3 tentatives de connexion échouées — IP: 192.168.1.45', time: 'Il y a 2h' },
  { type: 'info', message: 'Nouveau tenant créé — Enterprise Demo Company', time: 'Il y a 4h' },
  { type: 'success', message: 'Audit de sécurité complété — 0 vulnérabilité critique', time: 'Il y a 1j' },
];

const compliance = [
  { label: 'RGPD', status: 'Conforme', score: 98 },
  { label: 'ISO 27001', status: 'En cours', score: 82 },
  { label: 'SOC 2', status: 'Planifié', score: 65 },
  { label: 'PCI DSS', status: 'Non applicable', score: 0 },
];

const SecurityTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Shield className="w-5 h-5 text-blue-900" />
        <h2 className="text-lg font-bold text-gray-900">Sécurité & Conformité</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-xl border border-green-200 p-4">
          <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
          <p className="text-2xl font-bold text-green-700">17/17</p>
          <p className="text-sm text-green-600">Tables avec RLS activé</p>
        </div>
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-4">
          <Lock className="w-6 h-6 text-blue-600 mb-2" />
          <p className="text-2xl font-bold text-blue-700">100%</p>
          <p className="text-sm text-blue-600">Chiffrement en transit</p>
        </div>
        <div className="bg-orange-50 rounded-xl border border-orange-200 p-4">
          <AlertTriangle className="w-6 h-6 text-orange-600 mb-2" />
          <p className="text-2xl font-bold text-orange-700">3</p>
          <p className="text-sm text-orange-600">Alertes actives</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Alertes de sécurité</h3>
        <div className="space-y-3">
          {alerts.map((a, i) => (
            <div key={i} className={`flex items-start space-x-3 p-3 rounded-lg ${a.type === 'warning' ? 'bg-orange-50' : a.type === 'success' ? 'bg-green-50' : 'bg-blue-50'}`}>
              {a.type === 'warning' && <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />}
              {a.type === 'success' && <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />}
              {a.type === 'info' && <Shield className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />}
              <div className="flex-1">
                <p className="text-sm text-gray-800">{a.message}</p>
                <p className="text-xs text-gray-500 mt-0.5">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Conformité réglementaire</h3>
        <div className="space-y-3">
          {compliance.map((c) => (
            <div key={c.label} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-900 w-24">{c.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded font-medium ${c.status === 'Conforme' ? 'bg-green-100 text-green-700' : c.status === 'En cours' ? 'bg-orange-100 text-orange-700' : c.status === 'Planifié' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                  {c.status}
                </span>
              </div>
              {c.score > 0 && (
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-1.5">
                    <div className="bg-blue-900 h-1.5 rounded-full" style={{ width: `${c.score}%` }} />
                  </div>
                  <span className="text-xs text-gray-600">{c.score}%</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;