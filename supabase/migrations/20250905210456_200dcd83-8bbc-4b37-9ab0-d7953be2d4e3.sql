-- Remove the dangerous public SELECT policy that exposes encrypted secrets
DROP POLICY IF EXISTS "Public can read active codes for verification" ON public.site_access_codes;

-- The site-auth edge function uses service role key which bypasses RLS,
-- so this public policy is unnecessary and creates a security vulnerability