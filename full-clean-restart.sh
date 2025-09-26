#!/bin/bash

# Script completo de limpeza e restart
# Data: 26/09/2025

echo "🔥 LIMPEZA TOTAL E RESTART DO SISTEMA OSS"
echo "=========================================="
echo ""

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Matar todos os processos Node/Vite
echo -e "${YELLOW}⏹️  Parando todos os processos...${NC}"
killall node 2>/dev/null || true
killall vite 2>/dev/null || true
lsof -ti:8080,8081,5173,4173 | xargs kill -9 2>/dev/null || true
sleep 2

# Limpar TUDO
echo -e "${BLUE}🧹 Limpando cache e builds...${NC}"
rm -rf dist
rm -rf node_modules/.vite
rm -rf .parcel-cache
rm -rf .cache
rm -rf .turbo
rm -rf coverage
rm -rf .next
rm -rf .nuxt
rm -rf .output

echo -e "${GREEN}✅ Limpeza completa!${NC}"
echo ""

# Build
echo -e "${BLUE}🔨 Compilando projeto...${NC}"
npm run build

echo ""

# Preview ou Dev?
echo -e "${YELLOW}Escolha o modo de execução:${NC}"
echo "1) Preview (Produção - porta 4173)"
echo "2) Dev (Desenvolvimento - porta 5173)"
echo -n "Digite 1 ou 2: "
read choice

if [ "$choice" = "1" ]; then
    echo -e "${GREEN}🌐 Iniciando PREVIEW (Produção)...${NC}"
    npm run preview
else
    echo -e "${GREEN}🚀 Iniciando DEV (Desenvolvimento)...${NC}"
    npm run dev
fi
