import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { supabase } from '../../supabase/client';
import { useAuth } from '../../contexts/AuthContext';
import { CheckCircle, Star } from 'lucide-react';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 299,
    annualPrice: 249,
    desc: 'Pour les PME',
    features: ['5 utilisateurs', 'Passeport Entreprise', 'Sous-traitance', 'Support email', '5 Go de stockage'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 999,
    annualPrice: 833,
    desc: 'Pour les entreprises',
    features: ['25 utilisateurs', 'Tout Starter +', 'Talents & Formation', 'Identité Numérique', 'Support prioritaire', '50 Go de stockage'],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 2999,
    annualPrice: 2499,
    desc: 'Pour les grands groupes',
    features: ['100 utilisateurs', 'Tout Pro +', 'Contenu Local & ESG', 'Analytics avancés', 'SLA 99.9%', '500 Go de stockage'],
  },
  {
    id: 'government',
    name: 'Government',
    price: 0,
    annualPrice: 0,
    desc: 'Pour les institutions',
    features: ['Utilisateurs illimités', 'Tout Enterprise +', 'Déploiement dédié', 'Conformité RGPD', 'Support 24/7', 'Stockage illimité'],
  },
];

const Pricing: React.FC = () => {
  const { user } = useAuth();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [loading, setLoading] = useState<string | null>(null);

  const handleSelectPlan = async (planId: string) => {
    if (!user?.tenant) {
      toast.info('Connectez-vous pour choisir un plan');
      return;
    }
    setLoading(planId);
    try {
      const { error } = await supabase
        .from('tenants')
        .update({ subscription_plan: planId, billing_cycle: billingCycle })
        .eq('id', user.tenant);
      if (error) throw error;
      toast.success(`Plan ${planId} activé avec succès`);
    } catch (err: any) {
      toast.error(err.message || 'Erreur lors du changement de plan');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Tarifs</h1>
          <p className="text-blue-200 text-lg mb-8">Des plans adaptés à chaque taille d'organisation</p>
          <div className="inline-flex items-center bg-blue-800/50 border border-blue-600 rounded-xl p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${billingCycle === 'monthly' ? 'bg-white text-blue-900' : 'text-blue-200 hover:text-white'}`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${billingCycle === 'annual' ? 'bg-white text-blue-900' : 'text-blue-200 hover:text-white'}`}
            >
              Annuel <span className="text-yellow-400 text-xs ml-1">-17%</span>
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((p) => (
            <div key={p.id} className={`bg-white rounded-2xl border-2 p-6 ${p.popular ? 'border-blue-900 shadow-xl' : 'border-gray-200'}`}>
              {p.popular && (
                <div className="flex items-center space-x-1 mb-3">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-bold text-blue-900 uppercase">Populaire</span>
                </div>
              )}
              <h3 className="text-xl font-bold text-gray-900">{p.name}</h3>
              <p className="text-gray-500 text-sm mb-3">{p.desc}</p>
              <div className="mb-4">
                {p.id === 'government' ? (
                  <span className="text-2xl font-bold text-blue-900">Sur devis</span>
                ) : (
                  <>
                    <span className="text-3xl font-bold text-blue-900">
                      {billingCycle === 'annual' ? p.annualPrice : p.price}
                    </span>
                    <span className="text-gray-500 text-sm">€/mois</span>
                  </>
                )}
              </div>
              <ul className="space-y-2 mb-6">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center space-x-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              {p.id === 'government' ? (
                <Link
                  to="/contact?plan=government"
                  className="block text-center py-2 rounded-lg text-sm font-medium border border-blue-900 text-blue-900 hover:bg-blue-50 transition-colors"
                >
                  Nous contacter
                </Link>
              ) : (
                <button
                  onClick={() => handleSelectPlan(p.id)}
                  disabled={loading === p.id}
                  className={`w-full py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${p.popular ? 'bg-blue-900 text-white hover:bg-blue-800' : 'border border-blue-900 text-blue-900 hover:bg-blue-50'}`}
                >
                  {loading === p.id ? 'Activation...' : 'Choisir ce plan'}
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;