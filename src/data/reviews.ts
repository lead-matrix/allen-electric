export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  service: string;
}

export const initialReviews: Review[] = [
  {
    id: '1',
    name: 'Sarah Montgomery',
    location: 'Birmingham, AL',
    rating: 5,
    text: 'Allen Electric replaced our entire electrical panel after an emergency outage. They were professional, fast, and extremely transparent about pricing. Recommended!',
    date: '2026-05-15',
    service: 'Panel Upgrade'
  },
  {
    id: '2',
    name: 'David Lang',
    location: 'Tuscaloosa, AL',
    rating: 5,
    text: 'Very satisfied with the generator installation. The technician walked me through the operation, and now we feel prepared for any storm. Highly professional service.',
    date: '2026-05-28',
    service: 'Generator Installation'
  },
  {
    id: '3',
    name: 'Robert Harris',
    location: 'Huntsville, AL',
    rating: 5,
    text: 'Excellent work installing our new smart home automation widgets and outdoor lighting. Beautiful clean work, very friendly crew. Definitely our go-to electricians now.',
    date: '2026-06-02',
    service: 'Home Automation & Lighting'
  },
  {
    id: '4',
    name: 'Amanda Jenkins',
    location: 'Hoover, AL',
    rating: 5,
    text: 'Had an emergency circuit outage late on a Friday night. Allen Electric dispatched a technician within an hour. He resolved the issue quickly and charged a fair emergency rate. Life savers!',
    date: '2026-06-05',
    service: 'Electrical Repairs'
  },
  {
    id: '5',
    name: 'Michael Vance',
    location: 'Montgomery, AL',
    rating: 5,
    text: 'Commercial lighting upgrade was completed on-time and under budget. The LED fixtures have brightened up our retail store significantly, and we are already seeing lower power bills.',
    date: '2026-06-07',
    service: 'Commercial Electrical Services'
  },
  {
    id: '6',
    name: 'Samantha K.',
    location: 'Mobile, AL',
    rating: 5,
    text: 'Excellent safety inspection process. We needed a checklist to satisfy our new homeowner insurance, and Allen Electric was thorough, friendly, and quick to return the paperwork.',
    date: '2026-06-08',
    service: 'Electrical Safety Inspection'
  }
];
