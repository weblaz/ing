import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'super_admin' | 'tenant_admin' | 'project_manager' | 'viewer';
  tenant?: string;
  plan?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const DEMO_ACCOUNTS: Array<User & { password: string }> = [
  {
    id: 'admin-001',
    email: 'evrardolazube@gmail.com',
    password: 'client123456',
    firstName: 'Evrardo',
    lastName: 'Lazube',
    role: 'super_admin',
    plan: 'government',
  },
  {
    id: 'starter-001',
    email: 'starter@ingi-synertran.com',
    password: 'Starter2026!',
    firstName: 'Sophie',
    lastName: 'Moreau',
    role: 'tenant_admin',
    tenant: 'tenant-starter-001',
    plan: 'starter',
  },
  {
    id: 'pro-001',
    email: 'pro@ingi-synertran.com',
    password: 'Pro2026!',
    firstName: 'Alexandre',
    lastName: 'Fontaine',
    role: 'tenant_admin',
    tenant: 'tenant-pro-001',
    plan: 'pro',
  },
  {
    id: 'enterprise-001',
    email: 'enterprise@ingi-synertran.com',
    password: 'Enterprise2026!',
    firstName: 'Nadia',
    lastName: 'Benali',
    role: 'tenant_admin',
    tenant: 'tenant-enterprise-001',
    plan: 'enterprise',
  },
  {
    id: 'gov-001',
    email: 'government@ingi-synertran.com',
    password: 'Government2026!',
    firstName: 'Karim',
    lastName: 'Al-Mansouri',
    role: 'super_admin',
    tenant: 'tenant-gov-001',
    plan: 'government',
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('auth_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('auth_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const account = DEMO_ACCOUNTS.find(
      (a) => a.email === email && a.password === password
    );
    if (account) {
      const { password: _pw, ...userWithoutPassword } = account;
      setUser(userWithoutPassword);
      localStorage.setItem('auth_user', JSON.stringify(userWithoutPassword));
      localStorage.setItem('subscription', JSON.stringify({ plan: userWithoutPassword.plan || 'starter', status: 'active' }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
    localStorage.removeItem('subscription');
  };

  const isAuthenticated = () => user !== null;

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};