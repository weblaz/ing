import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-blue-900" />
              </div>
              <span className="font-bold text-xl">I.N.G.I Synertran</span>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed mb-4">
              Plateforme SaaS multi-tenants de gouvernance industrielle pour la gestion des fournisseurs, talents et conformité ESG.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-blue-200 text-sm">
                <Mail className="w-4 h-4" />
                <span>contact@ingi-synertran.com</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-200 text-sm">
                <Phone className="w-4 h-4" />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-200 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Paris, France</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Plateforme</h3>
            <ul className="space-y-2">
              {[
                { href: '/solutions', label: 'Solutions' },
                { href: '/features', label: 'Fonctionnalités' },
                { href: '/sectors', label: 'Secteurs' },
                { href: '/pricing', label: 'Tarifs' },
                { href: '/marketplace', label: 'Marketplace' },
              ].map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-blue-200 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Entreprise</h3>
            <ul className="space-y-2">
              {[
                { href: '/about', label: 'À propos' },
                { href: '/contact', label: 'Contact' },
                { href: '/demo', label: 'Demander une démo' },
                { href: '/login', label: 'Connexion' },
                { href: '/signup', label: 'Inscription' },
              ].map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-blue-200 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-blue-300 text-sm">
            © {new Date().getFullYear()} I.N.G.I Synertran. Tous droits réservés.
          </p>
          <p className="text-blue-300 text-sm mt-2 md:mt-0">
            Plateforme de gouvernance industrielle multi-tenants
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;