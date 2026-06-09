import React from 'react';
import { servicesData } from '../data/services';
import { Link } from 'react-router-dom';
import { Zap, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const ServicesHub: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Our Services | Residential & Commercial Electrician AL</title>
        <meta name="description" content="Explore our wide range of electrical services including panel upgrades, generator installation, smart home automation, inspections, and repairs." />
      </Helmet>

      {/* Hero Banner */}
      <section className="bg-brand-navy-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.02]"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center">
          <span className="bg-brand-gold-500/10 text-brand-gold-400 text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full tracking-wider border border-brand-gold-500/20">
            What We Do
          </span>
          <h1 className="text-4xl md:text-5.5xl font-black font-display tracking-tight mt-6 mb-4">
            Alabama's Electrical Service Hub
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto font-light">
            We deliver state-licensed electrical expertise for residential upgrades, safety diagnostics, and high-power commercial installations.
          </p>
        </div>
      </section>

      {/* Services List Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((srv) => (
              <div
                key={srv.id}
                className="bg-slate-50 border border-slate-200/60 hover-glow rounded-3xl p-6 md:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="bg-brand-navy-900/5 text-brand-navy-900 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                    <Zap className="w-6 h-6 text-brand-navy-900 fill-current" />
                  </div>
                  <h3 className="font-extrabold text-xl text-brand-navy-900 font-display mb-3">
                    {srv.title}
                  </h3>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6">
                    {srv.shortDesc}
                  </p>

                  <div className="space-y-2 mb-6">
                    {srv.benefits.slice(0, 2).map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <ShieldCheck className="w-4 h-4 text-brand-gold-500 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-200/50 pt-4 mt-6 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Estimated Cost</span>
                    <span className="text-xs font-bold text-slate-800 mt-0.5">{srv.pricing.split(' ')[0]} Est.</span>
                  </div>
                  <Link
                    to={`/services/${srv.id}`}
                    className="flex items-center gap-1 bg-brand-navy-900 hover:bg-brand-navy-950 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-gold-400" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* General FAQ Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-200/40">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <span className="bg-brand-navy-900 text-brand-gold-400 text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full tracking-wider">
              FAQ
            </span>
            <h2 className="text-3.5xl md:text-5.5xl font-black font-display text-brand-navy-900 mt-6 mb-4">
              Common Questions
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-extrabold text-brand-navy-900 text-base md:text-lg mb-2 flex items-start gap-2">
                <HelpCircle className="w-5 h-5 text-brand-gold-500 shrink-0 mt-0.5" />
                <span>Do you coordinate permits with local Alabama cities?</span>
              </h3>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed pl-7">
                Yes, absolutely. We manage all required municipal building permits, inspection approvals, and coordination with electrical utilities like Alabama Power.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-extrabold text-brand-navy-900 text-base md:text-lg mb-2 flex items-start gap-2">
                <HelpCircle className="w-5 h-5 text-brand-gold-500 shrink-0 mt-0.5" />
                <span>Are there financing plans for standby generators and panels?</span>
              </h3>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed pl-7">
                Yes. We offer financing plans, including 0% APR options for up to 18 months, for qualified homeowners undergoing panel upgrades or whole-home standby generator installations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-brand-navy-900 py-20 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.02]"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4.5xl font-black font-display tracking-tight text-white mb-4">
            Need Custom Wiring or System Design?
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 max-w-xl mx-auto font-light">
            Speak directly to our Alabama estimator to schedule a site walk or plan custom projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book"
              className="bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-navy-950 font-black px-8 py-4 rounded-xl shadow-lg transition-transform active:scale-95 text-sm"
            >
              Book Service Online
            </Link>
            <a
              href="tel:+12055856431"
              className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold px-8 py-4 rounded-xl text-sm"
            >
              Call +1 (205) 585-6431
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
