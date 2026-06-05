import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { supabase } from '../supabase/client';
import { useAuth } from '../contexts/AuthContext';
import { User, X } from 'lucide-react';

const schema = z.object({
  firstName: z.string().min(2, 'Prénom requis'),
  lastName: z.string().min(2, 'Nom requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  country: z.string().min(2, 'Pays requis'),
  jobTitle: z.string().min(2, 'Poste requis'),
  experience: z.string().optional(),
  industry: z.string().min(2, 'Secteur requis'),
  skills: z.string().optional(),
  certifications: z.string().optional(),
  availability: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface TalentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const TalentForm: React.FC<TalentFormProps> = ({ onSuccess, onCancel }) => {
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
      const skillsList = data.skills ? data.skills.split(',').map((s) => s.trim()).filter(Boolean) : [];
      const certList = data.certifications ? data.certifications.split(',').map((c) => c.trim()).filter(Boolean) : [];
      const blockchainHash = `0x${Math.random().toString(16).slice(2)}${Math.random().toString(16).slice(2)}`;
      const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`${data.firstName} ${data.lastName}`)}`;

      const { error } = await supabase.from('talents').insert([{
        tenant_id: user.tenant,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone || null,
        country: data.country,
        job_title: data.jobTitle,
        experience: data.experience ? parseInt(data.experience) : null,
        industry: data.industry,
        skills: skillsList,
        certifications: certList,
        availability: data.availability || null,
        trust_score: 70,
      }]);

      if (error) throw error;

      await supabase.from('digital_identities').insert([{
        tenant_id: user.tenant,
        identity_type: 'talent',
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        country: data.country,
        skills: skillsList,
        certifications: certList,
        trust_score: 70,
        blockchain_hash: blockchainHash,
        qr_code: qrCode,
      }]);

      toast.success('Profil talent créé avec succès');
      onSuccess?.();
    } catch (err: any) {
      toast.error(err.message || 'Erreur lors de la création');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Profil Talent</h2>
            <p className="text-sm text-gray-500">Créer un profil certifié</p>
          </div>
        </div>
        {onCancel && (
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
            <input {...register('firstName')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Prénom" />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
            <input {...register('lastName')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nom de famille" />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input {...register('email')} type="email" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="email@exemple.com" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <input {...register('phone')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="+33 6 00 00 00 00" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pays *</label>
            <input {...register('country')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="France" />
            {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Poste *</label>
            <input {...register('jobTitle')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ingénieur HSE" />
            {errors.jobTitle && <p className="text-red-500 text-xs mt-1">{errors.jobTitle.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expérience (années)</label>
            <input {...register('experience')} type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="5" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Secteur *</label>
            <input {...register('industry')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Pétrole & Gaz" />
            {errors.industry && <p className="text-red-500 text-xs mt-1">{errors.industry.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Compétences</label>
            <input {...register('skills')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Python, AutoCAD (séparées par virgule)" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Certifications</label>
            <input {...register('certifications')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="PMP, NEBOSH (séparées par virgule)" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Disponibilité</label>
            <select {...register('availability')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Sélectionner</option>
              <option value="immediate">Immédiate</option>
              <option value="1month">Dans 1 mois</option>
              <option value="3months">Dans 3 mois</option>
              <option value="6months">Dans 6 mois</option>
            </select>
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
            {loading ? 'Enregistrement...' : 'Enregistrer le profil'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TalentForm;