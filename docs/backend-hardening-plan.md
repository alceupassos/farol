# Backend Hardening & Refactor Plan

## Immediate (P0) – Segurança
- Substituir autenticação hard-coded do painel admin por fluxo via edge function `admin-auth` com hashing PBKDF2.
- Desativar a função `get-encryption-key` (expondo segredo) e mover cifra/decifra dos códigos TOTp exclusivamente para edge functions.
- Unificar criptografia do TOTp (`secure-totp` e `verify-totp`) lendo a chave de ambiente `TOTP_ENCRYPTION_KEY` e incluindo rotação segura.
- Revisar políticas RLS de `site_access_codes`/`site_access_logs` garantindo que apenas admins autenticados via sessão possam inserir/consultar.

## Alta (P1) – Confiabilidade
- Adicionar validação (Zod) para payloads das funções (`site-auth`, `admin-auth`, *analytics functions*), retornando erros estruturados.
- Criar utilitário compartilhado para CORS/logging/erros, reduzindo divergências e padronizando respostas HTTP.
- Melhorar tratamento de respostas das integrações (OpenAI/Gemini) com timeout, retries e fallback consistente sem logar dados sensíveis.
- Registrar eventos críticos (tentativas de login, geração TOTP, consumo AI) em `security_audit_logs` com contexto mínimo.

## Média (P2) – Observabilidade & Performance
- Instrumentar métricas (tempo de execução, contagem de requisições) usando Supabase logs e opcionalmente APM futuro.
- Introduzir cache de curto prazo (Supabase KV/Redis) para relatórios analíticos estáticos diminuindo uso da API da OpenAI.
- Consolidar geração de dados mock sob *feature flag* para ambiente de desenvolvimento.

## Baixa (P3) – Manutenção
- Converter functions para TypeScript estrito com `deno.json` compartilhado.
- Automatizar testes de contrato (Deno test) para `admin-auth`, `site-auth`, `secure-totp`.
- Documentar fluxos em `docs/backend-architecture.md` com diagrama de sequência para TOTp/admin login.

## Dependências
- Exigir variáveis: `SUPABASE_SERVICE_ROLE_KEY`, `SITE_ENCRYPTION_KEY`, `TOTP_ENCRYPTION_KEY`, `OPENAI_API_KEY`, `GOOGLE_GEMINI_API_KEY`.
- Necessita Supabase CLI >= 1.153 (edge runtime bundler com imports locais).
