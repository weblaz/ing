import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Target, Eye, Heart, Globe, Users, Award } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">À propos de I.N.G.I Synertran</h1>
          <p className="text-blue-200 text-lg">Pionniers de la gouvernance industrielle intelligente depuis 2018</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: Target, title: 'Notre Mission', desc: 'Démocratiser l\'accès à la gouvernance industrielle de qualité pour toutes les entreprises, des PME aux multinationales.', color: 'text-blue-900' },
              { icon: Eye, title: 'Notre Vision', desc: 'Devenir la référence mondiale de la gouvernance industrielle numérique, couvrant 100 pays d\'ici 2030.', color: 'text-green-600' },
              { icon: Heart, title: 'Nos Valeurs', desc: 'Transparence, innovation, inclusion et durabilité guident chacune de nos décisions produit et commerciales.', color: 'text-red-500' },
            ].map((item) => (
              <div key={item.title} className="text-center p-6">
                <item.icon className={`w-12 h-12 ${item.color} mx-auto mb-4`} />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-blue-50 rounded-2xl p-8">
            {[
              { icon: Globe, value: '5', label: 'Continents' },
              { icon: Users, value: '2 847', label: 'Clients actifs' },
              { icon: Award, value: '15', label: 'Langues supportées' },
              { icon: Target, value: '99.9%', label: 'Uptime SLA' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <s.icon className="w-8 h-8 text-blue-900 mx-auto mb-2" />
                <p className="text-3xl font-bold text-blue-900">{s.value}</p>
                <p className="text-sm text-gray-600">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;