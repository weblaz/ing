import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabase/client';
import Header from '../components/Header';
import CompanyPassportForm from '../components/CompanyPassportForm';
import { Building2, Plus, Shield, CheckCircle, Clock } from 'lucide-react';

interface Passport {
  id: string;
  legal_name: string;
  trade_name: string | null;
  registration_number: string;
  country: string;
  industry: string;
  certifications: string[] | null;
  trust_score: number | null;
  verification_status: string | null;
  blockchain_hash: string | null;
  qr_code: string | null;
  created_at: string;
}

const Passeport: React.FC = () => {
  const { user } = useAuth();
  const [passports, setPassports] = useState<Passport[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchPassports = async () => {
    if (!user?.tenant) { setLoading(false); return; }
    const { data } = await supabase
      .from('company_passports')
      .select('*')
      .eq('tenant_id', user.tenant)
      .order('created_at', { ascending: false });
    setPassports(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchPassports(); }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Passeport Entreprise</h1>
              <p className="text-sm text-gray-500">Identités vérifiées sur blockchain</p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Nouveau passeport</span>
          </button>
        </div>

        {showForm && (
          <div className="mb-8">
            <CompanyPassportForm
              onSuccess={() => { setShowForm(false); fetchPassports(); }}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : passports.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun passeport créé</h3>
            <p className="text-gray-500 text-sm mb-4">Créez votre premier passeport entreprise pour commencer</p>
            <button onClick={() => setShowForm(true)} className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800">
              Créer un passeport
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {passports.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900">{p.legal_name}</h3>
                    {p.trade_name && <p className="text-sm text-gray-500">{p.trade_name}</p>}
                  </div>
                  <div className="flex items-center space-x-1">
                    {p.verification_status === 'verified' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Clock className="w-5 h-5 text-orange-400" />
                    )}
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Pays</span>
                    <span className="font-medium text-gray-900">{p.country}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Secteur</span>
                    <span className="font-medium text-gray-900">{p.industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Score de confiance</span>
                    <span className="font-bold text-blue-900">{p.trust_score || 0}/100</span>
                  </div>
                </div>
                {p.certifications && p.certifications.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {p.certifications.map((cert) => (
                      <span key={cert} className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">{cert}</span>
                    ))}
                  </div>
                )}
                {p.blockchain_hash && (
                  <div className="mt-3 flex items-center space-x-1 text-xs text-gray-400">
                    <Shield className="w-3 h-3" />
                    <span className="font-mono truncate">{p.blockchain_hash.slice(0, 20)}...</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Passeport;