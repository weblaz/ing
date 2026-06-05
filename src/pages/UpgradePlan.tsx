import React from 'react';
    import { Link } from 'react-router-dom';
    import Header from '../components/Header';
    import Footer from '../components/Footer';
    import { useSubscription } from '../contexts/SubscriptionContext';
    import { ArrowRight, CheckCircle, Star, Zap } from 'lucide-react';
    
    const plans = [
      {
        id: 'starter',
        name: 'Starter',
        price: 299,
        desc: 'Pour les PME',
        features: ['5 utilisateurs', 'Passeport Entreprise', 'Sous-traitance', 'Support email', '5 Go de stockage'],
      },
      {
        id: 'pro',
        name: 'Pro',
        price: 999,
        desc: 'Pour les entreprises',
        features: ['25 utilisateurs', 'Tout Starter +', 'Talents & Formation', 'Identité Numérique', 'Support prioritaire', '50 Go de stockage'],
        popular: true,
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: 2999,
        desc: 'Pour les grands groupes',
        features: ['100 utilisateurs', 'Tout Pro +', 'Contenu Local & ESG', 'Analytics avancés', 'SLA 99.9%', '500 Go de stockage'],
      },
      {
        id: 'government',
        name: 'Government',
        price: 0,
        desc: 'Pour les institutions',
        features: ['Utilisateurs illimités', 'Tout Enterprise +', 'Déploiement dédié', 'Conformité RGPD', 'Support 24/7', 'Stockage illimité'],
      },
    ];
    
    const UpgradePlan: React.FC = () => {
      const { plan } = useSubscription();
    
      return (
        <div className="min-h-screen bg-white">
          <Header />
    
          <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center space-x-2 bg-blue-800/50 border border-blue-600 rounded-full px-4 py-1.5 mb-6">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-blue-100">Débloquez plus de fonctionnalités</span>
              </div>
              <h1 className="text-4xl font-bold mb-4">Mettre à niveau votre plan</h1>
              <p className="text-blue-200 text-lg">
                Vous êtes actuellement sur le plan <span className="font-bold capitalize">{plan}</span>
              </p>
            </div>
          </section>
    
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {plans.map((p) => {
                  const isCurrentPlan = p.id === plan;
                  return (
                    <div
                      key={p.id}
                      className={`bg-white rounded-2xl border-2 p-6 transition-all ${
                        p.popular
                          ? 'border-blue-900 shadow-xl'
                          : isCurrentPlan
                          ? 'border-green-500 shadow-lg'
                          : 'border-gray-200'
                      }`}
                    >
                      {p.popular && (
                        <div className="flex items-center space-x-1 mb-3">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs font-bold text-blue-900 uppercase">Populaire</span>
                        </div>
                      )}
                      {isCurrentPlan && (
                        <div className="flex items-center space-x-1 mb-3">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-xs font-bold text-green-700 uppercase">Plan actuel</span>
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-gray-900">{p.name}</h3>
                      <p className="text-gray-500 text-sm mb-4">{p.desc}</p>
                      <div className="mb-6">
                        {p.id === 'government' ? (
                          <span className="text-2xl font-bold text-blue-900">Sur devis</span>
                        ) : (
                          <>
                            <span className="text-3xl font-bold text-blue-900">{p.price}</span>
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
                      {isCurrentPlan ? (
                        <button disabled className="w-full py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-500 cursor-default">
                          Plan actuel
                        </button>
                      ) : p.id === 'government' ? (
                        <Link
                          to="/contact?plan=government"
                          className="flex items-center justify-center space-x-2 w-full py-2 rounded-lg text-sm font-medium border border-blue-900 text-blue-900 hover:bg-blue-50 transition-colors"
                        >
                          <span>Nous contacter</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      ) : (
                        <Link
                          to="/pricing"
                          className={`flex items-center justify-center space-x-2 w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                            p.popular
                              ? 'bg-blue-900 text-white hover:bg-blue-800'
                              : 'border border-blue-900 text-blue-900 hover:bg-blue-50'
                          }`}
                        >
                          <span>Choisir ce plan</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
    
          <Footer />
        </div>
      );
    };
    
    export default UpgradePlan;