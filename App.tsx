import React from 'react';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

// ── Shared module pages ─────
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

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/register" element={<Signup />} />

            {/* ── Dashboard router (redirects to role dashboard) ─ */}
            <Route path="/dashboard" element={<PublicHome />} />

            {/* ── Super Admin dashboard ────────────────────────── */}
            <Route path="/admin/dashboard" element={<SuperAdminDashboard />} />

            {/* ── Government dashboards ────────────────────────── */}
            <Route path="/gov/dashboard" element={<GovernmentDashboard />} />
            <Route path="/gov/local-content" element={<LocalContent />} />
            <Route path="/gov/esg" element={<LocalContent />} />
            <Route path="/gov/compliance" element={<LocalContent />} />
            <Route path="/gov/reports" element={<LocalContent />} />
            <Route path="/gov/analytics" element={<Analytics />} />
            <Route path="/gov/regions" element={<LocalContent />} />

            {/* ── Enterprise dashboard ─────────────────────────── */}
            <Route path="/enterprise/dashboard" element={<EnterpriseDashboard />} />

            {/* ── Supplier dashboard ───────────────────────────── */}
            <Route path="/supplier/dashboard" element={<SupplierDashboard />} />
            <Route path="/supplier/applications" element={<Subcontracting />} />
            <Route path="/supplier/certifications" element={<Passeport />} />

            {/* ── Talent dashboard ─────────────────────────────── */}
            <Route path="/talent/dashboard" element={<TalentDashboard />} />
            <Route path="/talent/opportunities" element={<Subcontracting />} />
            <Route path="/talent/certifications" element={<Talents />} />

            {/* ── Training Center dashboard ────────────────────── */}
            <Route path="/training/dashboard" element={<TrainingCenterDashboard />} />
            <Route path="/training/students" element={<Talents />} />
            <Route path="/training/certifications" element={<Formation />} />
            <Route path="/training/analytics" element={<Analytics />} />
            <Route path="/training/calendar" element={<Formation />} />

            {/* ── Marketplace routes ── */}
            <Route path="/marketplace" element={<MarketplaceHub />} />
            <Route path="/marketplace/suppliers" element={<SupplierMarketplace />} />
            <Route path="/marketplace/talents" element={<TalentMarketplace />} />
            <Route path="/marketplace/trainings" element={<TrainingMarketplace />} />
            <Route path="/marketplace/opportunities" element={<OpportunityMarketplace />} />

            {/* ── Shared module routes ─────── */}
            <Route path="/passeport" element={<Passeport />} />
            <Route path="/passeport-entreprise" element={<Passeport />} />
            <Route path="/digital-identity" element={<DigitalIdentity />} />
            <Route path="/identite-numerique" element={<DigitalIdentity />} />
            <Route path="/subcontracting" element={<Subcontracting />} />
            <Route path="/sous-traitance" element={<Subcontracting />} />
            <Route path="/talents" element={<Talents />} />
            <Route path="/formation" element={<Formation />} />
            <Route path="/local-content" element={<LocalContent />} />
            <Route path="/contenu-local" element={<LocalContent />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/localization" element={<Localization />} />
            <Route path="/collaboration" element={<Collaboration />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/billing" element={<Billing />} />

            {/* ── Procurement ─────────────────────────────────── */}
            <Route path="/procurement" element={<ProcurementHub />} />
            <Route path="/procurement/:tab" element={<ProcurementHub />} />

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
    </Theme>
  );
};

export default App;