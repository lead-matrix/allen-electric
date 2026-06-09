-- Allen Electric Database Schema
-- Run this entire script in your Supabase SQL Editor
-- Dashboard → SQL Editor → New query → Paste → Run

-- ============================================================
-- Table: leads (stores bookings, quote requests, contact forms)
-- ============================================================
CREATE TABLE IF NOT EXISTS leads (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  name        TEXT NOT NULL,
  phone       TEXT NOT NULL,
  email       TEXT DEFAULT '',
  service     TEXT NOT NULL,
  date        TEXT DEFAULT '',
  time        TEXT DEFAULT '',
  details     TEXT DEFAULT '',
  "photoUrl"  TEXT DEFAULT NULL,
  type        TEXT NOT NULL CHECK (type IN ('booking', 'quote', 'contact')),
  status      TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Scheduled', 'Completed', 'Cancelled')),
  notes       TEXT DEFAULT '',
  "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Table: reviews (customer testimonials)
-- ============================================================
CREATE TABLE IF NOT EXISTS reviews (
  id       TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  name     TEXT NOT NULL,
  location TEXT NOT NULL,
  rating   INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  text     TEXT NOT NULL,
  service  TEXT NOT NULL,
  date     DATE DEFAULT CURRENT_DATE
);

-- ============================================================
-- Enable Row Level Security (RLS) on all tables
-- ============================================================
ALTER TABLE leads   ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- RLS Policies
-- Public can INSERT (submit forms and reviews)
-- Only authenticated users can SELECT / UPDATE / DELETE
-- ============================================================

-- LEADS: anyone can insert (form submissions)
CREATE POLICY "Anyone can submit a lead"
  ON leads FOR INSERT TO anon WITH CHECK (true);

-- LEADS: only authenticated users (admin) can view/update
CREATE POLICY "Admins can view leads"
  ON leads FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can update leads"
  ON leads FOR UPDATE TO authenticated USING (true);

-- REVIEWS: anyone can insert (public review submission)
CREATE POLICY "Anyone can submit a review"
  ON reviews FOR INSERT TO anon WITH CHECK (true);

-- REVIEWS: anyone can read reviews (public display)
CREATE POLICY "Anyone can view reviews"
  ON reviews FOR SELECT TO anon USING (true);

-- ============================================================
-- Seed initial sample data
-- ============================================================

-- Seed sample reviews
INSERT INTO reviews (id, name, location, rating, text, service, date) VALUES
  ('1', 'Sarah Montgomery', 'Birmingham, AL', 5, 'Allen Electric replaced our entire electrical panel after an emergency outage. They were professional, fast, and extremely transparent about pricing. Recommended!', 'Panel Upgrade', '2026-05-15'),
  ('2', 'David Lang', 'Tuscaloosa, AL', 5, 'Very satisfied with the generator installation. The technician walked me through the operation, and now we feel prepared for any storm. Highly professional service.', 'Generator Installation', '2026-05-28'),
  ('3', 'Robert Harris', 'Huntsville, AL', 5, 'Excellent work installing our new smart home automation widgets and outdoor lighting. Beautiful clean work, very friendly crew. Definitely our go-to electricians now.', 'Home Automation & Lighting', '2026-06-02'),
  ('4', 'Amanda Jenkins', 'Hoover, AL', 5, 'Had an emergency circuit outage late on a Friday night. Allen Electric dispatched a technician within an hour. Life savers!', 'Electrical Repairs', '2026-06-05'),
  ('5', 'Michael Vance', 'Montgomery, AL', 5, 'Commercial lighting upgrade was completed on-time and under budget. We are already seeing lower power bills.', 'Commercial Electrical Services', '2026-06-07'),
  ('6', 'Samantha K.', 'Mobile, AL', 5, 'Excellent safety inspection process. Allen Electric was thorough, friendly, and quick to return the paperwork.', 'Electrical Safety Inspection', '2026-06-08')
ON CONFLICT (id) DO NOTHING;

-- Seed sample leads
INSERT INTO leads (id, name, phone, email, service, date, time, details, status, notes, type, "createdAt") VALUES
  ('b1', 'Jane Doe', '+1 205-555-0199', 'jane.doe@gmail.com', 'Panel Upgrades', '2026-06-12', '09:00 AM', 'Looking to upgrade our old 100A panel to 200A for a new EV charger.', 'Scheduled', 'Called customer, confirmed schedule. Standard residential setup.', 'booking', '2026-06-08T10:30:00Z'),
  ('b2', 'John Smith', '+1 205-555-0123', 'john.smith@yahoo.com', 'Electrical Repairs', '2026-06-15', '02:00 PM', 'Living room outlets are flickering when the AC runs.', 'New', '', 'booking', '2026-06-09T08:15:00Z'),
  ('q1', 'Marcus Vance', '+1 256-555-0144', 'marcusvance@outlook.com', 'Generator Installation', '', '', 'Need a quote for a whole-house standby generator. 24kW.', 'New', 'Exit intent popup submission.', 'quote', '2026-06-09T12:00:00Z')
ON CONFLICT (id) DO NOTHING;
