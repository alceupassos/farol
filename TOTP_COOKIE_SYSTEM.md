# 🔐 Sistema TOTP com Cookie - Autenticação Diária

## 📋 Visão Geral

Sistema de autenticação TOTP (Time-based One-Time Password) que valida o código apenas **uma vez por dia** usando cookies HTTP.

## ✨ Funcionalidades

### 1. **Cookie de 24 Horas**
- Cookie `farol_totp_auth` válido por 24 horas
- Armazenado com `SameSite=Strict` para segurança
- Expira automaticamente após 24h

### 2. **Validação Inteligente**
- ✅ **Com Cookie Válido:** Acesso direto sem TOTP
- ❌ **Sem Cookie:** Modal TOTP é exibido
- 🔄 **Cookie Expirado:** Nova validação TOTP necessária

### 3. **Fluxo de Autenticação**

```
Usuário clica em "Acesso ao Sistema"
         ↓
Verifica cookie TOTP
         ↓
    ┌────┴────┐
    │         │
Cookie OK   Cookie Expirado/Inexistente
    │         │
    ↓         ↓
Acesso    Modal TOTP
Direto         ↓
    │    Valida Código
    │         ↓
    │    Define Cookie
    │         ↓
    └────┬────┘
         ↓
  Redireciona para Dashboard
```

## 🛠️ Arquivos Implementados

### 1. `/src/utils/totpCookie.ts`
Utilitário para gerenciar cookies TOTP:

```typescript
totpCookie.set()        // Define cookie por 24h
totpCookie.isValid()    // Verifica se cookie existe
totpCookie.clear()      // Remove cookie (logout)
```

### 2. `/src/components/layout/AccessDropdown.tsx`
Componente de acesso com validação de cookie:

- **useEffect:** Verifica cookie ao montar
- **handleAccessSelect:** Bypass do modal se cookie válido
- **handleVerifyTotp:** Define cookie após validação bem-sucedida

### 3. `/src/contexts/AuthContext.tsx`
Contexto de autenticação:

- **signOut:** Limpa cookie TOTP ao fazer logout

## 🎯 Como Funciona

### Primeira Autenticação (Sem Cookie)
1. Usuário clica em uma opção de acesso (Gestor, Hospital, OSS, etc.)
2. Modal TOTP é exibido
3. Usuário digita código de 6 dígitos
4. Sistema valida código
5. **Cookie é definido por 24h**
6. Redirecionamento para dashboard

### Acessos Subsequentes (Com Cookie Válido)
1. Usuário clica em uma opção de acesso
2. Sistema detecta cookie válido
3. **Modal TOTP é pulado automaticamente**
4. Redirecionamento imediato para dashboard

### Após 24 Horas (Cookie Expirado)
1. Cookie expira automaticamente
2. Próximo acesso exige nova validação TOTP
3. Ciclo recomeça

## 🔒 Segurança

### Configuração do Cookie
```javascript
document.cookie = `farol_totp_auth=authenticated; 
  expires=${expiryDate.toUTCString()}; 
  path=/; 
  SameSite=Strict`;
```

### Proteções Implementadas
- ✅ **SameSite=Strict:** Previne CSRF
- ✅ **Path=/:** Cookie válido em toda aplicação
- ✅ **Expiração Automática:** 24 horas
- ✅ **Limpeza no Logout:** Cookie removido ao sair

## 📊 Logs do Console

### Cookie Válido
```
✅ TOTP Cookie válido encontrado - autenticação ativa
✅ TOTP já autenticado via cookie - pulando verificação
```

### Cookie Expirado/Inexistente
```
❌ TOTP Cookie não encontrado ou expirado
AccessDropdown: iniciando verificação TOTP para papel: gestor
```

### Validação Bem-Sucedida
```
AccessDropdown: TOTP verification succeeded for role: gestor
🍪 Cookie TOTP definido - válido por 24 horas
```

### Logout
```
🔓 Logout realizado - Cookie TOTP removido
```

## 🧪 Testando o Sistema

### Teste 1: Primeira Autenticação
1. Abra o navegador em modo anônimo
2. Acesse o sistema
3. Clique em "Acesso ao Sistema" → Escolha um perfil
4. Modal TOTP deve aparecer
5. Digite código: `123456` (código de teste)
6. Verifique no console: `🍪 Cookie TOTP definido`

### Teste 2: Acesso com Cookie Válido
1. Após autenticação bem-sucedida
2. Navegue para outra página
3. Clique em "Acesso ao Sistema" → Escolha outro perfil
4. **Modal TOTP NÃO deve aparecer**
5. Redirecionamento imediato
6. Verifique no console: `✅ TOTP já autenticado via cookie`

### Teste 3: Cookie Expirado
1. Abra DevTools → Application → Cookies
2. Delete o cookie `farol_totp_auth`
3. Clique em "Acesso ao Sistema"
4. Modal TOTP deve aparecer novamente

### Teste 4: Logout
1. Faça logout do sistema
2. Verifique no console: `🔓 Logout realizado - Cookie TOTP removido`
3. Próximo acesso exigirá TOTP novamente

## 🔧 Configurações

### Alterar Tempo de Expiração
Edite `/src/utils/totpCookie.ts`:

```typescript
const TOTP_COOKIE_EXPIRY_HOURS = 24; // Altere para o valor desejado
```

### Alterar Nome do Cookie
```typescript
const TOTP_COOKIE_NAME = 'farol_totp_auth'; // Altere o nome
```

## 📝 Notas Importantes

1. **Código TOTP de Teste:** `123456` (secret: `JBSWY3DPEHPK3PXP`)
2. **Compatibilidade:** Funciona em todos navegadores modernos
3. **Persistência:** Cookie sobrevive a fechamento de abas
4. **Segurança:** Cookie é limpo automaticamente no logout
5. **Desenvolvimento:** Logs detalhados no console para debug

## 🚀 Próximos Passos (Opcional)

### Melhorias Futuras
- [ ] Adicionar opção "Lembrar por 7 dias"
- [ ] Implementar refresh automático do cookie
- [ ] Adicionar indicador visual de tempo restante
- [ ] Implementar "Confiar neste dispositivo"
- [ ] Adicionar logs de auditoria de autenticação

## ✅ Status

**IMPLEMENTAÇÃO COMPLETA E FUNCIONAL!**

- ✅ Cookie de 24h implementado
- ✅ Validação automática funcionando
- ✅ Bypass do modal TOTP com cookie válido
- ✅ Limpeza no logout implementada
- ✅ Logs detalhados para debug
- ✅ Build compilado com sucesso

---

**Desenvolvido para o Sistema Farol - Gestão de Saúde Pública**
