import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { UserPlus, X } from 'lucide-react';

const schema = z.object({
  firstName: z.string().min(2, 'Prénom requis'),
  lastName: z.string().min(2, 'Nom requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  role: z.string().min(1, 'Rôle requis'),
  mfaEnabled: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

interface UserManagementFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const UserManagementForm: React.FC<UserManagementFormProps> = ({ onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { mfaEnabled: false },
  });

  const onSubmit = async (_data: FormData) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    toast.success('Utilisateur créé avec succès');
    onSuccess?.();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center">
            <UserPlus className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Nouvel utilisateur</h2>
            <p className="text-sm text-gray-500">Ajouter un membre à l'équipe</p>
          </div>
        </div>
        {onCancel && (
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
            <input {...register('firstName')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
            <input {...register('lastName')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input {...register('email')} type="email" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
          <input {...register('phone')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rôle *</label>
          <select {...register('role')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Sélectionner un rôle</option>
            <option value="tenant_admin">Administrateur</option>
            <option value="project_manager">Chef de projet</option>
            <option value="viewer">Lecteur</option>
          </select>
          {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
        </div>
        <div className="flex items-center space-x-2">
          <input {...register('mfaEnabled')} type="checkbox" id="mfa" className="rounded border-gray-300" />
          <label htmlFor="mfa" className="text-sm text-gray-700">Activer l'authentification à deux facteurs (MFA)</label>
        </div>

        <div className="flex items-center justify-end space-x-3 pt-2">
          {onCancel && (
            <button type="button" onClick={onCancel} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
              Annuler
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors disabled:opacity-50"
          >
            {loading ? 'Création...' : 'Créer l\'utilisateur'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserManagementForm;