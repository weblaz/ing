import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { supabase } from '../supabase/client';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, X } from 'lucide-react';

const schema = z.object({
  trainingTitle: z.string().min(3, 'Titre requis'),
  trainingType: z.string().min(2, 'Type requis'),
  industry: z.string().min(2, 'Secteur requis'),
  duration: z.string().optional(),
  level: z.string().optional(),
  language: z.string().optional(),
  location: z.string().optional(),
  capacity: z.string().optional(),
  price: z.string().optional(),
  startDate: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface TrainingFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const TrainingForm: React.FC<TrainingFormProps> = ({ onSuccess, onCancel }) => {
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
      const { error } = await supabase.from('trainings').insert([{
        tenant_id: user.tenant,
        created_by: user.id,
        training_title: data.trainingTitle,
        training_type: data.trainingType,
        industry: data.industry,
        duration: data.duration ? parseInt(data.duration) : null,
        level: data.level || null,
        language: data.language || null,
        location: data.location || null,
        capacity: data.capacity ? parseInt(data.capacity) : null,
        enrolled: 0,
        price: data.price ? parseFloat(data.price) : null,
        start_date: data.startDate || null,
        status: 'upcoming',
      }]);

      if (error) throw error;
      toast.success('Formation publiée avec succès');
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
          <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Nouvelle Formation</h2>
            <p className="text-sm text-gray-500">Publier une formation certifiante</p>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Titre de la formation *</label>
          <input {...register('trainingTitle')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ex: Sécurité HSE Niveau 1" />
          {errors.trainingTitle && <p className="text-red-500 text-xs mt-1">{errors.trainingTitle.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
            <select {...register('trainingType')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Sélectionner</option>
              <option value="presentiel">Présentiel</option>
              <option value="elearning">E-learning</option>
              <option value="hybride">Hybride</option>
              <option value="certification">Certification</option>
            </select>
            {errors.trainingType && <p className="text-red-500 text-xs mt-1">{errors.trainingType.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Secteur *</label>
            <input {...register('industry')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Pétrole & Gaz" />
            {errors.industry && <p className="text-red-500 text-xs mt-1">{errors.industry.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Durée (heures)</label>
            <input {...register('duration')} type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="40" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
            <select {...register('level')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Sélectionner</option>
              <option value="debutant">Débutant</option>
              <option value="intermediaire">Intermédiaire</option>
              <option value="avance">Avancé</option>
              <option value="expert">Expert</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Langue</label>
            <select {...register('language')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="fr">Français</option>
              <option value="en">Anglais</option>
              <option value="ar">Arabe</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Localisation</label>
            <input {...register('location')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Paris, France" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Capacité (places)</label>
            <input {...register('capacity')} type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="20" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prix (€)</label>
            <input {...register('price')} type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="1500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
            <input {...register('startDate')} type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
            {loading ? 'Publication...' : 'Publier la formation'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TrainingForm;