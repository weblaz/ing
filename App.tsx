import React from 'react';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nProvider } from './src/contexts/I18nContext';
import { SubscriptionProvider } from './src/contexts/SubscriptionContext';
import { AuthProvider } from './src/contexts/AuthContext';

// Route guards
import ProtectedRoute from './src/components/ProtectedRoute';
import AuthRoute from './src/components/AuthRoute';
import RoleGuard from './src/rbac/RoleGuard';
import RoleDashboardRedirect from './src/components/RoleDashboardRedirect';

// Public pages
import PublicHome from './src/pages/public/PublicHome';
import About from './src/pages/public/About';
import Solutions from './src/pages/public/Solutions';
import Features from './src/pages/public/Features';
import Sectors from './src/pages/public/Sectors';
import Pricing from './src/pages/public/Pricing';
import Contact from './src/pages/public/Contact';
import Login from './src/pages/public/Login';
import Signup from './src/pages/public/Signup';
import Demo from './src/pages/public/Demo';

// ── Role-specific dashboards ───────────────────────────────
import SuperAdminDashboard from './src/pages/dashboards/SuperAdminDashboard';
import GovernmentDashboard from './src/pages/dashboards/GovernmentDashboard';
import EnterpriseDashboard from './src/pages/dashboards/EnterpriseDashboard';
import SupplierDashboard from './src/pages/dashboards/SupplierDashboard';
import TalentDashboard from './src/pages/dashboards/TalentDashboard';
import TrainingCenterDashboard from './src/pages/dashboards/TrainingCenterDashboard';

// ── Procurement ──────────────────────────────────────────
import ProcurementHub from './src/pages/procurement/ProcurementHub';

// ── Marketplace ───────────────────────────────────────────
import MarketplaceHub from './src/pages/marketplace/MarketplaceHub';
import SupplierMarketplace from './src/pages/marketplace/SupplierMarketplace';
import TalentMarketplace from './src/pages/marketplace/TalentMarketplace';
import TrainingMarketplace from './src/pages/marketplace/TrainingMarketplace';
import OpportunityMarketplace from './src/pages/marketplace/OpportunityMarketplace';

// ── Shared module pages (wrapped with ProtectedRoute) ─────
import Passeport from './src/pages/Passeport';
import DigitalIdentity from './src/pages/DigitalIdentity';
import Subcontracting from './src/pages/Subcontracting';
import Talents from './src/pages/Talents';
import Formation from './src/pages/Formation';
import LocalContent from './src/pages/LocalContent';
import Analytics from './src/pages/Analytics';
import Localization from './src/pages/Localization';
import Collaboration from './src/pages/Collaboration';
import Admin from './src/pages/Admin';
import Billing from './src/pages/Billing';
import UpgradePlan from './src/pages/UpgradePlan';
import NotFound from './src/pages/NotFound';

