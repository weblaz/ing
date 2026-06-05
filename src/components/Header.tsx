import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useI18n } from '../contexts/I18nContext';
import {
  Building2, Menu, X, LogOut, User, LayoutDashboard,
  ChevronDown, Globe, ShoppingBag
} from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { t, language, setLanguage } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { href: '/solutions', label: t('nav.solutions') },
    { href: '/features', label: t('nav.features') },
    { href: '/sectors', label: t('nav.sectors') },
    { href: '/pricing', label: t('nav.pricing') },
    { href: '/about', label: t('nav.about') },
    { href: '/contact', label: t('nav.contact') },
  ];

  const langs = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-blue-900 text-lg">I.N.G.I Synertran</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-blue-900 border-b-2 border-blue-900 pb-0.5'
                    : 'text-gray-600 hover:text-blue-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-900 text-sm"
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase">{language}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {langs.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLanguage(l.code); setLangMenuOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${language === l.code ? 'text-blue-900 font-medium' : 'text-gray-700'}`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {isAuthenticated() ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors"
                >
                  <div className="w-7 h-7 bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-blue-900">{user?.firstName}</span>
                  <ChevronDown className="w-3 h-3 text-blue-900" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>{t('nav.dashboard')}</span>
                    </Link>
                    <Link
                      to="/marketplace"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Marketplace</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t('nav.logout')}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-blue-900 px-3 py-2"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                >
                  {t('nav.signup')}
                </Link>
              </div>
            )}
          </div>

          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-gray-700 hover:text-blue-900 py-1"
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated() ? (
            <>
              <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center space-x-2 text-sm text-gray-700 py-1">
                <LayoutDashboard className="w-4 h-4" />
                <span>{t('nav.dashboard')}</span>
              </Link>
              <button onClick={handleLogout} className="flex items-center space-x-2 text-sm text-red-600 py-1">
                <LogOut className="w-4 h-4" />
                <span>{t('nav.logout')}</span>
              </button>
            </>
          ) : (
            <div className="flex flex-col space-y-2 pt-2">
              <Link to="/login" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-gray-700 py-1">
                {t('nav.login')}
              </Link>
              <Link to="/signup" onClick={() => setMobileOpen(false)} className="bg-blue-900 text-white text-sm font-medium px-4 py-2 rounded-lg text-center">
                {t('nav.signup')}
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;