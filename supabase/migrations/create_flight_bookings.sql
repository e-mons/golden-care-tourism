-- Flight Bookings Table for Golden Care Tourism
-- Run this in Supabase Dashboard > SQL Editor

CREATE TABLE IF NOT EXISTS flight_bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  duffel_order_id TEXT NOT NULL,
  booking_reference TEXT,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed','cancelled','completed','pending')),
  origin_city TEXT NOT NULL,
  origin_iata TEXT NOT NULL,
  destination_city TEXT NOT NULL,
  destination_iata TEXT NOT NULL,
  departure_date TIMESTAMPTZ NOT NULL,
  return_date TIMESTAMPTZ,
  trip_type TEXT DEFAULT 'one_way' CHECK (trip_type IN ('one_way','round_trip')),
  passengers_count INTEGER DEFAULT 1,
  cabin_class TEXT DEFAULT 'economy',
  airline_name TEXT,
  airline_logo TEXT,
  total_amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  passenger_details JSONB,
  raw_order_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE flight_bookings ENABLE ROW LEVEL SECURITY;

-- Users can view their own flight bookings
CREATE POLICY "Users can view their own flight bookings"
  ON flight_bookings FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own flight bookings
CREATE POLICY "Users can insert their own flight bookings"
  ON flight_bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Admins can view all flight bookings
CREATE POLICY "Admins can view all flight bookings"
  ON flight_bookings FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Admins can update all flight bookings
CREATE POLICY "Admins can update all flight bookings"
  ON flight_bookings FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
