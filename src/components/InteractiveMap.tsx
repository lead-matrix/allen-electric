import React, { useState } from 'react';
import { MapPin, Phone, ShieldCheck, CheckCircle } from 'lucide-react';

interface City {
  name: string;
  x: string; // Percentage for SVG positioning
  y: string;
  status: string;
  response: string;
  trucks: number;
}

export const InteractiveMap: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const cities: City[] = [
    { name: 'Birmingham', x: '52%', y: '32%', status: 'Active Dispatch', response: 'Within 45 Mins', trucks: 6 },
    { name: 'Hoover', x: '50%', y: '38%', status: 'Active Dispatch', response: 'Within 30 Mins', trucks: 4 },
    { name: 'Tuscaloosa', x: '35%', y: '45%', status: 'Active Dispatch', response: 'Within 60 Mins', trucks: 3 },
    { name: 'Huntsville', x: '55%', y: '12%', status: 'Statewide Hub', response: 'Within 45 Mins', trucks: 5 },
    { name: 'Montgomery', x: '58%', y: '58%', status: 'Regional Crew', response: 'Within 60 Mins', trucks: 3 },
    { name: 'Mobile', x: '24%', y: '85%', status: 'Coastal Unit', response: 'Within 60 Mins', trucks: 2 },
  ];

  return (
    <div className="bg-brand-navy-950 text-white rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0b1329_1px,transparent_1px),linear-gradient(to_bottom,#0b1329_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>
      <div className="absolute -top-48 -left-48 w-96 h-96 bg-brand-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: List and Stats */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <span className="text-brand-gold-400 text-xs font-extrabold uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-gold-500 animate-ping"></span>
            Alabama Coverage Area
          </span>
          <h3 className="text-3xl md:text-4.5xl font-black font-display tracking-tight leading-tight mb-4">
            Licensed Statewide. <br/>
            Dispatched <span className="text-brand-gold-400">Locally</span>.
          </h3>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">
            Allen Electric maintains local crews stationed strategically across Alabama. Select your nearest city to view active dispatch details and estimated arrival times.
          </p>

          {/* Quick List */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {cities.map((city) => (
              <button
                key={city.name}
                onClick={() => setSelectedCity(city)}
                className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all ${
                  selectedCity?.name === city.name
                    ? 'bg-brand-gold-500 text-brand-navy-950 border-brand-gold-500 font-bold scale-[1.02] shadow-lg shadow-brand-gold-500/10'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                <MapPin className="w-4 h-4 shrink-0" />
                <span className="text-sm">{city.name}</span>
              </button>
            ))}
          </div>

          {/* Dynamic Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 min-h-[140px] flex flex-col justify-between">
            {selectedCity ? (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-extrabold text-white text-lg font-display">{selectedCity.name} Hub</h4>
                  <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                    {selectedCity.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="text-slate-400">Response Time</p>
                    <p className="font-bold text-white mt-0.5">{selectedCity.response}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Active Service Vans</p>
                    <p className="font-bold text-white mt-0.5">{selectedCity.trucks} Trucks</p>
                  </div>
                </div>
                <a
                  href="tel:+12055856431"
                  className="flex items-center justify-center gap-2 mt-4 bg-brand-gold-500 text-brand-navy-950 hover:brightness-110 font-bold py-2 rounded-xl text-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {selectedCity.name} Dispatch</span>
                </a>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-6 h-full text-slate-400">
                <MapPin className="w-8 h-8 text-slate-500 animate-bounce mb-2" />
                <p className="text-xs">Click any city or radar point to check live local availability</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Visual Map */}
        <div className="lg:col-span-7 flex justify-center items-center relative min-h-[350px]">
          {/* Custom Alabama Tech Map */}
          <svg
            className="w-full max-w-[320px] md:max-w-[400px] h-[400px] text-slate-800"
            viewBox="0 0 200 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Alabama State SVG Representation */}
            <path
              d="M75 10H140L145 130L150 160L160 190L165 240L150 250L135 252L125 254L110 255L105 280L90 282L80 283L55 284L45 285L35 240L42 210L40 180L45 125L46 65L75 10Z"
              className="fill-brand-navy-900 stroke-white/10"
              strokeWidth="2"
              strokeDasharray="4 2"
            />
            {/* Grid gridlines over state */}
            <path
              d="M60 10V280 M80 10V280 M100 10V280 M120 10V280 M140 10V250 M40 50H140 M40 90H140 M40 130H150 M40 170H150 M40 210H160 M40 250H140"
              className="stroke-white/5"
              strokeWidth="0.5"
            />

            {/* Pulses & Hotspots */}
            {cities.map((city) => {
              // Convert percentages to approximate SVG coordinates (width=200, height=300)
              const xVal = parseFloat(city.x) * 2;
              const yVal = parseFloat(city.y) * 3;
              const isSelected = selectedCity?.name === city.name;

              return (
                <g
                  key={city.name}
                  className="cursor-pointer group"
                  onClick={() => setSelectedCity(city)}
                >
                  {/* Ping Animation */}
                  <circle
                    cx={xVal}
                    cy={yVal}
                    r={isSelected ? '12' : '6'}
                    className={`fill-brand-gold-500/30 ${isSelected ? '' : 'pulse-ring'}`}
                  />
                  {/* Inner Dot */}
                  <circle
                    cx={xVal}
                    cy={yVal}
                    r={isSelected ? '5' : '3'}
                    className={`${isSelected ? 'fill-white' : 'fill-brand-gold-500'} transition-all`}
                  />
                  {/* Label */}
                  <text
                    x={xVal + 8}
                    y={yVal + 3}
                    className={`font-display text-[9px] font-bold ${
                      isSelected ? 'fill-white text-xs' : 'fill-slate-400 group-hover:fill-slate-200'
                    } transition-colors select-none`}
                  >
                    {city.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Quick Stats Overlays */}
          <div className="absolute top-2 left-2 bg-white/5 border border-white/10 rounded-xl p-2.5 text-[10px] hidden md:block backdrop-blur-sm">
            <div className="flex items-center gap-1.5 text-brand-gold-400 font-bold mb-0.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>AL License #49281</span>
            </div>
            <p className="text-slate-400">NEC Compliant Electricians</p>
          </div>

          <div className="absolute bottom-2 right-2 bg-white/5 border border-white/10 rounded-xl p-2.5 text-[10px] hidden md:block backdrop-blur-sm">
            <div className="flex items-center gap-1.5 text-brand-gold-400 font-bold mb-0.5">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Full Work Guarantee</span>
            </div>
            <p className="text-slate-400">100% Satisfaction Checked</p>
          </div>
        </div>
      </div>
    </div>
  );
};
