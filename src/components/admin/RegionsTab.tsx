import React from 'react';
import { Globe, Server, Wifi } from 'lucide-react';

const regions = [
  { name: 'Europe (Paris)', code: 'eu-west-3', status: 'active', latency: '12ms', tenants: 45, uptime: '99.99%' },
  { name: 'Afrique (Lagos)', code: 'af-south-1', status: 'active', latency: '28ms', tenants: 23, uptime: '99.95%' },
  { name: 'Moyen-Orient (Riyad)', code: 'me-south-1', status: 'active', latency: '35ms', tenants: 18, uptime: '99.97%' },
  { name: 'Amérique du Nord (N. Virginia)', code: 'us-east-1', status: 'active', latency: '89ms', tenants: 12, uptime: '99.99%' },
  { name: 'Asie-Pacifique (Singapour)', code: 'ap-southeast-1', status: 'planned', latency: '—', tenants: 0, uptime: '—' },
];

const RegionsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Globe className="w-5 h-5 text-blue-900" />
        <h2 className="text-lg font-bold text-gray-900">Déploiement Multi-Régions</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-4">
          <Server className="w-6 h-6 text-blue-600 mb-2" />
          <p className="text-2xl font-bold text-blue-700">4</p>
          <p className="text-sm text-blue-600">Régions actives</p>
        </div>
        <div className="bg-green-50 rounded-xl border border-green-200 p-4">
          <Wifi className="w-6 h-6 text-green-600 mb-2" />
          <p className="text-2xl font-bold text-green-700">99.97%</p>
          <p className="text-sm text-green-600">Uptime moyen</p>
        </div>
        <div className="bg-purple-50 rounded-xl border border-purple-200 p-4">
          <Globe className="w-6 h-6 text-purple-600 mb-2" />
          <p className="text-2xl font-bold text-purple-700">98</p>
          <p className="text-sm text-purple-600">Tenants actifs</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Région</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Code</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Statut</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Latence</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Tenants</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Uptime</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {regions.map((r) => (
              <tr key={r.code} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{r.name}</td>
                <td className="px-4 py-3 text-sm font-mono text-gray-500">{r.code}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${r.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    {r.status === 'active' ? 'Actif' : 'Planifié'}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{r.latency}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{r.tenants}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{r.uptime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegionsTab;