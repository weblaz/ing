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

// Shared module pages
import Home from './src/pages/Home';
import Passeport from './src/pages/Passeport';
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
            <Route path="/dashboard" element={<Home />} />

            {/* ── Shared module routes ─────── */}
            <Route path="/passeport" element={<Passeport />} />
            <Route path="/passeport-entreprise" element={<Passeport />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/localization" element={<Localization />} />
            <Route path="/collaboration" element={<Collaboration />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/billing" element={<Billing />} />

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