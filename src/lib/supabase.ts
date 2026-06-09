import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Initialize Supabase if credentials are available
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// Fallback Local Storage keys
const STORAGE_KEYS = {
  LEADS: 'allen_electric_leads',
  BOOKINGS: 'allen_electric_bookings',
  REVIEWS: 'allen_electric_reviews',
  NOTES: 'allen_electric_notes',
};

// Seed reviews list
const initialReviews = [
  {
    id: '1',
    name: 'Sarah M.',
    location: 'Birmingham, AL',
    rating: 5,
    text: 'Allen Electric replaced our entire electrical panel after an emergency outage. They were professional, fast, and extremely transparent about pricing. Recommended!',
    date: '2026-05-15',
    service: 'Panel Upgrade'
  },
  {
    id: '2',
    name: 'David L.',
    location: 'Tuscaloosa, AL',
    rating: 5,
    text: 'Very satisfied with the generator installation. The technician walked me through the operation, and now we feel prepared for any storm. Highly professional service.',
    date: '2026-05-28',
    service: 'Generator Installation'
  },
  {
    id: '3',
    name: 'Robert H.',
    location: 'Huntsville, AL',
    rating: 5,
    text: 'Excellent work installing our new smart home automation widgets and outdoor lighting. Beautiful clean work, very friendly crew. Definitely our go-to electricians now.',
    date: '2026-06-02',
    service: 'Home Automation & Lighting'
  }
];

// Seed leads / bookings list
const initialBookings = [
  {
    id: 'b1',
    name: 'Jane Doe',
    phone: '+1 205-555-0199',
    email: 'jane.doe@gmail.com',
    service: 'Panel Upgrades',
    date: '2026-06-12',
    time: '09:00 AM',
    details: 'Looking to upgrade our old 100A panel to 200A for a new EV charger.',
    status: 'Scheduled',
    notes: 'Called customer, confirmed schedule. Standard residential setup.',
    photoUrl: null,
    createdAt: '2026-06-08T10:30:00Z',
    type: 'booking'
  },
  {
    id: 'b2',
    name: 'John Smith',
    phone: '+1 205-555-0123',
    email: 'john.smith@yahoo.com',
    service: 'Electrical Repairs',
    date: '2026-06-15',
    time: '02:00 PM',
    details: 'Living room outlets are flickering when the AC runs.',
    status: 'New',
    notes: '',
    photoUrl: null,
    createdAt: '2026-06-09T08:15:00Z',
    type: 'booking'
  },
  {
    id: 'q1',
    name: 'Marcus Vance',
    phone: '+1 256-555-0144',
    email: 'marcusvance@outlook.com',
    service: 'Generator Installation',
    date: '',
    time: '',
    details: 'Need a quote for a whole-house standby generator. 24kW.',
    status: 'New',
    notes: 'Exit intent popup submission.',
    photoUrl: null,
    createdAt: '2026-06-09T12:00:00Z',
    type: 'quote'
  }
];

// Initialization Helper
const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(initialReviews));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(initialBookings));
  }
};

initializeStorage();

// Data helper methods that interact with Supabase (if available) or LocalStorage (as fallback)
export const dbService = {
  // Reviews
  async getReviews() {
    if (supabase) {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('date', { ascending: false });
      if (!error) return data;
    }
    const local = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    return local ? JSON.parse(local) : [];
  },

  async addReview(review: { name: string; location: string; rating: number; text: string; service: string }) {
    const newReview = {
      id: Math.random().toString(36).substr(2, 9),
      ...review,
      date: new Date().toISOString().split('T')[0]
    };

    if (supabase) {
      const { data, error } = await supabase
        .from('reviews')
        .insert([newReview])
        .select();
      if (!error && data) return data[0];
    }

    const current = await this.getReviews();
    const updated = [newReview, ...current];
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(updated));
    return newReview;
  },

  // Leads, Quotes & Bookings
  async getLeads() {
    if (supabase) {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('createdAt', { ascending: false });
      if (!error) return data;
    }
    const local = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return local ? JSON.parse(local) : [];
  },

  async addLead(lead: {
    name: string;
    phone: string;
    email: string;
    service: string;
    date?: string;
    time?: string;
    details: string;
    photoUrl?: string | null;
    type: 'booking' | 'quote' | 'contact';
  }) {
    const newLead = {
      id: Math.random().toString(36).substr(2, 9),
      ...lead,
      status: 'New',
      notes: '',
      createdAt: new Date().toISOString()
    };

    if (supabase) {
      const { data, error } = await supabase
        .from('leads')
        .insert([newLead])
        .select();
      if (!error && data) return data[0];
    }

    const current = await this.getLeads();
    const updated = [newLead, ...current];
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
    return newLead;
  },

  async updateLeadStatus(id: string, status: string) {
    if (supabase) {
      const { data, error } = await supabase
        .from('leads')
        .update({ status })
        .eq('id', id)
        .select();
      if (!error && data) return data[0];
    }

    const current = await this.getLeads();
    const updated = current.map((lead: any) => 
      lead.id === id ? { ...lead, status } : lead
    );
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
    return updated.find((lead: any) => lead.id === id);
  },

  async updateLeadNotes(id: string, notes: string) {
    if (supabase) {
      const { data, error } = await supabase
        .from('leads')
        .update({ notes })
        .eq('id', id)
        .select();
      if (!error && data) return data[0];
    }

    const current = await this.getLeads();
    const updated = current.map((lead: any) => 
      lead.id === id ? { ...lead, notes } : lead
    );
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
    return updated.find((lead: any) => lead.id === id);
  }
};
