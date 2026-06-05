import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { PLAN_FEATURES } from '../types/subscription';

interface SubscriptionContextType {
  plan: string;
  status: string;
  hasAccess: (module: string) => boolean;
  setPlan: (plan: string) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [plan, setPlanState] = useState('starter');
  const [status, setStatus] = useState('active');

  useEffect(() => {
    if (user?.role === 'super_admin') {
      setPlanState('government');
      setStatus('active');
      return;
    }
    if (user?.plan) {
      setPlanState(user.plan);
      setStatus('active');
      return;
    }
    const stored = localStorage.getItem('subscription');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPlanState(parsed.plan || 'starter');
        setStatus(parsed.status || 'active');
      } catch {
        setPlanState('starter');
      }
    }
  }, [user]);

  const hasAccess = (module: string): boolean => {
    if (user?.role === 'super_admin') return true;
    const features = PLAN_FEATURES[plan as keyof typeof PLAN_FEATURES];
    if (!features) return false;
    return features.modules.includes(module);
  };

  const setPlan = (newPlan: string) => {
    setPlanState(newPlan);
    localStorage.setItem('subscription', JSON.stringify({ plan: newPlan, status: 'active' }));
  };

  return (
    <SubscriptionContext.Provider value={{ plan, status, hasAccess, setPlan }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) throw new Error('useSubscription must be used within SubscriptionProvider');
  return ctx;
};