import React, { useState } from 'react';
import { dbService } from '../lib/supabase';
import { Phone, Mail, MapPin, Clock, ShieldAlert, CheckCircle, Send } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import confetti from 'canvas-confetti';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Panel Upgrade');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      await dbService.addLead({
        name,
        phone,
        email,
        service,
        details: `Submitted contact form message: ${message}`,
        type: 'contact'
      });

      setIsSubmitting(false);
      setIsSuccess(true);

      // Fire confetti
      confetti({
        particleCount: 100,
        spread: 60,
        origin: { y: 0.8 }
      });

      // Clear Form
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');

      // Auto dismiss success banner after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);

    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact & Dispatch | Allen Electric Alabama</title>
        <meta name="description" content="Reach our Alabama dispatch office. Call +1 205-585-6431 for 24/7 emergency response or submit an inquiry for a flat-rate estimate." />
      </Helmet>

      {/* Hero Banner */}
      <section className="bg-brand-navy-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.02]"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center">
          <span className="bg-brand-gold-500/10 text-brand-gold-400 text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full tracking-wider border border-brand-gold-500/20">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5.5xl font-black font-display tracking-tight mt-6 mb-4">
            Contact & Dispatch
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto font-light">
            Need emergency support or a flat-rate estimate? Reach out to our local dispatch crew. We are here to help.
          </p>
        </div>
      </section>

      {/* Contact Layout */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Info & Map */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Priority Emergency Banner */}
            <div className="bg-red-600/5 border border-red-500/20 p-6 rounded-3xl flex gap-4 items-start text-slate-800">
              <div className="bg-red-600 text-white p-2.5 rounded-xl shrink-0">
                <ShieldAlert className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="font-extrabold text-red-600 text-base font-display">24/7 Emergency Hotline</h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">
                   experiencing smoking outlets, blackouts, or tripping main breakers? Don't wait. Call us immediately at <a href="tel:+12055856431" className="font-bold underline text-red-600">+1 (205) 585-6431</a> for emergency dispatch.
                </p>
              </div>
            </div>

            {/* General Info */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 md:p-8 space-y-6 text-slate-800">
              <h3 className="font-extrabold text-xl font-display text-brand-navy-900 mb-2">Office Details</h3>
              
              <div className="flex items-start gap-3.5 text-xs md:text-sm">
                <Phone className="w-5 h-5 text-brand-gold-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">+1 (205) 585-6431</p>
                  <p className="text-xs text-slate-400">Call/Text 24 hours a day</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs md:text-sm">
                <Mail className="w-5 h-5 text-brand-gold-500 shrink-0 mt-0.5" />
                <div>
                  <a href="mailto:info@allenelectric.us" className="font-bold text-slate-800 hover:text-brand-gold-500 transition-colors">info@allenelectric.us</a>
                  <p className="text-xs text-slate-400">General and billing questions</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs md:text-sm">
                <MapPin className="w-5 h-5 text-brand-gold-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">Birmingham, Alabama</p>
                  <p className="text-xs text-slate-400">Serving central & statewide AL</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs md:text-sm border-t border-slate-200 pt-5">
                <Clock className="w-5 h-5 text-brand-gold-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-800">Business Hours</h4>
                  <p className="text-xs text-slate-500 mt-1">Monday - Friday: 7:00 AM - 6:00 PM</p>
                  <p className="text-xs text-slate-500">Saturday: 8:00 AM - 4:00 PM</p>
                  <p className="text-xs text-brand-gold-600 font-bold mt-1">24/7 Emergency Call Out Availability</p>
                </div>
              </div>
            </div>

            {/* Premium Map Placement Frame */}
            <div className="border border-slate-200 rounded-3xl overflow-hidden h-[250px] relative shadow-md group">
              {/* Custom High Tech Map background representation */}
              <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center p-6 text-center text-white">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#243960_1px,transparent_1px),linear-gradient(to_bottom,#243960_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20"></div>
                <MapPin className="w-10 h-10 text-brand-gold-500 animate-bounce mb-3 relative z-10" />
                <h4 className="font-extrabold text-sm font-display relative z-10">Birmingham Dispatch Headquarters</h4>
                <p className="text-[10px] text-slate-400 max-w-xs mt-1 relative z-10">Coordinates: 33.5186° N, 86.8104° W. Servicing all cities in Jefferson County, Shelby County, and statewide.</p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 bg-brand-gold-500 text-brand-navy-950 font-bold px-4 py-2 rounded-xl text-[10px] uppercase tracking-wider relative z-10 group-hover:scale-105 transition-transform"
                >
                  Get Directions
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-lg">
            <h3 className="font-extrabold text-xl font-display text-brand-navy-900 mb-2">Send an Inquiry</h3>
            <p className="text-slate-400 text-xs mb-6">
              Have questions or need a scheduled appointment? Submit details and we will reply within 30 minutes.
            </p>

            {isSuccess && (
              <div className="bg-emerald-50 border border-emerald-200/50 rounded-2xl p-4 mb-6 flex items-center gap-3 text-emerald-800 text-xs font-semibold animate-fade-in-up">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold">Message Submitted!</p>
                  <p className="text-[11px] font-normal text-emerald-600 mt-0.5">Thank you. Our dispatch office will call you at your provided phone number shortly.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs focus:ring-2 focus:ring-brand-gold-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (205) 555-0100"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs focus:ring-2 focus:ring-brand-gold-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane.doe@gmail.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs focus:ring-2 focus:ring-brand-gold-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Needed Service</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs focus:outline-none"
                >
                  <option value="Panel Upgrades">Panel Upgrade</option>
                  <option value="Generator Installation">Generator Installation</option>
                  <option value="Electrical Repairs">Electrical Repairs & Diagnostics</option>
                  <option value="Safety Inspection">Safety Inspection</option>
                  <option value="Lighting Installation">Lighting Installation</option>
                  <option value="Other">Other Custom Work</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Message Detail</label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your request in detail. Mention any specific timeline requirements..."
                  rows={5}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs focus:ring-2 focus:ring-brand-gold-500 focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-brand-navy-900 hover:bg-brand-navy-950 text-white font-black py-4 rounded-xl text-xs uppercase tracking-wider transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-brand-gold-400" />
                <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
              </button>
            </form>
          </div>

        </div>
      </section>
    </>
  );
};
