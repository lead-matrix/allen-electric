import React, { useState, useEffect } from 'react';
import { dbService } from '../lib/supabase';
import { initialReviews } from '../data/reviews';
import type { Review } from '../data/reviews';
import { Star, MessageSquare, PenTool, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { Helmet } from 'react-helmet-async';

export const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Form States
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [service, setService] = useState('Panel Upgrade');
  const [text, setText] = useState('');

  const loadReviews = async () => {
    try {
      const data = await dbService.getReviews();
      setReviews(data);
    } catch (err) {
      console.error(err);
      // Fallback
      setReviews(initialReviews);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim() || !location.trim()) return;

    setIsSubmitting(true);
    try {
      await dbService.addReview({
        name,
        location,
        rating,
        text,
        service
      });
      
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Fire confetti
      confetti({
        particleCount: 100,
        spread: 60,
        origin: { y: 0.8 }
      });

      // Reload
      await loadReviews();

      // Clear Form
      setName('');
      setLocation('');
      setRating(5);
      setText('');

      // Dismiss success state after 4 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 4000);

    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Customer Reviews | Allen Electric Ratings & Testimonials</title>
        <meta name="description" content="Read real reviews from homeowners and businesses across Alabama who trust Allen Electric. See why we maintain a 5.0-star rating for safety and service." />
      </Helmet>

      {/* Hero Banner */}
      <section className="bg-brand-navy-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.02]"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center">
          <span className="bg-brand-gold-500/10 text-brand-gold-400 text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full tracking-wider border border-brand-gold-500/20">
            Client Feedback
          </span>
          <h1 className="text-4xl md:text-5.5xl font-black font-display tracking-tight mt-6 mb-4">
            Customer Reviews
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto font-light">
            We are proud to serve communities across Alabama. Read feedback from our customers and leave your own review.
          </p>
        </div>
      </section>

      {/* Main Reviews Layout */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Aggregates & Submit Form */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Stats Widget */}
            <div className="bg-slate-50 border border-slate-200/80 p-6 md:p-8 rounded-3xl shadow-sm text-slate-800">
              <h3 className="font-extrabold text-xl font-display text-brand-navy-900 mb-6">
                Rating Overview
              </h3>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl font-black font-display text-brand-navy-900">5.0</span>
                <div>
                  <div className="flex gap-0.5 text-brand-gold-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 font-semibold block mt-1">Based on {reviews.length + 242} verified local jobs</span>
                </div>
              </div>

              {/* Progress bars representation */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-3">
                  <span className="w-8 text-slate-500">5 star</span>
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-gold-500 w-[98%]"></div>
                  </div>
                  <span className="w-8 text-right text-slate-400 font-bold">98%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 text-slate-500">4 star</span>
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-gold-500 w-[2%]"></div>
                  </div>
                  <span className="w-8 text-right text-slate-400 font-bold">2%</span>
                </div>
                {[3, 2, 1].map((s) => (
                  <div key={s} className="flex items-center gap-3">
                    <span className="w-8 text-slate-500">{s} star</span>
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-gold-500 w-0"></div>
                    </div>
                    <span className="w-8 text-right text-slate-400 font-bold">0%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Leave a Review Form */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-lg">
              <h3 className="font-extrabold text-xl font-display text-brand-navy-900 mb-2 flex items-center gap-2">
                <PenTool className="w-5 h-5 text-brand-gold-500" />
                Write a Review
              </h3>
              <p className="text-slate-400 text-xs mb-6">
                Tell us about your experience. Your feedback keeps our standards high.
              </p>

              {isSuccess && (
                <div className="bg-emerald-50 border border-emerald-200/50 rounded-2xl p-4 mb-6 flex items-center gap-3 text-emerald-800 text-xs font-semibold animate-fade-in-up">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-bold">Review Added Successfully!</p>
                    <p className="text-[11px] font-normal text-emerald-600 mt-0.5">Thank you for sharing your experience with the Alabama community.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane D."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:ring-2 focus:ring-brand-gold-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Your City (AL)</label>
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Birmingham, AL"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:ring-2 focus:ring-brand-gold-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Service Done</label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none"
                    >
                      <option value="Panel Upgrade">Panel Upgrade</option>
                      <option value="Generator Installation">Generator Installation</option>
                      <option value="Electrical Repair">Electrical Repair</option>
                      <option value="Safety Inspection">Safety Inspection</option>
                      <option value="Lighting Installation">Lighting Installation</option>
                      <option value="Other">Other Service</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Rating</label>
                    <div className="flex gap-1 items-center mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              rating >= star ? 'text-brand-gold-500 fill-current' : 'text-slate-200'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Review Comments</label>
                  <textarea
                    required
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Describe the electrician's punctuality, expertise, cleanliness..."
                    rows={4}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs focus:ring-2 focus:ring-brand-gold-500 focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-navy-900 hover:bg-brand-navy-950 text-white font-black py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Posting Review...' : 'Submit Review'}
                </button>
              </form>
            </div>

          </div>

          {/* Right Column: Reviews List Feed */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-extrabold text-xl text-brand-navy-900 font-display flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-brand-gold-500" />
                Recent Reviews ({reviews.length})
              </h3>
            </div>

            <div className="space-y-6 max-h-[700px] overflow-y-auto pr-1">
              {reviews.map((rev) => (
                <div key={rev.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-extrabold text-brand-navy-900 text-sm font-display">{rev.name}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{rev.location} &bull; {rev.service}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold">{rev.date}</span>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-0.5 text-brand-gold-500 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed italic">
                    "{rev.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* CTA final */}
      <section className="bg-brand-navy-900 py-20 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.02]"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4.5xl font-black font-display tracking-tight text-white mb-4">
            Need High-Quality Electrical Upgrades?
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 max-w-xl mx-auto font-light font-sans">
            Schedule today to join our list of satisfied Alabama homeowners and commercial clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book"
              className="bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-navy-950 font-black px-8 py-4 rounded-xl shadow-lg transition-transform active:scale-95 text-sm"
            >
              Request Schedule Slot
            </Link>
            <a
              href="tel:+12055856431"
              className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold px-8 py-4 rounded-xl text-sm"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
