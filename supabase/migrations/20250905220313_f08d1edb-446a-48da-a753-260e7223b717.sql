-- Update RLS policies for user_2fa_secrets to be more restrictive
-- Users should only be able to check if 2FA is enabled, not access the encrypted secrets directly

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own 2FA secrets" ON public.user_2fa_secrets;
DROP POLICY IF EXISTS "Users can create their own 2FA secrets" ON public.user_2fa_secrets;
DROP POLICY IF EXISTS "Users can update their own 2FA secrets" ON public.user_2fa_secrets;
DROP POLICY IF EXISTS "Users can delete their own 2FA secrets" ON public.user_2fa_secrets;

-- Create more secure policies that only allow status checking
CREATE POLICY "Users can check their 2FA status only"
ON public.user_2fa_secrets
FOR SELECT
USING (auth.uid() = user_id)
WITH CHECK (false); -- Prevent direct access to sensitive data

-- Only service role can manage 2FA secrets (through edge functions)
CREATE POLICY "Service role can manage 2FA secrets"
ON public.user_2fa_secrets
FOR ALL
USING (auth.role() = 'service_role');

-- Add audit logging table for security events
CREATE TABLE IF NOT EXISTS public.security_audit_log (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  event_type text NOT NULL,
  event_details jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on audit log
ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins and service role can view audit logs
CREATE POLICY "Only admins can view audit logs"
ON public.security_audit_log
FOR SELECT
USING (is_current_user_admin() OR auth.role() = 'service_role');

-- Only service role can insert audit logs
CREATE POLICY "Service role can insert audit logs"
ON public.security_audit_log
FOR INSERT
WITH CHECK (auth.role() = 'service_role');

-- Create function to log security events
CREATE OR REPLACE FUNCTION public.log_security_event(
  p_user_id uuid,
  p_event_type text,
  p_event_details jsonb DEFAULT NULL,
  p_ip_address inet DEFAULT NULL,
  p_user_agent text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.security_audit_log (
    user_id,
    event_type,
    event_details,
    ip_address,
    user_agent
  ) VALUES (
    p_user_id,
    p_event_type,
    p_event_details,
    p_ip_address,
    p_user_agent
  );
END;
$$;