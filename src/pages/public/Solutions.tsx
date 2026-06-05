import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Building2, Users, BookOpen, BarChart3, Shield, Globe, CheckCircle } from 'lucide-react';

const solutions = [
  {
    icon: Building2,
    title: 'Passeport Entreprise KYB',
    desc: 'Vérification d\'identité d\'entreprise (Know Your Business) avec ancrage blockchain. Chaque fournisseur obtient un passeport numérique infalsifiable.',
    features: ['Vérification SIRET/RC', 'Ancrage blockchain Ethereum', 'QR Code de vérification', 'Score de confiance automatique'],
    color: 'bg-blue-900',
  },
  {
    icon: Shield,
    title: 'Sous-traitance Intelligente',
    desc: 'Publiez des appels d\'offres et recevez des candidatures qualifiées de fournisseurs vérifiés. Matching IA basé sur les compétences et certifications.',
    features: ['Appels d\'offres structurés', 'Matching IA fournisseurs', 'Gestion des candidatures', 'Évaluation automatique'],
    color: 'bg-orange-500',
  },
  {
    icon: Users,
    title: 'Gestion des Talents',
    desc: 'Créez et gérez des profils de talents certifiés. Matching intelligent entre compétences disponibles et besoins des projets.',
    features: ['Profils certifiés blockchain', 'Matching compétences/projets', 'Scoring automatique', 'Disponibilité en temps réel'],
    color: 'bg-purple-600',
  },
  {
    icon: BookOpen,
    title: 'Formation Certifiante',
    desc: 'Catalogue de formations industrielles avec suivi de progression et délivrance de certificats numériques vérifiables.',
    features: ['Catalogue multi-formats', 'Suivi de progression', 'Certificats numériques', 'Intégration LMS'],
    color: 'bg-green-600',
  },
  {
    icon: BarChart3,
    title: 'Contenu Local & ESG',
    desc: 'Mesurez et optimisez votre taux de contenu local. Suivez vos indicateurs ESG et générez des rapports de conformité automatiques.',
    features: ['Calcul taux contenu local', 'Indicateurs ESG temps réel', 'Rapports de conformité', 'Tableaux de bord gouvernementaux'],
    color: 'bg-teal-600',
  },
  {
    icon: Globe,
    title: 'Localisation Multi-Régions',
    desc: 'Déployez votre plateforme dans 5 régions mondiales avec support de 15 langues, RTL inclus, et devises locales.',
    features: ['15 langues supportées', 'Support RTL (arabe, hébreu)', '25+ devises', '5 régions de déploiement'],
    color: 'bg-indigo-600',
  },
];

const Solutions: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Nos Solutions</h1>
          <p className="text-blue-200 text-lg">Une suite complète pour la gouvernance industrielle moderne</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {solutions.map((s, i) => (
            <div key={s.title} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
              <div className="flex-1">
                <div className={`w-14 h-14 ${s.color} rounded-2xl flex items-center justify-center mb-4`}>
                  <s.icon className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{s.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-4">{s.desc}</p>
                <ul className="space-y-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center space-x-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`flex-1 ${s.color} rounded-2xl p-8 flex items-center justify-center min-h-48`}>
                <s.icon className="w-24 h-24 text-white opacity-30" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Solutions;