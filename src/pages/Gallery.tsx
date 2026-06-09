import React, { useState } from 'react';
import { BeforeAfterGallery } from '../components/BeforeAfterGallery';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface GalleryItem {
  id: string;
  category: 'panels' | 'generators' | 'lighting';
  title: string;
  location: string;
  description: string;
  beforeImg: string;
  afterImg: string;
  beforeLabel: string;
  afterLabel: string;
}

export const Gallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'panels' | 'generators' | 'lighting'>('all');

  const galleryItems: GalleryItem[] = [
    {
      id: 'g1',
      category: 'panels',
      title: 'Residential 100A to 200A Panel Swap',
      location: 'Birmingham, AL',
      description: 'Upgraded an outdated, hazardous fuse box to a modern, code-compliant 200-amp circuit breaker panel with built-in surge protection.',
      beforeImg: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=600&q=80',
      afterImg: 'https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&w=600&q=80',
      beforeLabel: 'Old Hazard Fuse Box',
      afterLabel: '200A Upgrade'
    },
    {
      id: 'g2',
      category: 'generators',
      title: 'Whole-Home Standby Generator Install',
      location: 'Tuscaloosa, AL',
      description: 'Installed a Generac 24kW automatic standby generator with transfer switch to supply continuous power to central AC, well pumps, and fridge circuits.',
      beforeImg: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80', // raw site space
      afterImg: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=600&q=80', // clean electrical build
      beforeLabel: 'Concrete Prep Site',
      afterLabel: '24kW Generac Install'
    },
    {
      id: 'g3',
      category: 'lighting',
      title: 'Modern Recessed LED Lighting Grid',
      location: 'Huntsville, AL',
      description: 'Designed and installed a custom dimmable 3000K recessed LED lighting scheme in a renovated living room, boosting brightness and reducing power consumption.',
      beforeImg: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80', // dim room
      afterImg: 'https://images.unsplash.com/photo-1565538810844-1e1194826f06?auto=format&fit=crop&w=600&q=80', // bright modern lighted room
      beforeLabel: 'Old Center Fixture',
      afterLabel: 'Recessed LED Grid'
    },
    {
      id: 'g4',
      category: 'panels',
      title: 'Commercial Subpanel Installation',
      location: 'Hoover, AL',
      description: 'Installed a dedicated 3-phase commercial subpanel to feed new heavy manufacturing machinery circuits safely, meeting absolute NEC load specs.',
      beforeImg: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=600&q=80', // blank wall layout
      afterImg: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=600&q=80', // high quality steel panels
      beforeLabel: 'Blank Conduit Prep',
      afterLabel: 'Steel Subpanel Finish'
    }
  ];

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  const filters = [
    { label: 'All Projects', value: 'all' as const },
    { label: 'Panel Upgrades', value: 'panels' as const },
    { label: 'Standby Generators', value: 'generators' as const },
    { label: 'Custom Lighting', value: 'lighting' as const },
  ];

  return (
    <>
      <Helmet>
        <title>Project Gallery | Before & After Electrical Works AL</title>
        <meta name="description" content="Check out our real customer before and after project comparisons. See our panel swaps, standby generator fits, and custom interior lighting projects." />
      </Helmet>

      {/* Hero Banner */}
      <section className="bg-brand-navy-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.02]"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center">
          <span className="bg-brand-gold-500/10 text-brand-gold-400 text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full tracking-wider border border-brand-gold-500/20">
            Case Studies
          </span>
          <h1 className="text-4xl md:text-5.5xl font-black font-display tracking-tight mt-6 mb-4">
            Before & After Gallery
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto font-light">
            Interactive drag comparison comparisons showing real jobs executed across our Alabama service locations.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`py-3 px-6 rounded-xl border text-sm font-bold transition-all ${
                  activeFilter === filter.value
                    ? 'bg-brand-navy-900 border-brand-navy-900 text-white shadow-md'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {filteredItems.map((item) => (
              <div key={item.id} className="space-y-4">
                <BeforeAfterGallery
                  beforeImage={item.beforeImg}
                  afterImage={item.afterImg}
                  beforeLabel={item.beforeLabel}
                  afterLabel={item.afterLabel}
                  heightClass="h-[280px] sm:h-[350px] md:h-[400px]"
                />
                <div className="p-2">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-extrabold text-xl text-brand-navy-900 font-display">
                      {item.title}
                    </h3>
                    <span className="bg-brand-navy-900/5 text-brand-navy-900 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                      {item.location}
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-navy-900 py-20 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.02]"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4.5xl font-black font-display tracking-tight text-white mb-4">
            Want Similar Results For Your Home?
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 max-w-xl mx-auto font-light">
            Book an appointment online today and get a free code compliance evaluation and quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book"
              className="bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-navy-950 font-black px-8 py-4 rounded-xl shadow-lg transition-transform active:scale-95 text-sm"
            >
              Book Electrical Service
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
