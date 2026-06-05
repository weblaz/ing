import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {
  Building2, Users, BookOpen, BarChart3, Shield, Globe,
  ArrowRight, CheckCircle, Star, Zap
} from 'lucide-react';

const modules = [
  { icon: Building2, title: 'Passeport Entreprise', desc: 'Identité vérifiée sur blockchain pour chaque fournisseur', color: 'bg-blue-100 text-blue-700' },
  { icon: Users, title: 'Gestion des Talents', desc: 'Profils certifiés et matching intelligent par compétences', color: 'bg-purple-100 text-purple-700' },
  { icon: BookOpen, title: 'Formation Certifiante', desc: 'Catalogue de formations industrielles avec suivi de progression', color: 'bg-green-100 text-green-700' },
  { icon: BarChart3, title: 'Contenu Local & ESG', desc: 'Suivi des indicateurs ESG et conformité réglementaire', color: 'bg-orange-100 text-orange-700' },
  { icon: Shield, title: 'Sous-traitance', desc: 'Appels d\'offres et gestion des candidatures fournisseurs', color: 'bg-red-100 text-red-700' },
  { icon: Globe, title: 'Multi-Régions', desc: 'Déploiement sur 5 continents avec support 15 langues', color: 'bg-teal-100 text-teal-700' },
];

const plans = [
  { name: 'Starter', price: '299', desc: 'Pour les PME', features: ['5 utilisateurs', 'Passeport Entreprise', 'Sous-traitance', 'Support email'] },
  { name: 'Pro', price: '999', desc: 'Pour les entreprises', features: ['25 utilisateurs', 'Tout Starter +', 'Talents & Formation', 'Identité Numérique', 'Support prioritaire'], popular: true },
  { name: 'Enterprise', price: '2 999', desc: 'Pour les grands groupes', features: ['100 utilisateurs', 'Tout Pro +', 'Contenu Local & ESG', 'Analytics avancés', 'SLA 99.9%'] },
  { name: 'Government', price: 'Sur devis', desc: 'Pour les institutions', features: ['Utilisateurs illimités', 'Tout Enterprise +', 'Déploiement dédié', 'Conformité RGPD', 'Support 24/7'] },
];

const PublicHome: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-800/50 border border-blue-600 rounded-full px-4 py-1.5 mb-6">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-blue-100">Plateforme SaaS Multi-Tenants</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Gouvernance Industrielle<br />
            <span className="text-yellow-400">Intelligente</span>
          </h1>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Gérez vos fournisseurs, talents et conformité ESG sur une seule plateforme sécurisée, multi-tenants et multi-régions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/demo"
              className="bg-yellow-400 text-blue-900 font-bold px-8 py-4 rounded-xl hover:bg-yellow-300 transition-colors flex items-center space-x-2"
            >
              <span>Demander une démo</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="border border-blue-400 text-white font-medium px-8 py-4 rounded-xl hover:bg-blue-800 transition-colors"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-50 py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '2 847', label: 'Entreprises certifiées' },
            { value: '15 892', label: 'Talents qualifiés' },
            { value: '456', label: 'Formations actives' },
            { value: '5', label: 'Continents couverts' },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold text-blue-900">{s.value}</p>
              <p className="text-sm text-gray-600 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modules */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Modules intégrés</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Une suite complète d'outils pour la gouvernance industrielle moderne</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((m) => (
              <div key={m.title} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 ${m.color} rounded-xl flex items-center justify-center mb-4`}>
                  <m.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{m.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tarifs transparents</h2>
            <p className="text-gray-600">Choisissez le plan adapté à votre organisation</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((p) => (
              <div key={p.name} className={`bg-white rounded-2xl border-2 p-6 ${p.popular ? 'border-blue-900 shadow-lg' : 'border-gray-200'}`}>
                {p.popular && (
                  <div className="flex items-center space-x-1 mb-3">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-bold text-blue-900 uppercase">Populaire</span>
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900">{p.name}</h3>
                <p className="text-gray-500 text-sm mb-3">{p.desc}</p>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-blue-900">{p.price}</span>
                  {p.price !== 'Sur devis' && <span className="text-gray-500 text-sm">€/mois</span>}
                </div>
                <ul className="space-y-2 mb-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center space-x-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={p.name === 'Government' ? '/contact' : '/signup'}
                  className={`block text-center py-2 rounded-lg text-sm font-medium transition-colors ${p.popular ? 'bg-blue-900 text-white hover:bg-blue-800' : 'border border-blue-900 text-blue-900 hover:bg-blue-50'}`}
                >
                  {p.name === 'Government' ? 'Nous contacter' : 'Commencer'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-900 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à transformer votre gouvernance industrielle ?</h2>
          <p className="text-blue-200 mb-8">Rejoignez plus de 2 800 entreprises qui font confiance à I.N.G.I Synertran</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/demo" className="bg-yellow-400 text-blue-900 font-bold px-8 py-3 rounded-xl hover:bg-yellow-300 transition-colors">
              Demander une démo gratuite
            </Link>
            <Link to="/pricing" className="border border-blue-400 text-white px-8 py-3 rounded-xl hover:bg-blue-800 transition-colors">
              Voir les tarifs
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PublicHome;