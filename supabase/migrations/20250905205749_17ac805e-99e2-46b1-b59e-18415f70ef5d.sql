-- Fix RLS policies for site_access_codes to allow first-time setup
-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Admins can manage site access codes" ON public.site_access_codes;

-- Create new policies that allow first-time setup
-- Allow INSERT when table is empty (first access setup)
CREATE POLICY "Allow first access code creation" 
ON public.site_access_codes 
FOR INSERT 
WITH CHECK (
  -- Allow insert if table is empty (first setup)
  NOT EXISTS (SELECT 1 FROM public.site_access_codes)
);

-- Allow admins to manage existing codes
CREATE POLICY "Admins can manage existing codes" 
ON public.site_access_codes 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.email = (auth.jwt() ->> 'email'::text)
  )
);

-- Allow public to read active codes for verification
CREATE POLICY "Public can read active codes for verification" 
ON public.site_access_codes 
FOR SELECT 
USING (is_active = true);

-- Fix the infinite recursion in admin_users RLS policy
-- Drop the problematic policy
DROP POLICY IF EXISTS "Admins can view admin users" ON public.admin_users;

-- Create a security definer function to check admin status
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users 
    WHERE email = (auth.jwt() ->> 'email'::text)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Create new admin policy using the function
CREATE POLICY "Admins can view admin users" 
ON public.admin_users 
FOR SELECT 
USING (public.is_admin_user());