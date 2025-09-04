#!/bin/bash

# Asset Verification Script
# Verifica se todos os assets necessários existem

echo "🔍 Verificando assets da aplicação..."

# Lista de assets críticos
ASSETS=(
  "src/assets/medwallet-logo.png"
  "src/assets/medical-tech-bg.jpg"
  "src/assets/medical-hero-bg.jpg"
  "src/assets/dashboard-bg.jpg"
  "src/assets/hero-shield.png"
)

MISSING_ASSETS=()

# Verificar cada asset
for asset in "${ASSETS[@]}"; do
  if [ ! -f "$asset" ]; then
    MISSING_ASSETS+=("$asset")
    echo "❌ Faltando: $asset"
  else
    echo "✅ Encontrado: $asset"
  fi
done

# Verificar imports problemáticos
echo ""
echo "🔍 Verificando imports de assets..."

PROBLEMATIC_IMPORTS=$(grep -r "import.*@/assets" src/ 2>/dev/null | grep -v "\.png\|\.jpg\|\.jpeg\|\.gif\|\.svg" || true)

if [ -n "$PROBLEMATIC_IMPORTS" ]; then
  echo "⚠️  Imports problemáticos encontrados:"
  echo "$PROBLEMATIC_IMPORTS"
else
  echo "✅ Todos os imports de assets parecem corretos"
fi

# Resultados finais
echo ""
if [ ${#MISSING_ASSETS[@]} -eq 0 ]; then
  echo "🎉 Todos os assets críticos estão presentes!"
  exit 0
else
  echo "💥 Foram encontrados ${#MISSING_ASSETS[@]} assets em falta:"
  for missing in "${MISSING_ASSETS[@]}"; do
    echo "  - $missing"
  done
  echo ""
  echo "Por favor, adicione os assets em falta antes de continuar."
  exit 1
fi