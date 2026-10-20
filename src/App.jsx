import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop';

// Public & Community Pages
import HomePage from './pages/HomePage';
import ExploreCampaignsPage from './pages/ExploreCampaignsPage';
import CampaignDetailPage from './pages/CampaignDetailPage';
import AboutPage from './pages/AboutPage';
import HowItWorksPage from './pages/HowItWorksPage';
import VolunteerPage from './pages/VolunteerPage';
import ResourceDonationPage from './pages/ResourceDonationPage';
import ContactPage from './pages/ContactPage';
import FaqPage from './pages/FaqPage';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Dashboards
import DonorDashboard from './pages/dashboards/DonorDashboard';
import BeneficiaryDashboard from './pages/dashboards/BeneficiaryDashboard';
import VolunteerDashboard from './pages/dashboards/VolunteerDashboard';
import NgoDashboard from './pages/dashboards/NgoDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-white font-sans text-hope-charcoal">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Core Discovery */}
              <Route path="/" element={<HomePage />} />
              <Route path="/campaigns" element={<ExploreCampaignsPage />} />
              <Route path="/campaigns/:slug" element={<CampaignDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/volunteer" element={<VolunteerPage />} />
              <Route path="/resources" element={<ResourceDonationPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FaqPage />} />

              {/* Authentication */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Stakeholder Dashboards */}
              <Route path="/dashboard/donor" element={<DonorDashboard />} />
              <Route path="/dashboard/beneficiary" element={<BeneficiaryDashboard />} />
              <Route path="/dashboard/volunteer" element={<VolunteerDashboard />} />
              <Route path="/dashboard/ngo" element={<NgoDashboard />} />
              <Route path="/dashboard/admin" element={<AdminDashboard />} />

              {/* Fallback */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
