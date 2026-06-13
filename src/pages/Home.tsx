import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/services';
import { initialReviews } from '../data/reviews';
import { BeforeAfterGallery } from '../components/BeforeAfterGallery';
import { InteractiveMap } from '../components/InteractiveMap';
import { dbService } from '../lib/supabase';
import { 
  Zap, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  CheckCircle, 
  ArrowRight, 
  Star, 
  UserCheck, 
  Clock, 
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const Home: React.FC = () => {
  // Testimonial Carousel state
  const [reviews, setReviews] = useState<any[]>(initialReviews);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  React.useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await dbService.getReviews();
        if (data && data.length > 0) {
          setReviews(data);
        }
      } catch (err) {
        console.error('Error loading reviews on homepage:', err);
      }
    };
    loadReviews();
  }, []);

  // Estimate Form State
  const [estimateName, setEstimateName] = useState('');
  const [estimatePhone, setEstimatePhone] = useState('');
  const [estimateService, setEstimateService] = useState('Panel Upgrades');
  const [isEstimateSubmitting, setIsEstimateSubmitting] = useState(false);
  const [isEstimateSuccess, setIsEstimateSuccess] = useState(false);

  const handleEstimateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!estimateName.trim() || !estimatePhone.trim()) return;

    setIsEstimateSubmitting(true);
    try {
      await dbService.addLead({
        name: estimateName,
        phone: estimatePhone,
        email: '',
        service: estimateService,
        details: 'Submitted Request Free Estimate form from Home page hero section.',
        type: 'quote'
      });
      setIsEstimateSubmitting(false);
      setIsEstimateSuccess(true);
      setEstimateName('');
      setEstimatePhone('');
    } catch (err) {
      console.error(err);
      setIsEstimateSubmitting(false);
    }
  };

  const handleNextReview = () => {
    setActiveReviewIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrevReview = () => {
    setActiveReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Hero images & before-after comparison images
  const heroImage = 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=80'; // Electrician testing panel
  const beforePanelImage = 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=600&q=80'; // Old chaotic electrical panel
  const afterPanelImage = 'https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&w=600&q=80'; // Clean modern panel install

  const stats = [
    { value: '20+', label: 'Years Experience' },
    { value: '5,000+', label: 'Projects Completed' },
    { value: '100%', label: 'Satisfaction Guarantee' },
    { value: '24/7', label: 'Emergency Support' },
  ];

  const pillars = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-brand-gold-500" />,
      title: 'Licensed Professionals',
      description: 'Our Alabama master electricians undergo background checks and continuous national code (NEC) training.',
    },
    {
      icon: <DollarSign className="w-8 h-8 text-brand-gold-500" />,
      title: 'Transparent Pricing',
      description: 'We charge flat-rate pricing. You approve options in writing before any work begins — no surprise bills.',
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-brand-gold-500" />,
      title: 'Quality Workmanship',
      description: 'We back all of our residential and commercial electrical work with a full 2-year warranty guarantee.',
    },
    {
      icon: <Clock className="w-8 h-8 text-brand-gold-500" />,
      title: 'Fast Scheduling',
      description: 'We dispatch locally. Enjoy rapid diagnostic arrival times and clear mobile ETA notifications.',
    },
    {
      icon: <UserCheck className="w-8 h-8 text-brand-gold-500" />,
      title: 'Excellent Customer Service',
      description: 'We treat your property with respect, wearing boot covers and cleaning up fully before we leave.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Allen Electric | Top Electrical Contractor in Alabama</title>
        <meta name="description" content="Powering Alabama homes and businesses with premium electrical solutions. Licensed and insured contractors for panel upgrades, generator installs, and repairs." />
        {/* Local Business JSON-LD Schema */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Electrician",
              "name": "Allen Electric",
              "image": "${heroImage}",
              "telephone": "+1-205-585-6431",
              "url": "https://allenelectric.co",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Birmingham",
                "addressRegion": "AL",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "33.5186",
                "longitude": "-86.8104"
              },
              "priceRange": "$$",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "07:00",
                "closes": "18:00"
              }
            }
          `}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-brand-navy-950 text-white overflow-hidden pt-12">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30" style={{ backgroundImage: `url(${heroImage})` }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-950 via-brand-navy-950/80 to-transparent"></div>
        
        {/* Tech Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-[0.03]"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full text-center lg:text-left grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12">
          {/* Hero Text */}
          <div className="lg:col-span-7 flex flex-col justify-center animate-fade-in-up">
            <span className="inline-flex items-center justify-center lg:justify-start gap-2 text-brand-gold-400 text-sm font-extrabold uppercase tracking-widest mb-4">
              <span className="bg-brand-gold-500/20 text-brand-gold-400 px-3 py-1 rounded-full text-xs">
                Licensed. Insured. Trusted.
              </span>
            </span>
            <h1 className="text-4.5xl md:text-6xl font-black font-display tracking-tight leading-none mb-6">
              Powering Alabama Homes <br className="hidden md:inline"/>
              & Businesses With <br className="hidden md:inline"/>
              <span className="text-gradient-gold">Reliable Solutions</span>
            </h1>
            <p className="text-slate-300 text-base md:text-lg mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              From panel upgrades and generator installations to smart home wiring, Allen Electric delivers premium service backed by local, certified master electricians.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link
                to="/book"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-brand-gold-500 to-amber-600 text-brand-navy-950 hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-brand-gold-500/10 px-8 py-4 rounded-2xl text-base font-black"
              >
                <Calendar className="w-5 h-5 fill-current" />
                <span>Book Appointment</span>
              </Link>
              <a
                href="tel:+12055856431"
                className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-gold-500/40 text-white transition-all px-8 py-4 rounded-2xl text-base font-bold"
              >
                <Phone className="w-5 h-5 text-brand-gold-400" />
                <span>Call Now: +1 (205) 585-6431</span>
              </a>
            </div>

            {/* Display Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/5 max-w-2xl mx-auto lg:mx-0 text-slate-400 text-xs">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-gold-400 shrink-0" />
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <Clock className="w-4 h-4 text-brand-gold-400 shrink-0" />
                <span>Fast Response</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <UserCheck className="w-4 h-4 text-brand-gold-400 shrink-0" />
                <span>Professional Service</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <CheckCircle className="w-4 h-4 text-brand-gold-400 shrink-0" />
                <span>Satisfaction Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Hero Right Widget (Quick Estimate Box) */}
          <div className="lg:col-span-5 bg-brand-navy-900/80 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl text-left">
            <h3 className="text-xl font-bold font-display text-white tracking-tight mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-gold-400" />
              Request Free Estimate
            </h3>
            <p className="text-slate-400 text-xs mb-6">
              Fill in your details below and a certified technician will call you in minutes.
            </p>
            {isEstimateSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="bg-emerald-500/10 text-emerald-400 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto border border-emerald-500/20">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="font-extrabold text-white text-lg font-display">Estimate Request Sent!</h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Thank you. A certified technician has been dispatched and will call you at <span className="text-brand-gold-400 font-bold">{estimatePhone}</span> in a few minutes.
                </p>
                <button
                  onClick={() => {
                    setIsEstimateSuccess(false);
                    setEstimatePhone('');
                  }}
                  className="text-xs text-brand-gold-400 font-bold hover:underline mt-4"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleEstimateSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={estimateName}
                    onChange={(e) => setEstimateName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-brand-gold-500 placeholder-slate-600"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={estimatePhone}
                    onChange={(e) => setEstimatePhone(e.target.value)}
                    placeholder="+1 (205) 555-0100"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-brand-gold-500 placeholder-slate-600"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Needed Service</label>
                  <select 
                    value={estimateService}
                    onChange={(e) => setEstimateService(e.target.value)}
                    className="w-full bg-brand-navy-900 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-brand-gold-500"
                  >
                    <option value="Panel Upgrades">Panel Upgrade</option>
                    <option value="Generator Installation">Generator Installation</option>
                    <option value="Electrical Repairs">Electrical Repair</option>
                    <option value="Lighting Installation">Lighting Installation</option>
                    <option value="Other">Other Service</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={isEstimateSubmitting}
                  className="w-full bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-navy-950 font-black py-3 rounded-xl text-xs uppercase tracking-wider transition-all disabled:opacity-50"
                >
                  {isEstimateSubmitting ? 'Sending Request...' : 'Send Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Trust Stats Bar */}
      <section className="bg-brand-navy-950 border-t border-b border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-3.5xl md:text-5xl font-extrabold text-brand-gold-400 font-display">
                {stat.value}
              </span>
              <span className="text-xs text-slate-400 font-medium tracking-wide mt-1 uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="bg-brand-navy-900 text-brand-gold-400 text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full tracking-wider">
              Electrical Services
            </span>
            <h2 className="text-3.5xl md:text-5xl font-black font-display tracking-tight text-brand-navy-900 mt-4 mb-4">
              Professional Electrical Services
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              We specialize in flat-rate residential and commercial electrical work, diagnostics, and high-power safety upgrades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((srv) => (
              <div
                key={srv.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md hover-glow flex flex-col justify-between"
              >
                <div>
                  <div className="bg-brand-navy-900/5 text-brand-navy-900 w-12 h-12 rounded-2xl flex items-center justify-center mb-5">
                    {/* Dynamic loading mock helper */}
                    <Zap className="w-6 h-6 text-brand-navy-900 fill-current" />
                  </div>
                  <h3 className="font-extrabold text-xl text-brand-navy-900 font-display mb-3">
                    {srv.title}
                  </h3>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6">
                    {srv.shortDesc}
                  </p>
                </div>
                <div className="flex justify-between items-center border-t border-slate-100 pt-4 mt-4">
                  <span className="text-[11px] text-slate-400 font-semibold">{srv.pricing.split(' ')[0]} Est.</span>
                  <Link
                    to={`/services/${srv.id}`}
                    className="flex items-center gap-1.5 text-brand-gold-600 hover:text-brand-gold-700 text-xs font-bold transition-all"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-brand-navy-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Why Left */}
          <div className="lg:col-span-5">
            <span className="bg-brand-gold-500/10 text-brand-gold-400 text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full tracking-wider border border-brand-gold-500/20">
              Why Choose Allen Electric
            </span>
            <h2 className="text-3.5xl md:text-5xl font-black font-display tracking-tight mt-6 mb-4 leading-tight">
              The Alabama Standard for <br/>
              <span className="text-brand-gold-400">Trusted Electrical</span>
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8">
              We stand apart through flat-rate pricing, state-licensed master electricians, background-checked safety assurances, and prompt service scheduling guarantees.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-6 py-3.5 rounded-xl text-sm font-bold transition-colors"
            >
              <span>Learn About Our Guarantees</span>
              <ArrowRight className="w-4 h-4 text-brand-gold-400" />
            </Link>
          </div>

          {/* Why Right */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.slice(0, 4).map((pillar, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-start gap-4">
                <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                  {pillar.icon}
                </div>
                <div>
                  <h3 className="font-extrabold text-lg font-display mb-1.5">{pillar.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Before/After Gallery Highlight Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Gallery Left Slider */}
          <div className="lg:col-span-7">
            <BeforeAfterGallery 
              beforeImage={beforePanelImage}
              afterImage={afterPanelImage}
              beforeLabel="Old Fuse Box / High Risk Panel"
              afterLabel="Premium 200A Panel Upgrade"
            />
          </div>

          {/* Gallery Right Details */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="bg-brand-navy-900 text-brand-gold-400 text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full tracking-wider w-fit">
              Real Case Studies
            </span>
            <h2 className="text-3.5xl md:text-4.5xl font-black font-display tracking-tight text-brand-navy-900 mt-6 mb-4 leading-tight">
              Before & After Panel Upgrades
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Older Alabama homes are often under-powered for modern HVAC systems and EV charging circuits. We perform complete code-certified breaker box replacements to protect your home.
            </p>
            <div className="space-y-3 mb-8 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-navy-900"></span>
                <span>Replaced unsafe Federal Pacific breaker bus boxes</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-navy-900"></span>
                <span>Upgraded service standard to 200 Amps</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-navy-900"></span>
                <span>Installed individual GFCI & AFCI safety breakers</span>
              </div>
            </div>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 bg-brand-navy-900 hover:bg-brand-navy-950 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-colors w-fit"
            >
              <span>Explore Project Gallery</span>
              <ArrowRight className="w-4 h-4 text-brand-gold-400" />
            </Link>
          </div>

        </div>
      </section>

      {/* Reviews Slider Section */}
      <section className="py-24 bg-brand-navy-900 text-white overflow-hidden relative">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-brand-gold-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10">
          <span className="bg-brand-gold-500/10 text-brand-gold-400 text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full tracking-wider border border-brand-gold-500/20">
            Reviews & Testimonials
          </span>
          <h2 className="text-3.5xl md:text-5xl font-black font-display tracking-tight mt-6 mb-12">
            Why Alabama Trusts Allen Electric
          </h2>

          {/* Testimonial Active Display */}
          <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl relative mb-8 min-h-[260px] flex flex-col justify-center">
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(reviews[activeReviewIndex]?.rating || 5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-brand-gold-400 fill-current" />
              ))}
            </div>

            <p className="text-lg md:text-xl font-light italic leading-relaxed text-slate-200 mb-6 max-w-2xl mx-auto">
              "{reviews[activeReviewIndex]?.text || ''}"
            </p>

            <div>
              <p className="font-extrabold text-white text-base font-display">
                {reviews[activeReviewIndex]?.name || ''}
              </p>
              <p className="text-slate-400 text-xs mt-0.5">
                {reviews[activeReviewIndex]?.location || ''} &bull; {reviews[activeReviewIndex]?.service || ''}
              </p>
            </div>
          </div>

          {/* Slider Controls */}
          <div className="flex justify-center gap-4">
            <button
              onClick={handlePrevReview}
              className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full p-3 transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextReview}
              className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full p-3 transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Map Service Coverage Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <InteractiveMap />
        </div>
      </section>

      {/* Final Call To Action (Need an Electrician Today?) */}
      <section className="py-24 bg-brand-navy-950 text-white text-center relative overflow-hidden border-b border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center">
          <div className="bg-brand-gold-500 text-brand-navy-950 p-4 rounded-full mb-6">
            <Zap className="w-8 h-8 fill-current animate-pulse-slow" />
          </div>
          <h2 className="text-3.5xl md:text-5.5xl font-black font-display tracking-tight leading-tight mb-4 max-w-2xl">
            Need a Certified Electrician Today?
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-10 max-w-xl font-light">
            We have dispatch crews standby across central and statewide Alabama. Call now for priority emergency response or book your slot online.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
            <a
              href="tel:+12055856431"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-brand-gold-500 to-amber-600 text-brand-navy-950 font-black py-4 px-8 rounded-2xl text-base shadow-xl shadow-brand-gold-500/10 active:scale-95 transition-all w-full"
            >
              <Phone className="w-5 h-5 fill-current" />
              <span>Call +1 (205) 585-6431</span>
            </a>
            <Link
              to="/book"
              className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold py-4 px-8 rounded-2xl text-base transition-colors w-full"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Appointment</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
