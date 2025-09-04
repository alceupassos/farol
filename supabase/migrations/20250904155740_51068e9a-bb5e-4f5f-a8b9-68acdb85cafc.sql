-- Create guest user for demonstration purposes
-- Note: This inserts directly into auth.users which is typically managed by Supabase Auth
-- but for a demo account, we'll create it programmatically

-- First, let's create the guest user in the user_roles table with a known UUID
-- We'll use a fixed UUID for the guest user
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000001'::uuid,
  '00000000-0000-0000-0000-000000000000'::uuid,
  'guest@saudepublica.ai',
  crypt('1234', gen_salt('bf')),
  now(),
  now(),
  now(),
  '',
  '',
  '',
  ''
) ON CONFLICT (email) DO NOTHING;

-- Create user role for guest
INSERT INTO user_roles (user_id, role)
VALUES ('00000000-0000-0000-0000-000000000001'::uuid, 'paciente')
ON CONFLICT (user_id, role) DO NOTHING;

-- Create profile for guest user
INSERT INTO profiles (user_id, full_name)
VALUES ('00000000-0000-0000-0000-000000000001'::uuid, 'Usuário Demonstração')
ON CONFLICT (user_id) DO NOTHING;