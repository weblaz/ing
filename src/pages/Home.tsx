import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../contexts/SubscriptionContext';
import Header from '../components/Header';
import DashboardCard from '../components/DashboardCard';
import {
  Building2, Users, BookOpen, BarChart3, Shield, Globe,
  ArrowRight, TrendingUp, Briefcase, ShoppingBag
} from 'lucide-react';

const Home: React.FC = () => {
  const { user } = useAuth();
  const { plan, hasAccess } = useSubscription();

  const modules = [
    { icon: Building2, title: 'Passeport Entreprise', desc: 'Identités vérifiées sur blockchain', href: '/passeport', module: 'passeport', color: 'blue' as const },
    { icon: Shield, title: 'Sous-traitance', desc: 'Appels d\'offres et candidatures', href: '/subcontracting', module: 'subcontracting', color: 'orange' as const },
    { icon: Users, title: 'Talents', desc: 'Profils certifiés et matching', href: '/talents', module: 'talents', color: 'purple' as const },
    { icon: BookOpen, title: 'Formation', desc: 'Catalogue de formations certifiantes', href: '/formation', module: 'formation', color: 'green' as const },
    { icon: BarChart3, title: 'Contenu Local & ESG', desc: 'Indicateurs ESG et conformité', href: '/local-content', module: 'local-content', color: 'orange' as const },
    { icon: Globe, title: 'Analytics', desc: 'Tableaux de bord et métriques', href: '/analytics', module: 'analytics', color: 'blue' as const },
    { icon: ShoppingBag, title: 'Marketplace', desc: 'Fournisseurs, talents et formations', href: '/marketplace', module: 'subcontracting', color: 'purple' as const },
    { icon: Briefcase, title: 'Procurement', desc: 'Gestion des achats et appels d\'offres', href: '/procurement', module: 'subcontracting', color: 'blue' as const },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Bonjour, {user?.firstName} {user?.lastName} 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Plan <span className="font-semibold text-blue-900 capitalize">{plan}</span> — Tableau de bord principal
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard title="Entreprises certifiées" value="2 847" icon={Building2} trend="up" trendValue="+12% ce mois" color="blue" />
          <DashboardCard title="Projets actifs" value="1 234" icon={Briefcase} trend="up" trendValue="+8% ce mois" color="green" />
          <DashboardCard title="Talents qualifiés" value="15 892" icon={Users} trend="up" trendValue="+23% ce mois" color="purple" />
          <DashboardCard title="Formations actives" value="456" icon={BookOpen} trend="neutral" trendValue="Stable" color="orange" />
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Modules disponibles</h2>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-500">Plan {plan}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((m) => {
              const accessible = hasAccess(m.module);
              return (
                <div key={m.title} className={`relative bg-white rounded-xl border p-5 transition-all ${accessible ? 'border-gray-200 hover:shadow-md hover:border-blue-200 cursor-pointer' : 'border-gray-100 opacity-60'}`}>
                  {accessible ? (
                    <Link to={m.href} className="block">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${m.color === 'blue' ? 'bg-blue-100' : m.color === 'green' ? 'bg-green-100' : m.color === 'purple' ? 'bg-purple-100' : 'bg-orange-100'}`}>
                        <m.icon className={`w-5 h-5 ${m.color === 'blue' ? 'text-blue-700' : m.color === 'green' ? 'text-green-700' : m.color === 'purple' ? 'text-purple-700' : 'text-orange-700'}`} />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">{m.title}</h3>
                      <p className="text-xs text-gray-500">{m.desc}</p>
                      <div className="flex items-center mt-3 text-blue-900">
                        <span className="text-xs font-medium">Accéder</span>
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </div>
                    </Link>
                  ) : (
                    <div>
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                        <m.icon className="w-5 h-5 text-gray-400" />
                      </div>
                      <h3 className="font-semibold text-gray-500 text-sm mb-1">{m.title}</h3>
                      <p className="text-xs text-gray-400">{m.desc}</p>
                      <Link to="/upgrade" className="flex items-center mt-3 text-orange-600">
                        <span className="text-xs font-medium">Mettre à niveau</span>
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;