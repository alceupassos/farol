-- Inserir usuário demo no Supabase
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'demo@angrasaude.com.br',
  crypt('123456', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Usuário Demo"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
) ON CONFLICT (email) DO NOTHING;

-- Criar perfil para o usuário demo
INSERT INTO public.profiles (
  user_id,
  full_name,
  municipality,
  created_at,
  updated_at
)
SELECT 
  u.id,
  'Usuário Demo',
  'Angra dos Reis',
  NOW(),
  NOW()
FROM auth.users u 
WHERE u.email = 'demo@angrasaude.com.br'
ON CONFLICT (user_id) DO NOTHING;

-- Criar role para o usuário demo
INSERT INTO public.user_roles (
  user_id,
  role,
  created_at
)
SELECT 
  u.id,
  'gestor'::app_role,
  NOW()
FROM auth.users u 
WHERE u.email = 'demo@angrasaude.com.br'
ON CONFLICT (user_id, role) DO NOTHING;