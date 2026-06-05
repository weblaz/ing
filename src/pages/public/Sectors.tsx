import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Flame, Building, Truck, Cpu, Leaf, Anchor } from 'lucide-react';

const sectors = [
  {
    icon: Flame,
    title: 'Pétrole & Gaz',
    desc: 'Gestion des fournisseurs HSE, conformité QHSE, suivi du contenu local pour les projets pétroliers et gaziers.',
    stats: ['850+ fournisseurs', '45 pays couverts', 'ISO 14001 requis'],
    color: 'bg-orange-500',
  },
  {
    icon: Building,
    title: 'BTP & Infrastructure',
    desc: 'Qualification des sous-traitants, gestion des certifications de sécurité et suivi des projets de construction.',
    stats: ['1 200+ entreprises', '30 pays couverts', 'Certifications OHSAS'],
    color: 'bg-gray-700',
  },
  {
    icon: Truck,
    title: 'Logistique & Transport',
    desc: 'Qualification des transporteurs, suivi des certifications ADR et gestion des chaînes d\'approvisionnement.',
    stats: ['600+ transporteurs', '25 pays couverts', 'Certifications ADR'],
    color: 'bg-blue-600',
  },
  {
    icon: Cpu,
    title: 'Industrie & Manufacturing',
    desc: 'Qualification des fournisseurs industriels, gestion de la qualité et conformité aux normes ISO.',
    stats: ['400+ industriels', '20 pays couverts', 'ISO 9001 requis'],
    color: 'bg-purple-600',
  },
  {
    icon: Leaf,
    title: 'Énergie Renouvelable',
    desc: 'Gestion des projets solaires et éoliens, suivi ESG et conformité aux objectifs de développement durable.',
    stats: ['200+ projets', '15 pays couverts', 'Certifications ESG'],
    color: 'bg-green-600',
  },
  {
    icon: Anchor,
    title: 'Maritime & Offshore',
    desc: 'Qualification des prestataires offshore, gestion des certifications STCW et conformité maritime internationale.',
    stats: ['150+ prestataires', '18 pays couverts', 'Certifications STCW'],
    color: 'bg-teal-600',
  },
];

const Sectors: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Secteurs d'activité</h1>
          <p className="text-blue-200 text-lg">Solutions adaptées à chaque industrie</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sectors.map((s) => (
            <div key={s.title} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`${s.color} p-6`}>
                <s.icon className="w-10 h-10 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{s.desc}</p>
                <div className="space-y-1">
                  {s.stats.map((stat) => (
                    <div key={stat} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-900 rounded-full" />
                      <span className="text-sm text-gray-700">{stat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sectors;