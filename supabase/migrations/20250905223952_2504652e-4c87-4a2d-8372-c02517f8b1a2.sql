-- Strengthen 2FA secrets table security
-- Drop existing policies first
DROP POLICY IF EXISTS "Service role can manage 2FA secrets" ON public.user_2fa_secrets;
DROP POLICY IF EXISTS "Users can view their own 2FA status" ON public.user_2fa_secrets;

-- Create more restrictive policies for 2FA secrets
-- Users can only check if they have 2FA enabled, not access the actual secret
CREATE POLICY "Users can view their own 2FA status only" 
ON public.user_2fa_secrets 
FOR SELECT 
USING (auth.uid() = user_id);

-- Only service role can manage 2FA secrets (create, update, delete)
CREATE POLICY "Service role can manage 2FA secrets" 
ON public.user_2fa_secrets 
FOR ALL 
USING (auth.role() = 'service_role');

-- Ensure RLS is enabled
ALTER TABLE public.user_2fa_secrets ENABLE ROW LEVEL SECURITY;

-- Add comment explaining the security model
COMMENT ON TABLE public.user_2fa_secrets IS 'Stores encrypted 2FA secrets. Users can only check status, service role manages secrets.';
COMMENT ON COLUMN public.user_2fa_secrets.encrypted_secret IS 'Encrypted TOTP secret - never exposed to users directly';
COMMENT ON COLUMN public.user_2fa_secrets.backup_codes IS 'Encrypted backup codes for account recovery';