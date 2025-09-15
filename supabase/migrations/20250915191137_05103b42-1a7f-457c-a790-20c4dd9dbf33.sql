-- Security Fix: Restrict admin_users table access to service role only
-- First, drop all existing policies on admin_users
DROP POLICY IF EXISTS "Admins can view admin users" ON admin_users;
DROP POLICY IF EXISTS "Service role only access for admin_users" ON admin_users;

-- Create ultra-restrictive policy that only allows service role access
CREATE POLICY "Service role only access for admin_users" 
ON admin_users 
FOR ALL 
USING (auth.role() = 'service_role'::text)
WITH CHECK (auth.role() = 'service_role'::text);

-- Update the admin functions to be more secure
-- Create a new secure admin validation function that doesn't expose the admin_users table
CREATE OR REPLACE FUNCTION public.validate_admin_session(session_token text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_exists boolean := false;
BEGIN
  -- Only service role should call this function
  IF auth.role() != 'service_role' THEN
    RETURN false;
  END IF;
  
  -- Check if valid admin session exists
  SELECT EXISTS(
    SELECT 1 FROM admin_sessions 
    WHERE admin_sessions.session_token = validate_admin_session.session_token
    AND expires_at > now()
  ) INTO admin_exists;
  
  RETURN admin_exists;
END;
$$;

-- Create a function to safely check if current user has admin privileges
-- This replaces the previous is_admin_user function with a session-based approach
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_session_exists boolean := false;
BEGIN
  -- Check if there's a valid admin session for the current user
  -- This is safer than checking email directly against admin_users
  SELECT EXISTS(
    SELECT 1 FROM admin_sessions
    JOIN admin_users ON admin_sessions.admin_user_id = admin_users.id  
    WHERE admin_users.email = (auth.jwt() ->> 'email'::text)
    AND admin_sessions.expires_at > now()
  ) INTO admin_session_exists;
  
  RETURN admin_session_exists;
END;
$$;