import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText } from 'lucide-react';

export const Terms: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Allen Electric</title>
        <meta name="description" content="Terms of Service for Allen Electric. Learn about our service terms, pricing, bookings, and warranties." />
      </Helmet>

      {/* Hero Header */}
      <section className="bg-brand-navy-950 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.02]"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-4">
          <div className="bg-brand-gold-500/10 text-brand-gold-400 p-3 rounded-2xl w-14 h-14 flex items-center justify-center mx-auto border border-brand-gold-500/20">
            <FileText className="w-7 h-7" />
          </div>
          <h1 className="text-3xl md:text-4.5xl font-black font-display tracking-tight text-white">
            Terms of Service
          </h1>
          <p className="text-slate-400 text-xs max-w-md mx-auto">
            Last Updated: June 14, 2026. Standard terms of operation.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-slate-50 text-slate-700">
        <div className="max-w-3xl mx-auto px-4 space-y-8 text-sm leading-relaxed text-left">
          
          <div className="space-y-3 text-left">
            <h2 className="text-xl font-bold text-brand-navy-900 font-display">1. Agreement to Terms</h2>
            <p>
              By accessing our website ([allen-electric.vercel.app](https://allen-electric.vercel.app)) and booking our services, you agree to be bound by these Terms of Service. If you do not agree with all of these terms, you are prohibited from using the site and must discontinue our services immediately.
            </p>
          </div>

          <div className="space-y-3 text-left">
            <h2 className="text-xl font-bold text-brand-navy-900 font-display">2. Service Bookings & Estimates</h2>
            <p>
              We offer online scheduling and estimate requests for residential and commercial electrical projects:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-left">
              <li><strong>Estimates:</strong> Estimates requested through our forms are subject to physical inspection. On-site checks are required to validate final pricing before starting work.</li>
              <li><strong>Cancellations:</strong> Please provide at least 24 hours notice for any appointment cancellations or rescheduling requests to help us optimize our technician dispatch pipeline.</li>
              <li><strong>Lead Management:</strong> All submitted bookings are logged in real-time in our database to ensure reliable scheduling and response tracking.</li>
            </ul>
          </div>

          <div className="space-y-3 text-left">
            <h2 className="text-xl font-bold text-brand-navy-900 font-display">3. Pricing & Payments</h2>
            <p>
              We stand apart through transparent, flat-rate pricing. Technicians will review all options and verify costs with you before starting any repairs or panel upgrades. Payments are due upon completion of the service call unless other billing terms are agreed in writing.
            </p>
          </div>

          <div className="space-y-3 text-left">
            <h2 className="text-xl font-bold text-brand-navy-900 font-display">4. Warranty & Liability</h2>
            <p>
              We stand behind our work with a standard **2-Year Workmanship Warranty**. If any issues arise from our electrical installations or repairs during this period, contact us and we will resolve it promptly. Our liability is limited to the cost of services rendered.
            </p>
          </div>

          <div className="space-y-3 text-left">
            <h2 className="text-xl font-bold text-brand-navy-900 font-display">5. Service Areas & Compliance</h2>
            <p>
              Allen Electric operates in compliance with national electrical codes (NEC) and state regulations. We maintain local dispatch crews stationed across central and statewide Alabama.
            </p>
          </div>

        </div>
      </section>
    </>
  );
};
