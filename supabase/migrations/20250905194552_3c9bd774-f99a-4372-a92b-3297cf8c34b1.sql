-- Create site access codes table for pre-login 2FA
CREATE TABLE public.site_access_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code_name TEXT NOT NULL,
  encrypted_secret TEXT NOT NULL,
  salt TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  last_used_at TIMESTAMP WITH TIME ZONE
);

-- Create site access logs for auditing
CREATE TABLE public.site_access_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code_used UUID REFERENCES public.site_access_codes(id),
  ip_address INET,
  user_agent TEXT,
  success BOOLEAN NOT NULL,
  attempted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin users table
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.site_access_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_access_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- RLS policies for site_access_codes
CREATE POLICY "Admins can manage site access codes" 
ON public.site_access_codes 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE email = (auth.jwt() ->> 'email')
  )
);

-- RLS policies for site_access_logs  
CREATE POLICY "Admins can view access logs" 
ON public.site_access_logs 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE email = (auth.jwt() ->> 'email')
  )
);

-- RLS policies for admin_users
CREATE POLICY "Admins can view admin users" 
ON public.admin_users 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE email = (auth.jwt() ->> 'email')
  )
);

-- Insert the admin user with hashed password
INSERT INTO public.admin_users (email, password_hash) 
VALUES ('alceupassos@gmail.com', '$2b$12$LQv3c1yqBWVHxkd0LQ4lqO7ZWES1o7i3e1o3Yo.0o3e1o3Yo.0o3e');

-- Insert initial site access code
INSERT INTO public.site_access_codes (code_name, encrypted_secret, salt, created_by) 
VALUES ('Master Access', 'temp_encrypted_secret', 'temp_salt', (SELECT id FROM public.admin_users WHERE email = 'alceupassos@gmail.com'));