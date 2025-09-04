#!/bin/bash

# Pre-build verification script
# Executa todas as verificações antes do build

echo "🚀 Executando verificações pré-build..."

# 1. Verificar assets
echo "📁 Verificando assets..."
if ! ./scripts/verify-assets.sh; then
  echo "❌ Verificação de assets falhou"
  exit 1
fi

# 2. Verificar tipos TypeScript
echo "🔧 Verificando tipos TypeScript..."
if ! npx tsc --noEmit; then
  echo "❌ Verificação de tipos falhou"
  exit 1
fi

# 3. Executar testes
echo "🧪 Executando testes..."
if ! npm run test:run; then
  echo "❌ Testes falharam"
  exit 1
fi

# 4. Verificar lint
echo "📏 Verificando lint..."
if ! npm run lint; then
  echo "❌ Lint falhou"
  exit 1
fi

# 5. Build de teste
echo "🏗️  Testando build..."
if ! npm run build; then
  echo "❌ Build falhou"
  exit 1
fi

echo "✅ Todas as verificações passaram! Ready to deploy 🚀"