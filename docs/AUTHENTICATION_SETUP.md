# Configuração de Autenticação - Troubleshooting

Este documento contém instruções para resolver problemas de autenticação no sistema.

## Problema: "Invalid login credentials" no usuário guest

### Causa
O usuário de demonstração `guest@saudepublica.ai` não existe no banco de dados ou há problemas de configuração no Supabase.

### Soluções

#### 1. Desabilitar Confirmação de Email (Recomendado para Desenvolvimento)

1. Acesse o dashboard do Supabase: https://supabase.com/dashboard/project/droygvpcwkrdzfdtxqsq
2. Vá em **Authentication** → **Settings**
3. Em **User Signups**, desmarque a opção **"Enable email confirmations"**
4. Salve as configurações

#### 2. Configurar URLs de Redirect

1. No dashboard do Supabase, vá em **Authentication** → **URL Configuration**
2. Configure:
   - **Site URL**: `https://preview--saudepublica.lovable.app` (ou sua URL de produção)
   - **Redirect URLs**: 
     - `https://preview--saudepublica.lovable.app/**`
     - `http://localhost:3000/**` (para desenvolvimento)

#### 3. Criar Usuário Guest Manualmente

Se o problema persistir, execute o script `scripts/create-guest-user.js`:

**Credenciais de Demonstração Atualizadas:**
- **Email**: guest@saudepublica.ai  
- **Senha**: 123456

```bash
node scripts/create-guest-user.js
```

#### 4. Usando o Debug Panel

Em modo de desenvolvimento, use o painel de debug que aparece no canto inferior direito da página de autenticação para:

- Verificar o estado atual da autenticação
- Testar conexões com o banco de dados
- Executar testes automáticos do sistema
- Fazer login rápido com diferentes roles

### Verificações de Segurança

1. **RLS Policies**: Verifique se as políticas RLS estão configuradas corretamente:
   - `profiles`: Usuários podem ver/editar apenas seus próprios perfis
   - `user_roles`: Usuários podem ver apenas suas próprias roles

2. **Permissões de Tabela**: Confirme que as tabelas `profiles` e `user_roles` têm as permissões corretas

### Logs Úteis

Para debug, verifique os logs em:
- Console do navegador (F12)
- Supabase Dashboard → Logs → Auth Logs
- Supabase Dashboard → Logs → Database Logs

### Contato

Se o problema persistir, verifique:
1. Se a configuração do Supabase está correta
2. Se há problemas de rede
3. Se o projeto Supabase está ativo e funcionando

## Status de Funcionalidades

✅ Usuário guest pode ser criado automaticamente  
✅ Roles são aplicadas corretamente  
✅ Redirecionamento pós-login funciona  
✅ Debug panel disponível em desenvolvimento  
⚠️ Requer configuração de email confirmation no Supabase