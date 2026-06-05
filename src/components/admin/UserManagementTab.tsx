import React, { useState } from 'react';
import { Users, Plus, Edit, Trash2, Shield } from 'lucide-react';
import UserManagementForm from '../UserManagementForm';

const MOCK_USERS = [
  { id: '1', name: 'Sophie Moreau', email: 'sophie@starter.com', role: 'tenant_admin', status: 'active', mfa: true },
  { id: '2', name: 'Alexandre Fontaine', email: 'alex@pro.com', role: 'project_manager', status: 'active', mfa: false },
  { id: '3', name: 'Nadia Benali', email: 'nadia@enterprise.com', role: 'tenant_admin', status: 'active', mfa: true },
  { id: '4', name: 'Karim Al-Mansouri', email: 'karim@gov.com', role: 'super_admin', status: 'active', mfa: true },
  { id: '5', name: 'Marie Dupont', email: 'marie@starter.com', role: 'viewer', status: 'inactive', mfa: false },
];

const roleColors: Record<string, string> = {
  super_admin: 'bg-red-100 text-red-700',
  tenant_admin: 'bg-blue-100 text-blue-700',
  project_manager: 'bg-green-100 text-green-700',
  viewer: 'bg-gray-100 text-gray-700',
};

const UserManagementTab: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-blue-900" />
          <h2 className="text-lg font-bold text-gray-900">Gestion des utilisateurs</h2>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Nouvel utilisateur</span>
        </button>
      </div>

      {showForm && (
        <UserManagementForm
          onSuccess={() => setShowForm(false)}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Utilisateur</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Rôle</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Statut</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">MFA</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {MOCK_USERS.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{u.name}</p>
                    <p className="text-xs text-gray-500">{u.email}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${roleColors[u.role] || 'bg-gray-100 text-gray-700'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${u.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {u.status === 'active' ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {u.mfa ? (
                    <Shield className="w-4 h-4 text-green-600" />
                  ) : (
                    <span className="text-xs text-gray-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <button className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementTab;