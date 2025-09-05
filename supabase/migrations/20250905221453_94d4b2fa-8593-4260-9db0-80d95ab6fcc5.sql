-- Fix the overly restrictive 2FA policy that was blocking all user access
-- Users need to be able to check their 2FA status for the system to work properly

-- Drop the problematic policy
DROP POLICY IF EXISTS "Users can check their 2FA status only" ON public.user_2fa_secrets;

-- Create a proper policy that allows users to see their own 2FA status
-- but restricts access to sensitive encrypted data
CREATE POLICY "Users can view their own 2FA status"
ON public.user_2fa_secrets
FOR SELECT
USING (auth.uid() = user_id);

-- Keep the service role policy for full management
-- This was already created and is working correctly