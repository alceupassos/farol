# Troubleshooting Guide para MedWallet

## Problemas Comuns e Soluções

### 1. Tela Preta / Aplicação não carrega

**Sintomas:**
- Página em branco ou tela preta
- Console mostra erros de importação
- Assets não encontrados

**Soluções:**
1. **Verificar imports de assets:**
   ```bash
   # Verificar se todos os assets existem
   ls -la src/assets/
   ```

2. **Verificar console do navegador:**
   - Abrir DevTools (F12)
   - Verificar erros na aba Console
   - Verificar erros na aba Network

3. **Limpar cache:**
   ```bash
   # Limpar cache do vite
   rm -rf node_modules/.vite
   npm run dev
   ```

### 2. Erros de Build

**Sintomas:**
- Build falha com erros TypeScript
- Imports não encontrados
- Tipos não definidos

**Soluções:**
1. **Verificar tipos:**
   ```bash
   npx tsc --noEmit
   ```

2. **Verificar imports:**
   ```bash
   # Buscar imports problemáticos
   grep -r "import.*@/assets" src/
   ```

3. **Regenerar tipos:**
   ```bash
   npm run build
   ```

### 3. Problemas Cross-Browser

**Sintomas:**
- Funciona em um browser mas não em outro
- Estilos quebrados
- JavaScript não executa

**Soluções:**
1. **Testar em modo incógnito**
2. **Verificar console de diferentes browsers**
3. **Usar ferramentas de compatibilidade**

### 4. Problemas de Performance

**Sintomas:**
- Loading lento
- Interface travando
- Imagens não carregando

**Soluções:**
1. **Otimizar imagens:**
   ```bash
   # Verificar tamanho dos assets
   du -sh src/assets/*
   ```

2. **Usar lazy loading**
3. **Verificar network requests**

### 5. Problemas de Supabase

**Sintomas:**
- Erros de autenticação
- Dados não carregando
- RLS bloqueando acesso

**Soluções:**
1. **Verificar políticas RLS:**
   ```sql
   SELECT * FROM pg_policies;
   ```

2. **Testar conexão:**
   ```javascript
   console.log(supabase.auth.getUser());
   ```

## Sistema de Health Check

Para verificar a saúde da aplicação:

```javascript
import { performHealthCheck } from '@/utils/assetVerification';

const checkHealth = async () => {
  const health = await performHealthCheck();
  console.log('Health Status:', health);
};
```

## Comandos Úteis

### Desenvolvimento
```bash
# Iniciar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar testes
npm run test

# Executar linting
npm run lint
```

### Debugging
```bash
# Verificar estrutura de arquivos
tree src/

# Verificar imports problemáticos
grep -r "import.*\\.\\./\\.\\./" src/

# Verificar assets
find src/assets -type f -name "*.jpg" -o -name "*.png"
```

### Limpeza
```bash
# Limpar tudo
rm -rf node_modules/ dist/ .vite/
npm install

# Limpar apenas cache
rm -rf node_modules/.vite
```

## Processo de Rollback

Se a aplicação quebrar após uma mudança:

1. **Identificar a última versão funcionando**
2. **Reverter arquivos específicos:**
   ```bash
   git checkout HEAD~1 -- src/specific-file.tsx
   ```
3. **Testar incrementalmente**
4. **Aplicar fix específico**

## Prevenção

### Checklist antes de Deploy
- [ ] Todos os tests passando
- [ ] Build sem erros
- [ ] Assets existem
- [ ] Cross-browser testado
- [ ] Health check OK
- [ ] Supabase policies verificadas

### Monitoramento Contínuo
- Health checks automáticos
- Testes de regressão
- Monitoramento de assets
- Logs de erro centralizados

## Contato para Suporte

Em caso de problemas persistentes:
1. Documentar o erro exato
2. Incluir logs do console
3. Descrever passos para reproduzir
4. Informar browser e versão