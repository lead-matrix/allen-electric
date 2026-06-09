export interface FAQ {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  iconName: string; // Used to map to Lucide icons dynamically
  longDesc: string;
  benefits: string[];
  pricing: string;
  faqs: FAQ[];
  process: string[];
}

export const servicesData: Service[] = [
  {
    id: 'electrical-safety-inspections',
    title: 'Electrical Safety Inspections',
    shortDesc: 'Comprehensive safety audits to protect your home or business from fire hazards and code violations.',
    iconName: 'ShieldAlert',
    longDesc: 'Prevent electrical hazards before they strike. Our comprehensive electrical safety inspections scan your wiring, outlets, panels, and grounding systems to identify fire risks, overloaded circuits, and violations of national electrical codes (NEC). Essential for older homes, home sales, and commercial certifications in Alabama.',
    benefits: [
      'Identify hidden fire hazards and wiring faults',
      'Verify code compliance with Alabama and NEC regulations',
      'Prevent costly appliance and equipment damage',
      'Lower homeowner insurance premiums with safety certification'
    ],
    pricing: '$149 - $299 depending on home size',
    process: [
      'Visual inspection of service panel, outlets, switches, and grounding',
      'Thermal imaging checks for hidden overloaded junctions',
      'Detailed diagnostic report highlighting safety ratings and hazards',
      'Prioritized estimates for recommended repairs or upgrades'
    ],
    faqs: [
      {
        question: 'How often should I have an electrical safety inspection?',
        answer: 'For residential properties, we recommend an inspection every 3 to 5 years, or immediately if you are buying a home, upgrading appliances, or experiencing flickering lights.'
      },
      {
        question: 'What is included in the inspection report?',
        answer: 'You will receive a complete, detailed checklist outlining the status of your panel, outlets, grounding, smoke detectors, and any recommended safety upgrades with flat-rate pricing.'
      }
    ]
  },
  {
    id: 'home-automation',
    title: 'Home Automation',
    shortDesc: 'Smart lighting, climate integration, security cameras, and voice controls built for modern living.',
    iconName: 'Cpu',
    longDesc: 'Bring your home into the future with professional smart home automation. We design and install integrated ecosystems linking your lighting, thermostats, security systems, and entertainment units. Command your Alabama home via voice controls, custom scheduling, or remote smartphone apps.',
    benefits: [
      'Cut energy bills with automated climate and lighting schedules',
      'Control appliances, gates, and locks from anywhere globally',
      'Enhance home security with custom sensor notification routines',
      'Increase property market value with premium built-in smart systems'
    ],
    pricing: 'Custom quotes based on system scope',
    process: [
      'Consultation to choose devices compatible with Apple, Google, or Alexa',
      'Professional wiring and installation of smart switches, panels, and relays',
      'System integration, hub programming, and network connection',
      'Hands-on tutorial showing you how to manage and customize the settings'
    ],
    faqs: [
      {
        question: 'Will smart switches work with my existing light fixtures?',
        answer: 'Yes! In most cases, we can install smart switches in your walls that control your current lighting fixtures, saving you from having to purchase custom smart bulbs.'
      },
      {
        question: 'Do I need a strong Wi-Fi connection for home automation?',
        answer: 'A stable connection is important. We can install smart home hubs (like Lutron or Zigbee) that use dedicated local radio frequencies, reducing the load on your Wi-Fi network.'
      }
    ]
  },
  {
    id: 'new-construction-wiring',
    title: 'New Construction Wiring',
    shortDesc: 'Certified design-build electrical services for new builds, additions, and complete renovations.',
    iconName: 'Wrench',
    longDesc: 'Ensure your dream home or commercial property has a reliable, future-proof electrical backbone. We collaborate with builders, architects, and owners across Alabama to design, lay, and certify complete electrical systems. Built to survive decades and support modern heavy-load appliances.',
    benefits: [
      'Load-balanced custom electrical layout planning',
      'Full compliance with local building inspections and safety codes',
      'Premium wiring materials and commercial-grade breaker boxes',
      'Pre-wired paths for future solar, EV, or backup power upgrades'
    ],
    pricing: 'Varies by square footage and architectural designs',
    process: [
      'Blueprints review and electrical load calculation mapping',
      'Rough-in stage: running conduits, wires, boxes, and main panel installation',
      'Local building inspector approval pass-through guarantee',
      'Trim-out: fitting fixtures, smart plates, switches, and final system certification'
    ],
    faqs: [
      {
        question: 'At what stage of construction should the electrical team arrive?',
        answer: 'We typically come in twice: first, during the "rough-in" stage after framing and plumbing are complete but before drywall is hung, and second, for the "trim-out" after paint.'
      },
      {
        question: 'Can you work directly from my custom home architect blueprints?',
        answer: 'Absolutely. We specialize in reading blueprints, aligning load ratings, and recommending optimal outlet placements for optimal livability.'
      }
    ]
  },
  {
    id: 'generator-installation',
    title: 'Generator Installation',
    shortDesc: 'Whole-home standby generator installations to keep your power running during storm outages.',
    iconName: 'Zap',
    longDesc: 'Alabama storms can knock out utility grids for days. Protect your family and assets with a permanent whole-home standby generator. We install automated backup systems (including industry leaders like Generac & Kohler) that fire up within seconds of a power failure, maintaining your HVAC, refrigerators, and medical equipment.',
    benefits: [
      'Automatic, seamless power transfer within 10 seconds of grid failure',
      'Runs on your home\'s existing natural gas or liquid propane supply',
      'Protects food storage, sensitive electronics, and home security',
      'Whisper-quiet operations and automatic weekly diagnostics checks'
    ],
    pricing: 'Starting at $8,500 including unit, concrete pad, permits, and transfer switch',
    process: [
      'Load analysis to select generator capacity (kW) matching your home needs',
      'Permitting, concrete slab prep, and physical generator mounting',
      'Installation of automatic transfer switch (ATS) next to service panel',
      'Natural gas/propane connection, utility validation, and simulation run'
    ],
    faqs: [
      {
        question: 'What size generator do I need for my home?',
        answer: 'It depends on your goals. A 10-14kW generator can run essential loads (lights, fridge, well pump). A 22-26kW unit can power your entire home, including multiple central AC units.'
      },
      {
        question: 'Do standby generators require regular maintenance?',
        answer: 'Yes, just like a car engine, they require annual service (oil change, filters, spark plugs) to ensure reliability. We offer comprehensive maintenance plans.'
      }
    ]
  },
  {
    id: 'electrical-repairs',
    title: 'Electrical Repairs',
    shortDesc: 'Troubleshooting and fixing faulty breakers, short circuits, outlets, switches, and fixtures.',
    iconName: 'Flame',
    longDesc: 'From sparking outlets to flickering lights and dead breakers, electrical malfunctions can be disruptive and dangerous. Our highly experienced technicians utilize state-of-the-art diagnostic instruments to isolate short circuits, loose connections, and component failures, restoring safety to your system.',
    benefits: [
      'Rapid diagnostics to pinpoint and isolate electrical faults',
      'Repairs backed by our 100% satisfaction guarantee',
      'All repairs completed with premium, durable parts',
      'Immediate restoration of power and peace of mind'
    ],
    pricing: 'Diagnostic fee is $99 (applied to repair cost)',
    process: [
      'Comprehensive tracing and diagnostic scanning of faulty circuit routes',
      'Detailed presentation of the issue and upfront, flat-rate pricing options',
      'Safe replacement of broken devices, switches, breakers, or wiring links',
      'Post-repair load and safety verification checks'
    ],
    faqs: [
      {
        question: 'Why does my breaker keep tripping?',
        answer: 'A tripping breaker is usually caused by an overloaded circuit, a short circuit (hot wire touching neutral), or a ground fault. An electrician should inspect it to prevent fire risks.'
      },
      {
        question: 'Is a warm wall outlet dangerous?',
        answer: 'Yes, an outlet that feels hot or warm to the touch is a serious hazard, indicating loose wiring or overloaded connections. Unplug appliances and call us immediately.'
      }
    ]
  },
  {
    id: 'service-calls',
    title: 'Service Calls',
    shortDesc: 'Fast-response dispatch for immediate electrical needs, troubleshooting, and minor upgrades.',
    iconName: 'PhoneCall',
    longDesc: 'When you need an electrician now, Allen Electric service calls deliver certified experts straight to your door. We specialize in fast-dispatch support for residential and commercial customers experiencing unexpected issues, offering upfront quotes and on-the-spot solutions.',
    benefits: [
      'Same-day service availability for urgent calls across Alabama',
      'Fully stocked service vans to complete 90% of repairs on the first visit',
      'Transparent hourly rates or flat-fee job guarantees',
      'Friendly, background-checked professional technicians'
    ],
    pricing: 'Flat dispatch fee + hourly or job quote',
    process: [
      'Schedule dispatch slot online or via direct phone line',
      'Receive technician ETA notification with name and profile details',
      'On-site evaluation and immediate written estimate validation',
      'Execution of work, cleanup, and easy digital payment terminal interface'
    ],
    faqs: [
      {
        question: 'Do you offer emergency after-hours electrical services?',
        answer: 'Yes, Allen Electric operates emergency response protocols. Call +1 205-585-6431 for priority dispatch.'
      },
      {
        question: 'How do you bill for service calls?',
        answer: 'We charge a standard dispatch fee to bring a master technician and fully stocked truck to your door. We then provide a clear, upfront quote before starting any work.'
      }
    ]
  },
  {
    id: 'commercial-electrical-services',
    title: 'Commercial Electrical Services',
    shortDesc: 'High-power panels, commercial lighting, machinery wiring, and regular code safety audits.',
    iconName: 'Briefcase',
    longDesc: 'Power your business operations safely. Allen Electric delivers commercial solutions tailored for retail spaces, warehouses, offices, and industrial projects in Alabama. From three-phase service upgrades and LED retrofits to equipment wiring and safety audits, we keep your business running smoothly.',
    benefits: [
      'Minimized business downtime with scheduled off-hours service dispatch',
      'Three-phase system balance diagnostics and load optimizing',
      'Dedicated project managers for commercial tenant improvements',
      'Safety and emergency light code compliance certifications'
    ],
    pricing: 'Custom bidding and proposal models',
    process: [
      'Review of commercial blueprints, equipment load profiles, and panel configurations',
      'Provision of detailed estimates, project schedules, and billing terms',
      'Safe execution of work adhering strictly to OSHA and local safety regulations',
      'System testing, inspection sign-offs, and final turnover files'
    ],
    faqs: [
      {
        question: 'Can you work during our off-hours to avoid disrupting business?',
        answer: 'Yes. We routinely schedule night and weekend service times for commercial customers to keep their businesses up and running without disruptions.'
      },
      {
        question: 'Do you handle tenant build-outs (TIs) for retail spaces?',
        answer: 'Yes, tenant improvements are a core specialty. We handle lighting design, power drops, subpanel installs, and networking conduit runs.'
      }
    ]
  },
  {
    id: 'panel-upgrades',
    title: 'Panel Upgrades (Breaker Box Service)',
    shortDesc: 'Replace outdated panels and upgrade your service to 200A or 400A to support modern appliances.',
    iconName: 'Server',
    longDesc: 'Your electrical panel is the heart of your home. Older properties with 60-amp or 100-amp boxes cannot handle modern demands like EV chargers, hot tubs, and heavy central heat pumps. We perform total panel replacements, converting dangerous or obsolete fuse boxes into safe, high-capacity 200-amp or 400-amp breaker boards.',
    benefits: [
      'Eliminate circuit overload trips and flickering lights',
      'Install safe, modern Arc Fault (AFCI) and Ground Fault (GFCI) breakers',
      'Ready your property for electric vehicle charging stations and additions',
      'Replace high-risk panels (e.g., Federal Pacific, Zinsco) known to fail'
    ],
    pricing: '$1,800 - $4,200 depending on amperage and utility coordination',
    process: [
      'Pre-install inspection and load calculation mapping',
      'Coordination of shutdown permits with your local Alabama power utility provider',
      'Removal of the old panel and install of premium copper bus bar enclosure',
      'New breaker links, system grounding verification, utility reconnect, and labeling'
    ],
    faqs: [
      {
        question: 'How do I know if my electrical panel needs an upgrade?',
        answer: 'Warning signs include flickering lights, breakers that trip frequently, fuses blowing, crackling sounds coming from the box, or if your home still uses a legacy fuse box.'
      },
      {
        question: 'How long does a panel upgrade take?',
        answer: 'A standard panel upgrade requires turning off the power. The physical swap takes about 4 to 8 hours. We coordinate closely with the power utility to minimize downtime.'
      }
    ]
  },
  {
    id: 'lighting-installation',
    title: 'Lighting Installation',
    shortDesc: 'Elegant recessed LED cans, accent lighting, crystal chandeliers, and security floodlights.',
    iconName: 'Lightbulb',
    longDesc: 'Transform the aesthetic, utility, and safety of your spaces with custom lighting installations. Our experts install interior architectural recessed LEDs, modern under-cabinet lights, custom chandeliers, and landscape/security floodlights to illuminate your property and increase curb appeal.',
    benefits: [
      'State-of-the-art energy-efficient LED upgrades that lower electric bills',
      'Custom dimmer and smart scene controller programming integrations',
      'Enhanced home safety with motion-detecting exterior perimeter lights',
      'Dramatic interior layout visual upgrades utilizing layer-lighting models'
    ],
    pricing: '$150 - $450 per fixture slot / custom packages for recessed lighting grids',
    process: [
      'Consultation on fixture types, brightness (lumens), and color temperatures (K)',
      'Running new clean wire routes and structural junction boxes',
      'Clean ceiling punch-outs and professional mounting of fixtures',
      'Testing dimmer ranges and ensuring clean, level presentation'
    ],
    faqs: [
      {
        question: 'What is the best light color temperature for my living room?',
        answer: 'We usually recommend a warm, inviting white color (2700K to 3000K) for living rooms and bedrooms, and a cleaner daylight white (4000K) for kitchens, laundry rooms, and workshops.'
      },
      {
        question: 'Can you install recessed lighting in plaster ceilings?',
        answer: 'Yes, our technicians are highly experienced in working with plaster ceilings, drywall, and drop grids, taking care to minimize dust and patch needs.'
      }
    ]
  }
];
