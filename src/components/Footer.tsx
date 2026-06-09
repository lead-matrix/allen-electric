import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Phone, Mail, MapPin, Clock, ShieldCheck, Award, Heart, CheckCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: 'Electrical Inspections', slug: 'electrical-safety-inspections' },
    { name: 'Home Automation', slug: 'home-automation' },
    { name: 'New Construction Wiring', slug: 'new-construction-wiring' },
    { name: 'Generator Installation', slug: 'generator-installation' },
    { name: 'Electrical Repairs', slug: 'electrical-repairs' },
    { name: 'Service Calls', slug: 'service-calls' },
    { name: 'Commercial Services', slug: 'commercial-electrical-services' },
    { name: 'Panel Upgrades', slug: 'panel-upgrades' },
    { name: 'Lighting Installation', slug: 'lighting-installation' },
  ];

  const quickLinks = [
    { name: 'About Allen Electric', path: '/about' },
    { name: 'Before & After Gallery', path: '/gallery' },
    { name: 'Customer Reviews', path: '/reviews' },
    { name: 'Book an Appointment', path: '/book' },
    { name: 'Contact & Dispatch', path: '/contact' },
    { name: 'Admin Dashboard Portal', path: '/admin' },
  ];

  return (
    <footer className="bg-brand-navy-900 text-slate-300 pt-16 relative overflow-hidden border-t border-white/5">
      {/* Financing Banner Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
        <div className="relative overflow-hidden bg-gradient-to-r from-brand-gold-500 to-amber-600 rounded-3xl p-8 md:p-12 shadow-2xl text-brand-navy-950 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16 animate-pulse-slow"></div>
          <div className="relative z-10 max-w-xl">
            <span className="bg-brand-navy-900 text-brand-gold-400 text-xs font-extrabold uppercase px-3 py-1.5 rounded-full tracking-wider">
              Financing Available
            </span>
            <h3 className="text-2xl md:text-3.5xl font-black tracking-tight mt-4 mb-2 font-display leading-tight">
              0% APR Financing for Up to 18 Months!
*            </h3>
            <p className="text-brand-navy-900/90 font-medium">
              Upgrade your panel or install a standby generator today with low monthly payments. Don't wait for emergencies to protect your home.
            </p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
            <Link
              to="/book"
              className="bg-brand-navy-900 hover:bg-brand-navy-950 text-white text-center font-bold px-6 py-4 rounded-xl transition-all shadow-lg active:scale-95 text-sm"
            >
              Apply In 2 Minutes
            </Link>
            <a
              href="tel:+12055856431"
              className="bg-white/20 hover:bg-white/30 border border-brand-navy-900/10 text-brand-navy-900 text-center font-bold px-6 py-4 rounded-xl transition-all text-sm"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* About Section */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-brand-gold-500 p-2 rounded-lg text-brand-navy-950">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <span className="font-extrabold text-lg text-white font-display">
              ALLEN <span className="text-brand-gold-400">ELECTRIC</span>
            </span>
          </div>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            Powering Alabama homes and businesses with premium, reliable electrical installations and emergency repairs. Fully licensed, insured, and dedicated to safety.
          </p>
          {/* Trust Badges */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg py-1 px-2.5 text-[11px] font-semibold text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-gold-400" />
              <span>Licensed AL #49281</span>
            </div>
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg py-1 px-2.5 text-[11px] font-semibold text-slate-300">
              <Award className="w-3.5 h-3.5 text-brand-gold-400" />
              <span>Insured & Bonded</span>
            </div>
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg py-1 px-2.5 text-[11px] font-semibold text-slate-300">
              <CheckCircle className="w-3.5 h-3.5 text-brand-gold-400" />
              <span>A+ Rated</span>
            </div>
          </div>
        </div>

        {/* Services Links */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Our Services</h4>
          <ul className="space-y-3 text-sm">
            {services.map((srv) => (
              <li key={srv.slug}>
                <Link to={`/services/${srv.slug}`} className="hover:text-brand-gold-400 hover:underline transition-colors">
                  {srv.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            {quickLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="hover:text-brand-gold-400 hover:underline transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Emergency Dispatch</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-brand-gold-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-bold">+1 (205) 585-6431</p>
                <p className="text-xs text-slate-400">Call 24/7 for emergency dispatch</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-brand-gold-400 shrink-0 mt-0.5" />
              <p className="hover:text-white transition-colors">dispatch@allenelectric.co</p>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-brand-gold-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-white">Birmingham, Alabama</p>
                <p className="text-xs text-slate-400">Serving central & statewide Alabama</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-brand-gold-400 shrink-0 mt-0.5" />
              <div>
                <p>Mon - Fri: 7:00 AM - 6:00 PM</p>
                <p>Sat: 8:00 AM - 4:00 PM</p>
                <p className="text-brand-gold-400 text-xs font-semibold">24/7 Emergency Support</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-brand-navy-950 py-8 px-4 md:px-8 border-t border-white/5 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <p>&copy; {currentYear} Allen Electric LLC. All Rights Reserved. Licensed Contractor ID: #AL-49281.</p>
            <p>Licensed, Insured, & Bonded for Residential & Commercial electrical installations in the state of Alabama.</p>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <span className="flex items-center gap-1 text-[10px] text-slate-600">
              Made with <Heart className="w-3.5 h-3.5 fill-red-600/30 text-red-600/30" /> in Alabama
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
