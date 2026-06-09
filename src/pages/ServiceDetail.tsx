import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { servicesData } from '../data/services';
import { Phone, Calendar, ShieldCheck, HelpCircle, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const ServiceDetail: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();

  // Find corresponding service
  const service = servicesData.find((srv) => srv.id === serviceId);

  // Fallback to services hub if service ID is invalid
  if (!service) {
    return <Navigate to="/services" replace />;
  }

  // Generate FAQ JSON-LD Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <Helmet>
        <title>{`${service.title} in Alabama | Allen Electric`}</title>
        <meta name="description" content={`${service.shortDesc} Professional state-licensed electricians servicing Alabama. Flat-rate pricing.`} />
        {/* Inject dynamic FAQ schema */}
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      {/* Hero Banner */}
      <section className="bg-brand-navy-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.02]"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-brand-gold-400 font-semibold">{service.title}</span>
          </div>

          <span className="bg-brand-gold-500/10 text-brand-gold-400 text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full tracking-wider border border-brand-gold-500/20">
            Professional Electricians
          </span>
          <h1 className="text-3.5xl md:text-5xl font-black font-display tracking-tight mt-6 mb-4">
            {service.title}
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl font-light leading-relaxed">
            {service.shortDesc}
          </p>
        </div>
      </section>

      {/* Service Contents */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Main Content */}
          <div className="lg:col-span-8">
            <h2 className="text-2xl md:text-3.5xl font-black font-display text-brand-navy-900 mb-6">
              Service Details & Scope
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-8">
              {service.longDesc}
            </p>

            {/* Benefits Block */}
            <div className="bg-slate-50 border border-slate-200/50 rounded-3xl p-6 md:p-8 mb-12">
              <h3 className="font-extrabold text-brand-navy-900 text-lg font-display mb-4">
                Key Benefits of This Service
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-700">
                    <ShieldCheck className="w-5 h-5 text-brand-gold-500 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Installation/Work Process */}
            <h3 className="font-extrabold text-brand-navy-900 text-xl font-display mb-6">
              Our Step-By-Step Process
            </h3>
            <div className="space-y-4 mb-12">
              {service.process.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start p-5 rounded-2xl bg-white border border-slate-200">
                  <span className="w-8 h-8 rounded-full bg-brand-navy-900 text-brand-gold-400 font-extrabold flex items-center justify-center text-xs shrink-0 font-display">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="font-extrabold text-brand-navy-900 text-sm mb-1">Step {idx + 1}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{step}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Service FAQ */}
            <h3 className="font-extrabold text-brand-navy-900 text-xl font-display mb-6">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {service.faqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6">
                  <h4 className="font-extrabold text-brand-navy-900 text-sm md:text-base mb-2 flex items-start gap-2">
                    <HelpCircle className="w-4.5 h-4.5 text-brand-gold-500 shrink-0 mt-0.5" />
                    <span>{faq.question}</span>
                  </h4>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed pl-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar Widget */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Cost & Booking Card */}
            <div className="bg-brand-navy-900 text-white rounded-3xl p-6 border border-white/10 shadow-xl relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-brand-gold-500/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <span className="text-slate-400 text-[10px] font-extrabold uppercase tracking-widest">
                Upfront Pricing
              </span>
              <h3 className="text-xl font-black font-display text-white mt-1 mb-4">
                Pricing Estimator
              </h3>
              
              <div className="bg-white/5 border border-white/5 rounded-2xl p-4 mb-6">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Estimated Range</span>
                <span className="text-xl font-extrabold text-brand-gold-400 mt-1 block">
                  {service.pricing.split(' ')[0]} <span className="text-xs text-slate-400 font-normal">Est.</span>
                </span>
                <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                  {service.pricing}
                </p>
              </div>

              <Link
                to="/book"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-gold-500 to-amber-600 text-brand-navy-950 font-black py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-95 mb-3"
              >
                <Calendar className="w-4 h-4 fill-current" />
                <span>Book This Service</span>
              </Link>

              <a
                href="tel:+12055856431"
                className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold py-3.5 rounded-xl text-xs transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-gold-400" />
                <span>Call +1 (205) 585-6431</span>
              </a>
            </div>

            {/* Quick Dispatch Status */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 text-slate-700 text-xs">
              <h4 className="font-extrabold text-brand-navy-900 text-sm mb-3">Dispatch Availability</h4>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-slate-200/50 pb-2">
                  <span>Alabama License:</span>
                  <span className="font-bold text-brand-navy-900">#AL-49281</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/50 pb-2">
                  <span>Warranty:</span>
                  <span className="font-bold text-brand-navy-900">2-Year Guarantee</span>
                </div>
                <div className="flex justify-between">
                  <span>Emergency dispatch:</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    Online / Active
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Services Footer Section */}
      <section className="bg-brand-navy-900 py-20 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.02]"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4.5xl font-black font-display tracking-tight text-white mb-4">
            Need Another Service?
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 max-w-xl mx-auto font-light">
            We offer full safety inspections, lighting retrofits, electrical repairs, panel upgrades, and smart home packages.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/services"
              className="bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-navy-950 font-black px-8 py-4 rounded-xl shadow-lg transition-transform active:scale-95 text-sm"
            >
              Browse All Services
            </Link>
            <Link
              to="/contact"
              className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold px-8 py-4 rounded-xl text-sm"
            >
              Contact Dispatch Office
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
