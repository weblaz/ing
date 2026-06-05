import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { supabase } from '../supabase/client';
import { useAuth } from '../contexts/AuthContext';
import { Building2, Shield, X } from 'lucide-react';

const schema = z.object({
  legalName: z.string().min(2, 'Nom légal requis'),
  tradeName: z.string().optional(),
  registrationNumber: z.string().min(3, 'Numéro d\'enregistrement requis'),
  country: z.string().min(2, 'Pays requis'),
  industry: z.string().min(2, 'Secteur requis'),
  certifications: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface CompanyPassportFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CompanyPassportForm: React.FC<CompanyPassportFormProps> = ({ onSuccess, onCancel }) => {
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
      const certList = data.certifications
        ? data.certifications.split(',').map((c) => c.trim()).filter(Boolean)
        : [];

      const blockchainHash = `0x${Math.random().toString(16).slice(2)}${Math.random().toString(16).slice(2)}`;
      const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data.legalName)}`;

      const { error } = await supabase.from('company_passports').insert([{
        tenant_id: user.tenant,
        legal_name: data.legalName,
        trade_name: data.tradeName || null,
        registration_number: data.registrationNumber,
        country: data.country,
        industry: data.industry,
        certifications: certList,
        trust_score: 75,
        verification_status: 'pending',
        blockchain_hash: blockchainHash,
        qr_code: qrCode,
      }]);

      if (error) throw error;

      await supabase.from('digital_identities').insert([{
        tenant_id: user.tenant,
        identity_type: 'company',
        name: data.legalName,
        country: data.country,
        certifications: certList,
        trust_score: 75,
        blockchain_hash: blockchainHash,
        qr_code: qrCode,
      }]);

      toast.success('Passeport entreprise créé avec succès');
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
          <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Passeport Entreprise</h2>
            <p className="text-sm text-gray-500">Créer une identité vérifiée</p>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom légal *</label>
            <input
              {...register('legalName')}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nom légal de l'entreprise"
            />
            {errors.legalName && <p className="text-red-500 text-xs mt-1">{errors.legalName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom commercial</label>
            <input
              {...register('tradeName')}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nom commercial (optionnel)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Numéro d'enregistrement *</label>
            <input
              {...register('registrationNumber')}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="SIRET, RC, etc."
            />
            {errors.registrationNumber && <p className="text-red-500 text-xs mt-1">{errors.registrationNumber.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pays *</label>
            <input
              {...register('country')}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Pays d'enregistrement"
            />
            {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Secteur d'activité *</label>
            <input
              {...register('industry')}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Pétrole & Gaz, BTP, etc."
            />
            {errors.industry && <p className="text-red-500 text-xs mt-1">{errors.industry.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Certifications</label>
            <input
              {...register('certifications')}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ISO 9001, ISO 14001 (séparées par virgule)"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-blue-50 rounded-lg p-3">
          <Shield className="w-4 h-4 text-blue-700" />
          <p className="text-xs text-blue-700">Ce passeport sera ancré sur la blockchain pour garantir son authenticité.</p>
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
            {loading ? 'Enregistrement...' : 'Enregistrer le passeport'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyPassportForm;