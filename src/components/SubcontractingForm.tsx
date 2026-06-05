import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { supabase } from '../supabase/client';
import { useAuth } from '../contexts/AuthContext';
import { Briefcase, X } from 'lucide-react';

const schema = z.object({
  projectTitle: z.string().min(3, 'Titre requis'),
  projectType: z.string().min(2, 'Type requis'),
  industry: z.string().min(2, 'Secteur requis'),
  location: z.string().min(2, 'Localisation requise'),
  budget: z.string().optional(),
  deadline: z.string().optional(),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface SubcontractingFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const SubcontractingForm: React.FC<SubcontractingFormProps> = ({ onSuccess, onCancel }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (!user?.tenant) {
      toast.error('Tenant non configuré');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from('subcontracting_projects').insert([{
        tenant_id: user.tenant,
        created_by: user.id,
        project_title: data.projectTitle,
        project_type: data.projectType,
        industry: data.industry,
        location: data.location,
        budget: data.budget ? parseFloat(data.budget) : null,
        deadline: data.deadline || null,
        status: 'open',
        applications_count: 0,
      }]);

      if (error) throw error;
      toast.success('Demande de sous-traitance publiée');
      onSuccess?.();
    } catch (err: any) {
      toast.error(err.message || 'Erreur lors de la publication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Nouvelle demande</h2>
            <p className="text-sm text-gray-500">Publier un appel à sous-traitance</p>
          </div>
        </div>
        {onCancel && (
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Titre du projet *</label>
          <input
            {...register('projectTitle')}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: Construction pipeline offshore"
          />
          {errors.projectTitle && <p className="text-red-500 text-xs mt-1">{errors.projectTitle.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type de projet *</label>
            <select
              {...register('projectType')}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sélectionner</option>
              <option value="construction">Construction</option>
              <option value="maintenance">Maintenance</option>
              <option value="engineering">Ingénierie</option>
              <option value="logistics">Logistique</option>
              <option value="it">Informatique</option>
              <option value="consulting">Conseil</option>
            </select>
            {errors.projectType && <p className="text-red-500 text-xs mt-1">{errors.projectType.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Secteur *</label>
            <input
              {...register('industry')}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Pétrole & Gaz, BTP..."
            />
            {errors.industry && <p className="text-red-500 text-xs mt-1">{errors.industry.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Localisation *</label>
            <input
              {...register('location')}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ville, Pays"
            />
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Budget (€)</label>
            <input
              {...register('budget')}
              type="number"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Budget estimé"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date limite</label>
            <input
              {...register('deadline')}
              type="date"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
            {loading ? 'Publication...' : 'Publier la demande'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubcontractingForm;