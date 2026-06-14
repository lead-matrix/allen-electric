import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Calendar, ChevronDown } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Before & After', path: '/gallery' },
  { name: 'Reviews', path: '/reviews' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPromoBanner, setShowPromoBanner] = useState(true);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Track scroll position for header style transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* ─── Sticky wrapper: spans full-width, locks to top ─── */}
      <div className="sticky top-0 left-0 right-0 z-50 w-full">

        {/* Top emergency banner */}
        {showPromoBanner && (
          <div className="bg-brand-navy-950 text-white py-2 px-4 pr-10 text-xs font-medium border-b border-white/5 relative">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping flex-shrink-0" />
                <span className="text-slate-300">24/7 Emergency Dispatch Available in Alabama</span>
              </div>
              <a
                href="tel:+12055856431"
                className="flex items-center gap-1.5 text-brand-gold-400 hover:text-brand-gold-300 transition-colors font-semibold"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now: +1 (205) 585-6431</span>
              </a>
            </div>
            {/* Close button */}
            <button
              onClick={() => setShowPromoBanner(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 rounded transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* ─── Main nav bar ─── */}
        <header
          className={`w-full transition-all duration-300 ${
            isScrolled
              ? 'bg-slate-950/95 backdrop-blur-lg shadow-xl shadow-black/50 border-b border-brand-gold-500/30'
              : 'bg-slate-900 border-b border-slate-800 shadow-md'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20 sm:h-24">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0" aria-label="Allen Electric – Home">
              <img
                src="/logo.png"
                alt="Allen Contractors LLC Logo"
                className="h-14 sm:h-18 w-auto object-contain transition-all duration-300 group-hover:scale-105"
              />
              <span className="font-display font-black text-lg sm:text-xl md:text-2xl tracking-tight text-white transition-colors">
                Allen <span className="text-brand-gold-400">Electric</span>
              </span>
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden lg:flex items-center gap-7 xl:gap-9" aria-label="Main navigation">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative text-sm font-medium transition-colors duration-200 pb-1 group ${
                      isActive ? 'text-brand-gold-400' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {/* Animated underline */}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-brand-gold-400 rounded-full transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="tel:+12055856431"
                className="flex items-center gap-2 text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 px-4 py-2 rounded-xl text-sm font-semibold"
              >
                <Phone className="w-4 h-4 text-brand-gold-400" />
                <span className="hidden md:inline">Call Now</span>
              </a>
              <Link
                to="/book"
                className="flex items-center gap-2 bg-gradient-to-r from-brand-gold-500 to-amber-600 text-brand-navy-950 hover:brightness-110 active:scale-95 transition-all duration-200 shadow-lg shadow-brand-gold-500/20 px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap"
              >
                <Calendar className="w-4 h-4 fill-current" />
                <span>Book Appointment</span>
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              ref={buttonRef}
              onClick={() => setIsOpen((prev) => !prev)}
              className="lg:hidden relative flex items-center justify-center w-10 h-10 text-white hover:text-brand-gold-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold-400 rounded-xl"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
            >
              <span
                className={`absolute transition-all duration-200 ${isOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`}
              >
                <X className="w-6 h-6" />
              </span>
              <span
                className={`absolute transition-all duration-200 ${isOpen ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'}`}
              >
                <Menu className="w-6 h-6" />
              </span>
            </button>
          </div>
        </header>

        {/* ─── Mobile slide-down menu ─── */}
        {/* Sits INSIDE the sticky wrapper so it pushes content down naturally */}
        <div
          id="mobile-nav"
          ref={menuRef}
          role="navigation"
          aria-label="Mobile navigation"
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isScrolled
              ? 'bg-slate-950/98 backdrop-blur-lg'
              : 'bg-slate-900'
          } border-b border-slate-800 shadow-2xl`}
          style={{
            maxHeight: isOpen ? '600px' : '0px',
            opacity: isOpen ? 1 : 0,
          }}
        >
          <div className="px-4 py-5 flex flex-col gap-1">
            {/* Nav links */}
            <nav className="flex flex-col gap-0.5 mb-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center justify-between text-base font-medium px-3 py-3 rounded-xl transition-all duration-150 ${
                      isActive
                        ? 'bg-brand-gold-500/10 text-brand-gold-400 font-bold'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white active:bg-white/10'
                    }`}
                  >
                    {link.name}
                    {isActive && <ChevronDown className="w-4 h-4 text-brand-gold-400 -rotate-90" />}
                  </Link>
                );
              })}
            </nav>

            {/* Divider */}
            <div className="border-t border-white/10 my-1" />

            {/* CTA buttons */}
            <div className="flex flex-col gap-3 pt-3">
              <a
                href="tel:+12055856431"
                className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all py-3.5 rounded-xl font-semibold text-sm active:scale-95"
              >
                <Phone className="w-5 h-5 text-brand-gold-400" />
                <span>Call +1 (205) 585-6431</span>
              </a>
              <Link
                to="/book"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-brand-gold-500 to-amber-600 text-brand-navy-950 font-bold py-3.5 rounded-xl shadow-lg shadow-brand-gold-500/20 text-sm active:scale-95 transition-transform"
              >
                <Calendar className="w-5 h-5 fill-current" />
                <span>Book Appointment</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
