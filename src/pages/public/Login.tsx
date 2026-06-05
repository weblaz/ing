import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import { Building2, Eye, EyeOff, Copy, LogIn } from 'lucide-react';

const DEMO_ACCOUNTS = [
  { email: 'evrardolazube@gmail.com', password: 'client123456', role: 'Super Admin', plan: 'Government' },
  { email: 'starter@ingi-synertran.com', password: 'Starter2026!', role: 'Tenant Admin', plan: 'Starter' },
  { email: 'pro@ingi-synertran.com', password: 'Pro2026!', role: 'Tenant Admin', plan: 'Pro' },
  { email: 'enterprise@ingi-synertran.com', password: 'Enterprise2026!', role: 'Tenant Admin', plan: 'Enterprise' },
  { email: 'government@ingi-synertran.com', password: 'Government2026!', role: 'Super Admin', plan: 'Government' },
];

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      toast.success('Connexion réussie');
      navigate('/dashboard');
    } else {
      toast.error('Email ou mot de passe incorrect');
    }
  };

  const handleQuickLogin = async (acc: typeof DEMO_ACCOUNTS[0]) => {
    setLoading(true);
    const success = await login(acc.email, acc.password);
    setLoading(false);
    if (success) {
      toast.success(`Connecté en tant que ${acc.role}`);
      navigate('/dashboard');
    }
  };

  const fillCredentials = (acc: typeof DEMO_ACCOUNTS[0]) => {
    setEmail(acc.email);
    setPassword(acc.password);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.info('Copié dans le presse-papier');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-blue-900 text-xl">I.N.G.I Synertran</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-1">Connexion</h1>
          <p className="text-gray-500 text-sm">Accédez à votre espace de gouvernance</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="votre@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 bg-blue-900 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors disabled:opacity-50"
            >
              <LogIn className="w-4 h-4" />
              <span>{loading ? 'Connexion...' : 'Se connecter'}</span>
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              Pas encore de compte ?{' '}
              <Link to="/signup" className="text-blue-900 font-medium hover:underline">
                S'inscrire
              </Link>
            </p>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-4">
            <button
              onClick={() => setShowDemoAccounts(!showDemoAccounts)}
              className="w-full text-sm text-blue-700 hover:text-blue-900 font-medium"
            >
              {showDemoAccounts ? 'Masquer' : 'Afficher'} les comptes de démonstration
            </button>

            {showDemoAccounts && (
              <div className="mt-4 space-y-2">
                {DEMO_ACCOUNTS.map((acc) => (
                  <div key={acc.email} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-blue-900">{acc.role} — {acc.plan}</span>
                      <button
                        onClick={() => handleQuickLogin(acc)}
                        className="text-xs bg-blue-900 text-white px-2 py-0.5 rounded hover:bg-blue-800"
                      >
                        Connexion rapide
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600 font-mono">{acc.email}</span>
                      <div className="flex items-center space-x-1">
                        <button onClick={() => copyToClipboard(acc.email)} className="text-gray-400 hover:text-gray-600">
                          <Copy className="w-3 h-3" />
                        </button>
                        <button onClick={() => fillCredentials(acc)} className="text-xs text-blue-700 hover:text-blue-900">
                          Remplir
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;