const App: React.FC = () => {
  return (
    <Theme appearance="inherit" radius="large" scaling="100%">
      <AuthProvider>
        <I18nProvider>
          <SubscriptionProvider>
            <Router>
              <main className="min-h-screen font-sans">
                <Routes>
                  {/* ── Public ──────────────────────────────────────── */}
                  <Route path="/" element={<PublicHome />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/solutions" element={<Solutions />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/sectors" element={<Sectors />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/demo" element={<Demo />} />
                  <Route path="/upgrade" element={<UpgradePlan />} />

                  <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
                  <Route path="/signup" element={<AuthRoute><Signup /></AuthRoute>} />
                  <Route path="/register" element={<AuthRoute><Signup /></AuthRoute>} />

                  {/* ── Dashboard router (redirects to role dashboard) ─ */}
                  <Route path="/dashboard" element={<RoleDashboardRedirect />} />

                  {/* ── Super Admin dashboard ────────────────────────── */}
                  <Route path="/admin/dashboard" element={
                    <RoleGuard allowedRoles={['super_admin']}>
                      <SuperAdminDashboard />
                    </RoleGuard>
                  } />

                  {/* ── Government dashboards ────────────────────────── */}
                  <Route path="/gov/dashboard" element={
                    <RoleGuard allowedRoles={['super_admin', 'government']}>
                      <GovernmentDashboard />
                    </RoleGuard>
                  } />
                  <Route path="/gov/local-content" element={
                    <RoleGuard allowedRoles={['super_admin', 'government']}>
                      <LocalContent />
                    </RoleGuard>
                  } />
                  <Route path="/gov/esg" element={
                    <RoleGuard allowedRoles={['super_admin', 'government']}>
                      <LocalContent />
                    </RoleGuard>
                  } />
                  <Route path="/gov/compliance" element={
                    <RoleGuard allowedRoles={['super_admin', 'government']}>
                      <LocalContent />
                    </RoleGuard>
                  } />
                  <Route path="/gov/reports" element={
                    <RoleGuard allowedRoles={['super_admin', 'government']}>
                      <LocalContent />
                    </RoleGuard>
                  } />
                  <Route path="/gov/analytics" element={
                    <RoleGuard allowedRoles={['super_admin', 'government']}>
                      <Analytics />
                    </RoleGuard>
                  } />
                  <Route path="/gov/regions" element={
                    <RoleGuard allowedRoles={['super_admin', 'government']}>
                      <LocalContent />
                    </RoleGuard>
                  } />

                  {/* ── Enterprise dashboard ─────────────────────────── */}
                  <Route path="/enterprise/dashboard" element={
                    <RoleGuard allowedRoles={['super_admin', 'enterprise']}>
                      <EnterpriseDashboard />
                    </RoleGuard>
                  } />

                  {/* ── Supplier dashboard ───────────────────────────── */}
                  <Route path="/supplier/dashboard" element={
                    <RoleGuard allowedRoles={['super_admin', 'supplier']}>
                      <SupplierDashboard />
                    </RoleGuard>
                  } />
                  <Route path="/supplier/applications" element={
                    <RoleGuard allowedRoles={['super_admin', 'supplier']}>
                      <Subcontracting />
                    </RoleGuard>
                  } />
                  <Route path="/supplier/certifications" element={
                    <RoleGuard allowedRoles={['super_admin', 'supplier']}>
                      <Passeport />
                    </RoleGuard>
                  } />

                  {/* ── Talent dashboard ─────────────────────────────── */}
                  <Route path="/talent/dashboard" element={
                    <RoleGuard allowedRoles={['super_admin', 'talent']}>
                      <TalentDashboard />
                    </RoleGuard>
                  } />
                  <Route path="/talent/opportunities" element={
                    <RoleGuard allowedRoles={['super_admin', 'talent']}>
                      <Subcontracting />
                    </RoleGuard>
                  } />
                  <Route path="/talent/certifications" element={
                    <RoleGuard allowedRoles={['super_admin', 'talent']}>
                      <Talents />
                    </RoleGuard>
                  } />

                  {/* ── Training Center dashboard ────────────────────── */}
                  <Route path="/training/dashboard" element={
                    <RoleGuard allowedRoles={['super_admin', 'training_center']}>
                      <TrainingCenterDashboard />
                    </RoleGuard>
                  } />
                  <Route path="/training/students" element={
                    <RoleGuard allowedRoles={['super_admin', 'training_center']}>
                      <Talents />
                    </RoleGuard>
                  } />
                  <Route path="/training/certifications" element={
                    <RoleGuard allowedRoles={['super_admin', 'training_center']}>
                      <Formation />
                    </RoleGuard>
                  } />
                  <Route path="/training/analytics" element={
                    <RoleGuard allowedRoles={['super_admin', 'training_center']}>
                      <Analytics />
                    </RoleGuard>
                  } />
                  <Route path="/training/calendar" element={
                    <RoleGuard allowedRoles={['super_admin', 'training_center']}>
                      <Formation />
                    </RoleGuard>
                  } />

                  {/* ── Marketplace routes (public-ish, accessible to all authenticated) ── */}
                  <Route path="/marketplace" element={<ProtectedRoute><MarketplaceHub /></ProtectedRoute>} />
                  <Route path="/marketplace/suppliers" element={<ProtectedRoute><SupplierMarketplace /></ProtectedRoute>} />
                  <Route path="/marketplace/talents" element={<ProtectedRoute><TalentMarketplace /></ProtectedRoute>} />
                  <Route path="/marketplace/trainings" element={<ProtectedRoute><TrainingMarketplace /></ProtectedRoute>} />
                  <Route path="/marketplace/opportunities" element={<ProtectedRoute><OpportunityMarketplace /></ProtectedRoute>} />

                  {/* ── Shared module routes (plan-based access) ─────── */}
                  <Route path="/passeport" element={
                    <ProtectedRoute requiredModule="passeport"><Passeport /></ProtectedRoute>
                  } />
                  <Route path="/passeport-entreprise" element={
                    <ProtectedRoute requiredModule="passeport"><Passeport /></ProtectedRoute>
                  } />
                  <Route path="/digital-identity" element={
                    <ProtectedRoute requiredModule="digital-identity"><DigitalIdentity /></ProtectedRoute>
                  } />
                  <Route path="/identite-numerique" element={
                    <ProtectedRoute requiredModule="digital-identity"><DigitalIdentity /></ProtectedRoute>
                  } />
                  <Route path="/subcontracting" element={
                    <ProtectedRoute requiredModule="subcontracting"><Subcontracting /></ProtectedRoute>
                  } />
                  <Route path="/sous-traitance" element={
                    <ProtectedRoute requiredModule="subcontracting"><Subcontracting /></ProtectedRoute>
                  } />
                  <Route path="/talents" element={
                    <ProtectedRoute requiredModule="talents"><Talents /></ProtectedRoute>
                  } />
                  <Route path="/formation" element={
                    <ProtectedRoute requiredModule="formation"><Formation /></ProtectedRoute>
                  } />
                  <Route path="/local-content" element={
                    <ProtectedRoute requiredModule="local-content"><LocalContent /></ProtectedRoute>
                  } />
                  <Route path="/contenu-local" element={
                    <ProtectedRoute requiredModule="local-content"><LocalContent /></ProtectedRoute>
                  } />
                  <Route path="/analytics" element={
                    <ProtectedRoute requiredModule="analytics"><Analytics /></ProtectedRoute>
                  } />
                  <Route path="/localization" element={
                    <ProtectedRoute requiredModule="localization"><Localization /></ProtectedRoute>
                  } />
                  <Route path="/collaboration" element={
                    <ProtectedRoute><Collaboration /></ProtectedRoute>
                  } />
                  <Route path="/admin" element={
                    <RoleGuard allowedRoles={['super_admin']}>
                      <Admin />
                    </RoleGuard>
                  } />
                  <Route path="/billing" element={
                    <ProtectedRoute><Billing /></ProtectedRoute>
                  } />

                  {/* ── Procurement ─────────────────────────────────── */}
                  <Route path="/procurement" element={<ProtectedRoute><ProcurementHub /></ProtectedRoute>} />
                  <Route path="/procurement/:tab" element={<ProtectedRoute><ProcurementHub /></ProtectedRoute>} />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>

              <ToastContainer
                position="top-right"
                autoClose={3000}
                newestOnTop
                closeOnClick
                pauseOnHover
              />
            </Router>
          </SubscriptionProvider>
        </I18nProvider>
      </AuthProvider>
    </Theme>
  );
};

export default App;
