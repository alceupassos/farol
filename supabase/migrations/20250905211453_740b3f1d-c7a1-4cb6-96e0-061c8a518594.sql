-- Create a secure function to check if current user is admin
-- This prevents infinite recursion in RLS policies
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users 
    WHERE email = (auth.jwt() ->> 'email'::text)
  );
END;
$$;

-- Drop existing potentially problematic policies
DROP POLICY IF EXISTS "Admins can manage existing codes" ON public.site_access_codes;
DROP POLICY IF EXISTS "Allow first access code creation" ON public.site_access_codes;

-- Create secure RLS policies for site_access_codes
-- Only admins can SELECT (read) access codes
CREATE POLICY "Admins can view access codes"
ON public.site_access_codes
FOR SELECT
TO authenticated
USING (public.is_current_user_admin());

-- Only admins can UPDATE access codes
CREATE POLICY "Admins can update access codes"
ON public.site_access_codes
FOR UPDATE
TO authenticated
USING (public.is_current_user_admin());

-- Only admins can DELETE access codes  
CREATE POLICY "Admins can delete access codes"
ON public.site_access_codes
FOR DELETE
TO authenticated
USING (public.is_current_user_admin());

-- Allow first access code creation (for initial system setup)
-- OR admins can always insert new codes
CREATE POLICY "Allow initial setup or admin code creation"
ON public.site_access_codes
FOR INSERT
TO authenticated
WITH CHECK (
  -- Allow if no codes exist (first setup) OR user is admin
  (NOT EXISTS (SELECT 1 FROM site_access_codes)) 
  OR public.is_current_user_admin()
);

-- Also secure the site_access_logs table properly
-- Drop existing policy that might have issues
DROP POLICY IF EXISTS "Admins can view access logs" ON public.site_access_logs;

-- Create secure policy for access logs
CREATE POLICY "Admins can view access logs"
ON public.site_access_logs
FOR SELECT
TO authenticated  
USING (public.is_current_user_admin());

-- Ensure no one else can modify access logs (system managed)
CREATE POLICY "No manual modifications to access logs"
ON public.site_access_logs
FOR INSERT
TO authenticated
WITH CHECK (false); -- Prevent manual inserts

CREATE POLICY "No updates to access logs"
ON public.site_access_logs  
FOR UPDATE
TO authenticated
USING (false); -- Prevent updates

CREATE POLICY "No deletions of access logs"
ON public.site_access_logs
FOR DELETE
TO authenticated
USING (false); -- Prevent deletions