import React from 'react';
import { Database, Activity, HardDrive, Zap } from 'lucide-react';

const metrics = [
  { label: 'Tables', value: '17', icon: Database, color: 'text-blue-600' },
  { label: 'Connexions actives', value: '24', icon: Activity, color: 'text-green-600' },
  { label: 'Taille DB', value: '2.4 GB', icon: HardDrive, color: 'text-orange-600' },
  { label: 'Requêtes/sec', value: '142', icon: Zap, color: 'text-purple-600' },
];

const tables = [
  { name: 'company_passports', rows: '1,247', size: '48 MB', rls: true },
  { name: 'subcontracting_projects', rows: '892', size: '32 MB', rls: true },
  { name: 'talents', rows: '3,456', size: '128 MB', rls: true },
  { name: 'trainings', rows: '234', size: '16 MB', rls: true },
  { name: 'digital_identities', rows: '4,703', size: '176 MB', rls: true },
  { name: 'local_content_projects', rows: '156', size: '12 MB', rls: true },
  { name: 'esg_indicators', rows: '2,890', size: '96 MB', rls: true },
];

const DatabaseTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Database className="w-5 h-5 text-blue-900" />
        <h2 className="text-lg font-bold text-gray-900">Monitoring Base de données</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white rounded-xl border border-gray-200 p-4">
            <m.icon className={`w-5 h-5 ${m.color} mb-2`} />
            <p className="text-2xl font-bold text-gray-900">{m.value}</p>
            <p className="text-xs text-gray-500">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900">Tables Supabase</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Table</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Lignes</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Taille</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">RLS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tables.map((t) => (
              <tr key={t.name} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-mono text-gray-900">{t.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{t.rows}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{t.size}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">
                    Activé
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DatabaseTab;