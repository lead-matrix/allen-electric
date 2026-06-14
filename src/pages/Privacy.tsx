import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck } from 'lucide-react';

export const Privacy: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Allen Electric</title>
        <meta name="description" content="Privacy Policy for Allen Electric. Learn how we collect, use, and protect your information when booking electrical services." />
      </Helmet>

      {/* Hero Header */}
      <section className="bg-brand-navy-950 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.02]"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-4">
          <div className="bg-brand-gold-500/10 text-brand-gold-400 p-3 rounded-2xl w-14 h-14 flex items-center justify-center mx-auto border border-brand-gold-500/20">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-3xl md:text-4.5xl font-black font-display tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="text-slate-400 text-xs max-w-md mx-auto">
            Last Updated: June 14, 2026. Your privacy is our absolute priority.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-slate-50 text-slate-700">
        <div className="max-w-3xl mx-auto px-4 space-y-8 text-sm leading-relaxed text-left">
          
          <div className="space-y-3 text-left">
            <h2 className="text-xl font-bold text-brand-navy-900 font-display">1. Introduction</h2>
            <p>
              Welcome to Allen Electric ("we," "our," "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website ([allen-electric.vercel.app](https://allen-electric.vercel.app)) and use our services, including booking appointments and requesting estimates.
            </p>
          </div>

          <div className="space-y-3 text-left">
            <h2 className="text-xl font-bold text-brand-navy-900 font-display">2. Information We Collect</h2>
            <p>
              We collect personal information that you voluntarily provide to us when expressing an interest in obtaining information about us or our products and services, or when booking appointments.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-left">
              <li><strong>Contact Information:</strong> We collect your name, phone number, email address, and mailing/billing address to coordinate on-site electrical service calls.</li>
              <li><strong>Job Details:</strong> We collect information about the electrical issues or upgrades requested, and any photographs you upload to assist our dispatch team.</li>
              <li><strong>Database Records:</strong> Submissions through our estimate and booking forms are stored securely (using Supabase or LocalStorage) to prevent leads from slipping through the cracks.</li>
            </ul>
          </div>

          <div className="space-y-3 text-left">
            <h2 className="text-xl font-bold text-brand-navy-900 font-display">3. How We Use Your Information</h2>
            <p>
              We use personal information collected via our website for several business purposes, including:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-left">
              <li><strong>Service Delivery:</strong> To schedule appointments, dispatch certified electricians, and compile flat-rate estimates.</li>
              <li><strong>Administrative Communication:</strong> To send appointment confirmations, reminder text alerts, and dispatcher notifications.</li>
              <li><strong>Analytics:</strong> To monitor website traffic and conversion rates via privacy-focused analytics tools (like Vercel Analytics).</li>
            </ul>
          </div>

          <div className="space-y-3 text-left">
            <h2 className="text-xl font-bold text-brand-navy-900 font-display">4. Information Sharing & Security</h2>
            <p>
              We do not sell, rent, or trade your personal information with third parties. Your details are accessed only by authorized dispatchers and technicians. We implement robust database rules, SSL encryption, and security protocols to ensure that not a single piece of client data is compromised.
            </p>
          </div>

          <div className="space-y-3 text-left">
            <h2 className="text-xl font-bold text-brand-navy-900 font-display">5. Your Rights</h2>
            <p>
              You have the right to request access to the personal information we collect from you, request changes to that data, or ask us to delete it. Please contact our administrative office at <a href="mailto:info@allenelectric.us" className="text-brand-gold-400 font-bold hover:underline">info@allenelectric.us</a> to submit any inquiries.
            </p>
          </div>

        </div>
      </section>
    </>
  );
};
