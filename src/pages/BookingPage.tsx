import React from 'react';
import { BookingWidget } from '../components/BookingWidget';
import { Phone, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const BookingPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Book Electrical Appointment | Allen Electric AL</title>
        <meta name="description" content="Select a service, pick your preferred date and time, upload photos, and book your electrician appointment online with Allen Electric." />
      </Helmet>

      {/* Hero Banner */}
      <section className="bg-brand-navy-950 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.02]"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center">
          <span className="bg-brand-gold-500/10 text-brand-gold-400 text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full tracking-wider border border-brand-gold-500/20">
            Online Scheduling
          </span>
          <h1 className="text-4xl md:text-5.5xl font-black font-display tracking-tight mt-6 mb-4">
            Book Appointment
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto font-light">
            Fast, secure, online scheduling. Pick your service type and preferred timeframe to request dispatch.
          </p>
        </div>
      </section>

      {/* Booking Form Wrapper */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Form Panel */}
          <div className="lg:col-span-8">
            <BookingWidget />
          </div>

          {/* Side Trust Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Dispatch Card */}
            <div className="bg-brand-navy-900 text-white rounded-3xl p-6 border border-white/10 shadow-xl relative overflow-hidden">
              <h3 className="font-extrabold text-lg font-display text-white mb-4">
                Booking Guarantees
              </h3>
              
              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex gap-3 items-start">
                  <CheckCircle className="w-5 h-5 text-brand-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white mb-0.5">15-Minute Callback</h4>
                    <p className="leading-relaxed">Once you request a slot, our dispatcher calls you in minutes to finalize ETA details.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <CheckCircle className="w-5 h-5 text-brand-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white mb-0.5">Flat-Rate Quotations</h4>
                    <p className="leading-relaxed">All scheduling comes with a written, flat-rate quote before any wire is cut or breakers swapped.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <CheckCircle className="w-5 h-5 text-brand-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white mb-0.5">Craft Warranty</h4>
                    <p className="leading-relaxed">All work is backed by our signature 2-year warranty certificate covering installation quality.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Need Direct Assistance Box */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm text-center">
              <Phone className="w-8 h-8 text-brand-gold-500 mx-auto mb-3" />
              <h4 className="font-extrabold text-brand-navy-900 text-sm">Need Help Scheduling?</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed mt-1 mb-4">Have questions about complex layouts or emergency wiring? Call our office direct.</p>
              <a
                href="tel:+12055856431"
                className="bg-brand-navy-900 hover:bg-brand-navy-950 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all inline-block"
              >
                Call +1 (205) 585-6431
              </a>
            </div>

          </div>

        </div>
      </section>
    </>
  );
};
