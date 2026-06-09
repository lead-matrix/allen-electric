import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ExitIntentPopup } from './components/ExitIntentPopup';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { ServicesHub } from './pages/ServicesHub';
import { ServiceDetail } from './pages/ServiceDetail';
import { Gallery } from './pages/Gallery';
import { Reviews } from './pages/Reviews';
import { Contact } from './pages/Contact';
import { BookingPage } from './pages/BookingPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { Phone, Calendar } from 'lucide-react';

// Scroll to top on route change helper
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Global sticky mobile conversion action bar
const MobileConversionBar: React.FC = () => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-brand-navy-950/95 backdrop-blur-md border-t border-white/10 px-4 py-3 flex gap-4 shadow-lg">
      <a
        href="tel:+12055856431"
        className="flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider"
      >
        <Phone className="w-4 h-4 text-brand-gold-400" />
        <span>Call Dispatch</span>
      </a>
      <a
        href="/book"
        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-brand-gold-500 to-amber-600 text-brand-navy-950 font-black py-3.5 rounded-xl text-xs uppercase tracking-wider"
      >
        <Calendar className="w-4 h-4 fill-current" />
        <span>Book Online</span>
      </a>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 antialiased pb-16 lg:pb-0" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
          
          {/* Header Navigation */}
          <Header />

          {/* Main Content Areas */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<ServicesHub />} />
              <Route path="/services/:serviceId" element={<ServiceDetail />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/book" element={<BookingPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>

          {/* Footer Component */}
          <Footer />

          {/* Exit-Intent Popup capture */}
          <ExitIntentPopup />

          {/* Mobile Bottom Conversion CTA Bar */}
          <MobileConversionBar />

        </div>
      </Router>
    </HelmetProvider>
  );
};

export default App;
