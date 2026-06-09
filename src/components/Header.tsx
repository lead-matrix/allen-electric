import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, Menu, X, Phone, Calendar } from 'lucide-react';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Before & After', path: '/gallery' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Top Banner - Emergency Notification */}
      <div className="bg-brand-navy-950 text-white py-2 px-4 text-xs font-medium border-b border-white/5 relative z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>24/7 Emergency Dispatch Available in Alabama</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+12055856431" className="flex items-center gap-1.5 text-brand-gold-400 hover:text-brand-gold-300 transition-colors">
              <Phone className="w-3.5 h-3.5" />
              <span>Call Now: +1 (205) 585-6431</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={`fixed top-10 left-0 right-0 z-40 transition-all duration-300 px-4 md:px-8 max-w-7xl mx-auto`}
      >
        <div
          className={`w-full rounded-2xl transition-all duration-300 ${
            isScrolled 
              ? 'glass shadow-xl py-3 px-6' 
              : 'bg-brand-navy-900/90 shadow-md py-4 px-6 border border-white/5'
          }`}
        >
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-brand-gold-500 p-2 rounded-xl text-brand-navy-900 transition-transform group-hover:scale-110 group-hover:rotate-12 duration-300">
                <Zap className="w-6 h-6 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-white font-display">
                  ALLEN <span className="text-brand-gold-400">ELECTRIC</span>
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold -mt-1">
                  Alabama Licensed Contractors
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-sm font-medium transition-colors hover:text-brand-gold-400 ${
                      isActive ? 'text-brand-gold-400 font-semibold' : 'text-slate-300'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-4">
              <a
                href="tel:+12055856431"
                className="flex items-center gap-2 text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors px-4 py-2 rounded-xl text-sm font-semibold"
              >
                <Phone className="w-4 h-4 text-brand-gold-400" />
                <span>Call Now</span>
              </a>
              <Link
                to="/book"
                className="flex items-center gap-2 bg-gradient-to-r from-brand-gold-500 to-amber-600 text-brand-navy-950 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-brand-gold-500/10 px-5 py-2.5 rounded-xl text-sm font-bold"
              >
                <Calendar className="w-4 h-4 fill-current" />
                <span>Book Appointment</span>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-white hover:text-brand-gold-400 p-2 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Navigation */}
        <div
          className={`lg:hidden fixed inset-0 z-30 transition-all duration-300 ${
            isOpen 
              ? 'opacity-100 pointer-events-auto' 
              : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-brand-navy-950/80 backdrop-blur-md" onClick={() => setIsOpen(false)}></div>
          
          {/* Drawer Menu */}
          <div
            className={`absolute top-24 left-4 right-4 bg-brand-navy-900 border border-white/10 rounded-2xl p-6 shadow-2xl transition-all duration-300 transform ${
              isOpen ? 'translate-y-0 scale-100' : '-translate-y-4 scale-95'
            }`}
          >
            <nav className="flex flex-col gap-4 mb-6">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-lg font-medium p-2 rounded-xl transition-colors ${
                      isActive 
                        ? 'bg-brand-gold-500/10 text-brand-gold-400 font-bold' 
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <div className="flex flex-col gap-3">
              <a
                href="tel:+12055856431"
                className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-colors py-3.5 rounded-xl font-bold"
              >
                <Phone className="w-5 h-5 text-brand-gold-400" />
                <span>Call +1 (205) 585-6431</span>
              </a>
              <Link
                to="/book"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-brand-gold-500 to-amber-600 text-brand-navy-950 font-bold py-3.5 rounded-xl shadow-lg"
              >
                <Calendar className="w-5 h-5 fill-current" />
                <span>Book Appointment</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to push content below sticky header - since top is 10 + banner height, standard pages should start with padding */}
      <div className="h-28"></div>
    </>
  );
};
