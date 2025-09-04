# MedWallet - Code Review Checklist

## Antes de Commitar

### ✅ Assets e Imports
- [ ] Todos os assets necessários existem em `src/assets/`
- [ ] Imports de assets usam caminhos corretos `@/assets/`
- [ ] Nenhum import quebrado ou de arquivo inexistente
- [ ] Imagens otimizadas (tamanho apropriado)

### ✅ TypeScript
- [ ] `npx tsc --noEmit` passa sem erros
- [ ] Todos os tipos estão definidos corretamente
- [ ] Interfaces exportadas quando necessário
- [ ] Props tipadas corretamente

### ✅ Testes
- [ ] Testes unitários para novos componentes
- [ ] Testes passando: `npm run test`
- [ ] Coverage adequado (>70%)
- [ ] ErrorBoundary testado

### ✅ Performance
- [ ] Lazy loading implementado onde necessário
- [ ] Imagens com alt text apropriado
- [ ] Componentes otimizados (memo quando necessário)
- [ ] Evitar re-renders desnecessários

### ✅ Acessibilidade
- [ ] Labels adequados em formulários
- [ ] Contraste de cores apropriado
- [ ] Navegação por teclado funcional
- [ ] Screen readers considerados

### ✅ Segurança
- [ ] RLS policies atualizadas
- [ ] Dados sensíveis não expostos
- [ ] Validação client-side e server-side
- [ ] HTTPS enforced

### ✅ Cross-Browser
- [ ] Testado no Chrome
- [ ] Testado no Firefox
- [ ] Testado no Safari
- [ ] Responsivo em diferentes telas

### ✅ Error Handling
- [ ] ErrorBoundary implementado
- [ ] Loading states
- [ ] Error states
- [ ] Fallbacks apropriados

## Após Deploy

### ✅ Monitoramento
- [ ] Health checks funcionando
- [ ] Logs sendo capturados
- [ ] Performance monitoring ativo
- [ ] Error tracking configurado

### ✅ Rollback Plan
- [ ] Versão anterior funcional identificada
- [ ] Processo de rollback testado
- [ ] Database migrations reversíveis
- [ ] Assets backup available

## Troubleshooting

Se algo der errado:

1. **Verificar logs**: Console, Network, Supabase
2. **Health check**: `npm run health-check`
3. **Asset verification**: `npm run verify-assets`
4. **Rollback**: Reverter para versão funcional
5. **Investigar**: Identificar root cause
6. **Fix específico**: Não fix genérico

## Commands

```bash
# Verificações completas
npm run pre-build

# Verificar apenas assets
npm run verify-assets

# Health check
npm run health-check

# Testes completos
npm run test:coverage

# Build limpo
npm run clean && npm run build
```