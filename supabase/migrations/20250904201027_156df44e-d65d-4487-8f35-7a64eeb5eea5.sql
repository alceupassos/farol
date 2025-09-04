-- Criar usuário guest usando o auth.signup administrativo
SELECT auth.signup(
  'guest@saudepublica.ai',
  '1234',
  '{"role": "paciente", "full_name": "Usuário Demonstração"}',
  '{"role": "paciente", "full_name": "Usuário Demonstração"}'
);