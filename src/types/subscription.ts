export type SubscriptionPlan = 'starter' | 'pro' | 'enterprise' | 'government';

export const PLANS: Record<SubscriptionPlan, { name: string; price: number; annualPrice: number; users: number }> = {
  starter: { name: 'Starter', price: 299, annualPrice: 249, users: 5 },
  pro: { name: 'Pro', price: 999, annualPrice: 833, users: 25 },
  enterprise: { name: 'Enterprise', price: 2999, annualPrice: 2499, users: 100 },
  government: { name: 'Government', price: 0, annualPrice: 0, users: -1 },
};

export const PLAN_FEATURES: Record<string, { modules: string[] }> = {
  starter: {
    modules: ['passeport', 'subcontracting', 'collaboration', 'billing'],
  },
  pro: {
    modules: ['passeport', 'subcontracting', 'talents', 'formation', 'digital-identity', 'collaboration', 'billing'],
  },
  enterprise: {
    modules: ['passeport', 'subcontracting', 'talents', 'formation', 'digital-identity', 'local-content', 'analytics', 'collaboration', 'billing'],
  },
  government: {
    modules: ['passeport', 'subcontracting', 'talents', 'formation', 'digital-identity', 'local-content', 'analytics', 'localization', 'collaboration', 'admin', 'billing'],
  },
};