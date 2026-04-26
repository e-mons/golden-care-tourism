-- Create types
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');
CREATE TYPE visa_status AS ENUM ('pending', 'processing', 'approved', 'rejected');
CREATE TYPE user_role AS ENUM ('user', 'admin');

-- Users extension (profiles)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    phone TEXT,
    role user_role DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tours
CREATE TABLE public.tours (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    base_price NUMERIC(10,2) NOT NULL,
    category TEXT,
    location TEXT,
    image_urls TEXT[],
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tour Slots (Availability)
CREATE TABLE public.tour_slots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tour_id UUID REFERENCES public.tours(id) ON DELETE CASCADE,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    capacity INT NOT NULL,
    booked_count INT DEFAULT 0,
    price_modifier NUMERIC(10,2) DEFAULT 0.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Addons
CREATE TABLE public.addons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    type TEXT NOT NULL, -- e.g., 'vip', 'transport'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Bookings
CREATE TABLE public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    tour_slot_id UUID REFERENCES public.tour_slots(id) ON DELETE RESTRICT,
    total_amount NUMERIC(10,2) NOT NULL,
    status booking_status DEFAULT 'pending',
    guests_count INT NOT NULL DEFAULT 1,
    stripe_session_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Booking Addons
CREATE TABLE public.booking_addons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
    addon_id UUID REFERENCES public.addons(id) ON DELETE RESTRICT,
    quantity INT DEFAULT 1,
    price_at_booking NUMERIC(10,2) NOT NULL
);

-- Visa Applications
CREATE TABLE public.visa_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    type TEXT NOT NULL, -- 'visit' or 'residency'
    status visa_status DEFAULT 'pending',
    notes TEXT,
    stripe_session_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Visa Documents
CREATE TABLE public.visa_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES public.visa_applications(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL, -- 'passport', 'photo'
    file_url TEXT NOT NULL,
    validation_status TEXT DEFAULT 'pending',
    validation_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS setup
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tour_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visa_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visa_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Tours are viewable by everyone." ON public.tours FOR SELECT USING (true);
CREATE POLICY "Tour slots are viewable by everyone." ON public.tour_slots FOR SELECT USING (true);
CREATE POLICY "Addons are viewable by everyone." ON public.addons FOR SELECT USING (true);

CREATE POLICY "Users can view own bookings." ON public.bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own bookings." ON public.bookings FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own booking addons." ON public.booking_addons FOR SELECT USING (EXISTS (SELECT 1 FROM public.bookings b WHERE b.id = booking_id AND b.user_id = auth.uid()));
CREATE POLICY "Users can insert own booking addons." ON public.booking_addons FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.bookings b WHERE b.id = booking_id AND b.user_id = auth.uid()));

CREATE POLICY "Users can view own visas." ON public.visa_applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own visas." ON public.visa_applications FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own visa docs." ON public.visa_documents FOR SELECT USING (EXISTS (SELECT 1 FROM public.visa_applications v WHERE v.id = application_id AND v.user_id = auth.uid()));
CREATE POLICY "Users can insert own visa docs." ON public.visa_documents FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.visa_applications v WHERE v.id = application_id AND v.user_id = auth.uid()));
