-- Criar o usuário guest diretamente no banco (se não existir)
-- Primeiro inserir na tabela auth.users
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  confirmation_sent_at,
  confirmation_token,
  recovery_sent_at,
  recovery_token,
  email_change_sent_at,
  email_change,
  email_change_token_new,
  email_change_token_current,
  phone,
  phone_confirmed_at,
  phone_change,
  phone_change_token,
  phone_change_sent_at,
  confirmed_at,
  email_change_confirm_status,
  banned_until,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  created_at,
  updated_at,
  last_sign_in_at,
  app_metadata,
  user_metadata,
  is_sso_user
) 
SELECT 
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'guest@saudepublica.ai',
  crypt('1234', gen_salt('bf')),
  now(),
  now(),
  '',
  null,
  '',
  null,
  '',
  '',
  '',
  null,
  null,
  '',
  '',
  null,
  now(),
  0,
  null,
  '{"role": "paciente", "full_name": "Usuário Demonstração"}',
  '{"role": "paciente", "full_name": "Usuário Demonstração"}',
  false,
  now(),
  now(),
  null,
  '{}',
  '{}',
  false
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'guest@saudepublica.ai'
);

-- Inserir perfil para o usuário guest
INSERT INTO public.profiles (user_id, full_name, municipality, crm, specialty)
SELECT 
  (SELECT id FROM auth.users WHERE email = 'guest@saudepublica.ai'),
  'Usuário Demonstração',
  'Demonstração',
  '',
  ''
WHERE NOT EXISTS (
  SELECT 1 FROM public.profiles p 
  JOIN auth.users u ON p.user_id = u.id 
  WHERE u.email = 'guest@saudepublica.ai'
);

-- Inserir role para o usuário guest  
INSERT INTO public.user_roles (user_id, role)
SELECT 
  (SELECT id FROM auth.users WHERE email = 'guest@saudepublica.ai'),
  'paciente'::app_role
WHERE NOT EXISTS (
  SELECT 1 FROM public.user_roles r 
  JOIN auth.users u ON r.user_id = u.id 
  WHERE u.email = 'guest@saudepublica.ai'
);