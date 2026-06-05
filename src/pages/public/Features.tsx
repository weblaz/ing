import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Shield, Cpu, Globe, Lock, Zap, BarChart3, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'KYB — Know Your Business',
    desc: 'Vérification d\'identité d\'entreprise complète avec validation des documents légaux, certifications et historique de conformité.',
    items: ['Validation SIRET/RC automatique', 'Vérification des certifications ISO', 'Historique de conformité', 'Score de confiance dynamique'],
  },
  {
    icon: Globe,
    title: 'Multi-Régions & Multi-Langues',
    desc: 'Déployez votre plateforme dans le monde entier avec une infrastructure distribuée sur 5 continents.',
    items: ['15 langues dont arabe (RTL)', '5 régions de déploiement', '25+ devises supportées', 'Latence < 50ms par région'],
  },
  {
    icon: Cpu,
    title: 'Intelligence Artificielle',
    desc: 'Algorithmes de matching et de scoring basés sur l\'IA pour optimiser la sélection des fournisseurs et talents.',
    items: ['Matching fournisseurs/projets', 'Scoring automatique 360°', 'Prédiction de disponibilité', 'Recommandations personnalisées'],
  },
  {
    icon: Lock,
    title: 'Blockchain & Sécurité',
    desc: 'Ancrage des identités et certifications sur la blockchain Ethereum pour une traçabilité infalsifiable.',
    items: ['Ancrage Ethereum', 'QR Code de vérification', 'Chiffrement AES-256', 'Audit trail complet'],
  },
  {
    icon: Zap,
    title: 'Performance & Scalabilité',
    desc: 'Infrastructure cloud-native conçue pour supporter des milliers de tenants simultanément.',
    items: ['99.9% uptime SLA', 'Auto-scaling horizontal', 'CDN mondial', 'Backup temps réel'],
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reporting',
    desc: 'Tableaux de bord exécutifs avec métriques en temps réel et rapports de conformité automatiques.',
    items: ['Dashboards temps réel', 'Rapports ESG automatiques', 'Export PDF/Excel', 'API REST complète'],
  },
];

const Features: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Fonctionnalités</h1>
          <p className="text-blue-200 text-lg">Technologies de pointe pour la gouvernance industrielle</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-900 rounded-xl flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{f.desc}</p>
              <ul className="space-y-1.5">
                {f.items.map((item) => (
                  <li key={item} className="flex items-center space-x-2 text-sm text-gray-700">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;