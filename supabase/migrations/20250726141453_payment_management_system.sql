-- Location: supabase/migrations/20250726141453_payment_management_system.sql
-- Schema Analysis: Fresh project - complete payment management schema
-- Integration Type: New complete system
-- Dependencies: None (fresh implementation)

-- 1. Extensions & Types
CREATE TYPE public.user_role AS ENUM ('admin', 'manager', 'member');
CREATE TYPE public.payment_status AS ENUM ('success', 'failed', 'pending');
CREATE TYPE public.payment_method AS ENUM ('credit_card', 'debit_card', 'bank_transfer', 'paypal', 'crypto');

-- 2. Core Tables
-- Critical intermediary table for PostgREST compatibility
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role public.user_role DEFAULT 'member'::public.user_role,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Payments table
CREATE TABLE public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    amount DECIMAL(12,2) NOT NULL,
    receiver TEXT NOT NULL,
    status public.payment_status DEFAULT 'pending'::public.payment_status,
    payment_method public.payment_method NOT NULL,
    transaction_id TEXT UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Users table for admin management
CREATE TABLE public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_profile_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    department TEXT,
    hire_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Essential Indexes
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_payments_user_id ON public.payments(user_id);
CREATE INDEX idx_payments_status ON public.payments(status);
CREATE INDEX idx_payments_method ON public.payments(payment_method);
CREATE INDEX idx_payments_created_at ON public.payments(created_at);
CREATE INDEX idx_users_profile_id ON public.users(user_profile_id);

-- 4. RLS Setup
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 5. Helper Functions
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role = 'admin'
)
$$;

CREATE OR REPLACE FUNCTION public.owns_payment(payment_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.payments p
    WHERE p.id = payment_uuid AND p.user_id = auth.uid()
)
$$;

-- Function for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'member'::public.user_role)
  );
  RETURN NEW;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at 
    BEFORE UPDATE ON public.user_profiles 
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_payments_updated_at 
    BEFORE UPDATE ON public.payments 
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 6. RLS Policies
CREATE POLICY "users_own_profile" 
ON public.user_profiles 
FOR ALL
TO authenticated
USING (auth.uid() = id) 
WITH CHECK (auth.uid() = id);

CREATE POLICY "authenticated_view_profiles" 
ON public.user_profiles 
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "users_manage_own_payments" 
ON public.payments 
FOR ALL
TO authenticated
USING (public.owns_payment(id) OR public.is_admin()) 
WITH CHECK (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "admin_manage_users" 
ON public.users 
FOR ALL
TO authenticated
USING (public.is_admin()) 
WITH CHECK (public.is_admin());

-- 7. Stats function for dashboard
CREATE OR REPLACE FUNCTION public.get_payment_stats(user_uuid UUID DEFAULT NULL)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    result JSON;
    target_user_id UUID;
BEGIN
    -- If user_uuid is provided and user is admin, use it; otherwise use current user
    IF user_uuid IS NOT NULL AND public.is_admin() THEN
        target_user_id := user_uuid;
    ELSE
        target_user_id := auth.uid();
    END IF;

    SELECT json_build_object(
        'total_payments_today', (
            SELECT COUNT(*) FROM public.payments p
            WHERE (target_user_id IS NULL OR p.user_id = target_user_id OR public.is_admin())
            AND p.created_at::date = CURRENT_DATE
        ),
        'total_payments_week', (
            SELECT COUNT(*) FROM public.payments p
            WHERE (target_user_id IS NULL OR p.user_id = target_user_id OR public.is_admin())
            AND p.created_at >= date_trunc('week', CURRENT_DATE)
        ),
        'total_revenue', (
            SELECT COALESCE(SUM(p.amount), 0) FROM public.payments p
            WHERE (target_user_id IS NULL OR p.user_id = target_user_id OR public.is_admin())
            AND p.status = 'success'
        ),
        'failed_transactions', (
            SELECT COUNT(*) FROM public.payments p
            WHERE (target_user_id IS NULL OR p.user_id = target_user_id OR public.is_admin())
            AND p.status = 'failed'
        ),
        'revenue_by_day', (
            SELECT json_agg(
                json_build_object(
                    'date', day_date,
                    'revenue', daily_revenue
                )
                ORDER BY day_date
            )
            FROM (
                SELECT 
                    p.created_at::date as day_date,
                    COALESCE(SUM(p.amount), 0) as daily_revenue
                FROM public.payments p
                WHERE (target_user_id IS NULL OR p.user_id = target_user_id OR public.is_admin())
                AND p.status = 'success'
                AND p.created_at >= CURRENT_DATE - INTERVAL '7 days'
                GROUP BY p.created_at::date
            ) daily_stats
        )
    ) INTO result;

    RETURN result;
END;
$$;

-- 8. Complete Mock Data
DO $$
DECLARE
    admin_uuid UUID := gen_random_uuid();
    user_uuid UUID := gen_random_uuid();
    payment1_uuid UUID := gen_random_uuid();
    payment2_uuid UUID := gen_random_uuid();
    payment3_uuid UUID := gen_random_uuid();
BEGIN
    -- Create auth users with complete required fields
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@payment.com', crypt('admin123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Admin User", "role": "admin"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (user_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'user@payment.com', crypt('user123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Regular User", "role": "member"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Create sample payments
    INSERT INTO public.payments (id, user_id, amount, receiver, status, payment_method, transaction_id, description, created_at) VALUES
        (payment1_uuid, admin_uuid, 1250.00, 'John Doe', 'success'::public.payment_status, 'credit_card'::public.payment_method, 'TXN001', 'Payment for services', CURRENT_TIMESTAMP - INTERVAL '2 days'),
        (payment2_uuid, user_uuid, 750.50, 'Jane Smith', 'success'::public.payment_status, 'bank_transfer'::public.payment_method, 'TXN002', 'Monthly subscription', CURRENT_TIMESTAMP - INTERVAL '1 day'),
        (payment3_uuid, admin_uuid, 500.00, 'Bob Johnson', 'failed'::public.payment_status, 'paypal'::public.payment_method, 'TXN003', 'Product purchase', CURRENT_TIMESTAMP);

    -- Create sample users in users table
    INSERT INTO public.users (user_profile_id, department, hire_date, is_active) VALUES
        (admin_uuid, 'Administration', '2023-01-15', true),
        (user_uuid, 'Operations', '2023-06-01', true);

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key error: %', SQLERRM;
    WHEN unique_violation THEN
        RAISE NOTICE 'Unique constraint error: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Unexpected error: %', SQLERRM;
END $$;