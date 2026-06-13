import React from 'react';
import { ShieldCheck, Award, FileText, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export const About: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>About Allen Electric | Certified Electricians in Alabama</title>
        <meta name="description" content="Learn about Allen Electric, Alabama's leading residential and commercial electrical contractor. Fully licensed, bonded, insured, and committed to absolute safety." />
      </Helmet>

      {/* Hero Banner */}
      <section className="bg-brand-navy-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.02]"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center">
          <span className="bg-brand-gold-500/10 text-brand-gold-400 text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full tracking-wider border border-brand-gold-500/20">
            About Our Company
          </span>
          <h1 className="text-4xl md:text-5.5xl font-black font-display tracking-tight mt-6 mb-4">
            Alabama's Premier Electrical Team
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto font-light">
            Providing homeowners and businesses across Alabama with safe, modern, and code-certified electrical contracting services.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <span className="text-brand-gold-500 text-xs font-extrabold uppercase tracking-wider mb-2 block">
              Established & Trusted
            </span>
            <h2 className="text-3xl md:text-4.5xl font-black font-display text-brand-navy-900 tracking-tight mb-6 leading-tight">
              A Legacy of Quality, Safety, & Electrical Excellence
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              Founded on the pillars of absolute safety and transparent service, Allen Electric has grown from a single troubleshooting truck to one of Alabama's most respected electrical outfits.
            </p>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Whether responding to a midnight storm outage or wiring complex multi-family housing complexes, we treat every job with professional precision. We handle scheduling, permitting, utility coordination, and code sign-offs.
            </p>
            <div className="grid grid-cols-2 gap-6 bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-6 text-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-brand-gold-500 shrink-0" />
                <span className="text-xs font-bold">State Licensed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-brand-gold-500 shrink-0" />
                <span className="text-xs font-bold">2-Year Work Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-brand-gold-500 shrink-0" />
                <span className="text-xs font-bold">NEC Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-brand-gold-500 shrink-0" />
                <span className="text-xs font-bold">Background Checked</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
              alt="Electrician testing system"
              className="rounded-3xl shadow-xl w-full object-cover h-[350px] md:h-[450px]"
            />
            {/* License Overlay Badges */}
            <div className="absolute -bottom-6 -left-6 bg-brand-navy-900 text-white rounded-2xl p-5 border border-white/10 shadow-2xl max-w-xs">
              <p className="text-[10px] text-brand-gold-400 uppercase tracking-widest font-extrabold mb-1">State Licensure</p>
              <p className="font-display font-extrabold text-base leading-tight text-white">Fully Licensed, Bonded & Insured</p>
              <p className="text-xs text-slate-400 mt-2">Validated with the Alabama Electrical Contractors Board. Fully Insured & Bonded.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center mb-16">
          <span className="bg-brand-navy-900 text-brand-gold-400 text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full tracking-wider">
            Our Pillars
          </span>
          <h2 className="text-3.5xl md:text-5.5xl font-black font-display text-brand-navy-900 mt-6 mb-4">
            The Values That Drive Us
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-md text-center flex flex-col items-center">
            <div className="bg-brand-navy-900/5 p-4 rounded-full text-brand-navy-900 mb-6">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="font-extrabold text-xl font-display text-brand-navy-900 mb-3">Absolute Safety First</h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
              We make no compromises on safety. Our electricians adhere strictly to OSHA mandates and national NEC safety regulations to protect your property.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-md text-center flex flex-col items-center">
            <div className="bg-brand-navy-900/5 p-4 rounded-full text-brand-navy-900 mb-6">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="font-extrabold text-xl font-display text-brand-navy-900 mb-3">Uncompromising Honesty</h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
              No hidden fees, no double charges, and no high-pressure sales. We explain diagnoses clearly and present all pricing upfront before starting.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-md text-center flex flex-col items-center">
            <div className="bg-brand-navy-900/5 p-4 rounded-full text-brand-navy-900 mb-6">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="font-extrabold text-xl font-display text-brand-navy-900 mb-3">2-Year Craft Guarantee</h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
              Every outlet installed, wire pulled, and panel fitted is backed by a full two-year warranty. If a component fails due to installation quality, we replace it free.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-navy-900 py-20 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.02]"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-3.5xl md:text-5xl font-black font-display tracking-tight text-white mb-4">
            Ready to Experience the Allen Difference?
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 max-w-xl mx-auto font-light">
            Connect with our local dispatch office today for premium service. Enjoy fast arrivals, flat-rate pricing, and certified safety.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book"
              className="bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-navy-950 font-black px-8 py-4 rounded-xl shadow-lg transition-transform active:scale-95 text-sm"
            >
              Book Your Appointment
            </Link>
            <a
              href="tel:+12055856431"
              className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold px-8 py-4 rounded-xl text-sm"
            >
              Speak to Dispatcher
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
