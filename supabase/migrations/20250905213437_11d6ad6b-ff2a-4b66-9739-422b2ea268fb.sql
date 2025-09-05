-- Fix RLS policies to allow site-auth edge function access
-- The edge function uses SERVICE_ROLE_KEY which bypasses RLS, but we need 
-- explicit policies for logging and updates

-- Drop ALL existing policies for site_access_codes and recreate them
DROP POLICY IF EXISTS "Admins can view access codes" ON public.site_access_codes;
DROP POLICY IF EXISTS "Admins can update access codes" ON public.site_access_codes;
DROP POLICY IF EXISTS "Admins can delete access codes" ON public.site_access_codes;
DROP POLICY IF EXISTS "Allow initial setup or admin code creation" ON public.site_access_codes;

-- Create policies that work for both admin users AND service role (edge functions)
CREATE POLICY "Allow service role and admin access to view codes"
ON public.site_access_codes
FOR SELECT
USING (
  -- Allow service role (edge functions) OR authenticated admins
  auth.role() = 'service_role' OR 
  (auth.role() = 'authenticated' AND public.is_current_user_admin())
);

CREATE POLICY "Allow service role and admin access to update codes"
ON public.site_access_codes
FOR UPDATE
USING (
  -- Allow service role (edge functions) OR authenticated admins
  auth.role() = 'service_role' OR 
  (auth.role() = 'authenticated' AND public.is_current_user_admin())
);

CREATE POLICY "Allow service role and admin access to delete codes"
ON public.site_access_codes
FOR DELETE
USING (
  -- Allow service role (edge functions) OR authenticated admins  
  auth.role() = 'service_role' OR
  (auth.role() = 'authenticated' AND public.is_current_user_admin())
);

CREATE POLICY "Allow service role and admin access to insert codes"
ON public.site_access_codes
FOR INSERT
WITH CHECK (
  -- Allow service role (edge functions) OR 
  -- Allow if no codes exist (first setup) OR user is admin
  auth.role() = 'service_role' OR
  (auth.role() = 'authenticated' AND (
    (NOT EXISTS (SELECT 1 FROM site_access_codes)) OR 
    public.is_current_user_admin()
  ))
);

-- Drop ALL existing policies for site_access_logs and recreate them
DROP POLICY IF EXISTS "Admins can view access logs" ON public.site_access_logs;
DROP POLICY IF EXISTS "No manual modifications to access logs" ON public.site_access_logs;
DROP POLICY IF EXISTS "No updates to access logs" ON public.site_access_logs;
DROP POLICY IF EXISTS "No deletions of access logs" ON public.site_access_logs;

-- Create policies for access logs
CREATE POLICY "Allow service role and admin access to view logs"
ON public.site_access_logs
FOR SELECT
USING (
  -- Allow service role (edge functions) OR authenticated admins
  auth.role() = 'service_role' OR 
  (auth.role() = 'authenticated' AND public.is_current_user_admin())
);

CREATE POLICY "Allow service role to insert logs"
ON public.site_access_logs
FOR INSERT
WITH CHECK (
  -- Only service role (edge functions) can insert logs
  -- Prevent manual user insertions
  auth.role() = 'service_role'
);

CREATE POLICY "No manual updates to access logs"
ON public.site_access_logs  
FOR UPDATE
USING (false);

CREATE POLICY "No manual deletions of access logs"
ON public.site_access_logs
FOR DELETE
USING (false);