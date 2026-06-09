import React, { useState, useEffect } from 'react';
import { useExitIntent } from '../hooks/useExitIntent';
import { dbService } from '../lib/supabase';
import { X, Sparkles, Phone, CheckCircle, Gift } from 'lucide-react';

export const ExitIntentPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if user has already seen/dismissed the popup in this session
    const shown = sessionStorage.getItem('allen_electric_exit_popup');
    if (shown) return;
  }, []);

  useExitIntent(() => {
    const shown = sessionStorage.getItem('allen_electric_exit_popup');
    if (!shown && !isSubmitted) {
      setIsVisible(true);
      sessionStorage.setItem('allen_electric_exit_popup', 'true');
    }
  });

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    try {
      await dbService.addLead({
        name,
        phone,
        email: '',
        service: 'Instant $50 Coupon Request',
        details: 'Submitted exit-intent coupon popup. Awaiting callback.',
        type: 'quote'
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Auto close after 3 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-brand-navy-950/80 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-brand-navy-900 border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl text-white overflow-hidden animate-fade-in-up z-10">
        {/* Glow decorations */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-brand-gold-500 text-brand-navy-950 p-2.5 rounded-2xl">
                <Gift className="w-6 h-6" />
              </div>
              <span className="text-brand-gold-400 text-xs font-extrabold uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Special Offer</span>
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-black font-display tracking-tight leading-tight mb-2">
              Wait! Get <span className="text-brand-gold-400">$50 OFF</span> Your First Service
            </h3>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              Don't leave yet! Enter your details below to lock in a $50 discount voucher on your first panel upgrade, repair, or generator install.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-brand-gold-500 placeholder-slate-500"
                />
              </div>
              <div>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your Phone Number"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-brand-gold-500 placeholder-slate-500"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-gold-500 to-amber-600 text-brand-navy-950 font-black py-4 rounded-xl text-sm transition-all hover:brightness-110 shadow-lg active:scale-95"
              >
                <Phone className="w-4 h-4" />
                <span>{isSubmitting ? 'Locking in Offer...' : 'Claim $50 Discount'}</span>
              </button>
            </form>
            <p className="text-[10px] text-slate-500 text-center mt-3">
              We respect your privacy. No spam. Unsubscribe anytime.
            </p>
          </div>
        ) : (
          <div className="text-center py-6 flex flex-col items-center">
            <div className="bg-emerald-500/10 text-emerald-400 p-3.5 rounded-full mb-4">
              <CheckCircle className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-black font-display text-white tracking-tight mb-2">
              Discount Locked In!
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              We have saved your discount details. A dispatcher will contact you at <span className="text-brand-gold-400 font-bold">{phone}</span> shortly to set up your appointment.
            </p>
            <span className="text-xs bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-slate-400">
              Coupon Code: <span className="font-bold text-brand-gold-400 tracking-wider">ALLEN50</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
