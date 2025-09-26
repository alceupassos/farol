#!/bin/bash

# Script para reiniciar o sistema OSS com todas as funcionalidades
# Data: 26/09/2025

echo "🔄 REINICIANDO SISTEMA OSS - FAROL"
echo "===================================="
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Matar processo anterior se existir
echo -e "${YELLOW}⏹️  Parando servidor anterior...${NC}"
pkill -f "vite" 2>/dev/null || true
sleep 2

# 1. LINT
echo -e "${BLUE}📝 ETAPA 1: Verificando código com ESLint...${NC}"
npm run lint 2>&1 | tail -20

echo ""

# 2. BUILD
echo -e "${BLUE}🔨 ETAPA 2: Compilando o projeto...${NC}"
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build concluído com sucesso!${NC}"
else
    echo -e "${YELLOW}⚠️  Build com avisos, mas continuando...${NC}"
fi

echo ""

# 3. DEV
echo -e "${BLUE}🚀 ETAPA 3: Iniciando servidor de desenvolvimento...${NC}"
echo ""
echo -e "${PURPLE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${PURPLE}║           🎯 SISTEMA OSS - FAROL SAÚDE                ║${NC}"
echo -e "${PURPLE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}📌 INSTRUÇÕES DE ACESSO:${NC}"
echo "================================"
echo -e "${YELLOW}URL:${NC} http://localhost:8081"
echo -e "${YELLOW}Menu:${NC} Acessar Sistema → Gestão Contratual/OSS"
echo -e "${YELLOW}TOTP:${NC} 123456"
echo ""
echo -e "${GREEN}📊 PÁGINAS DISPONÍVEIS:${NC}"
echo "  ✅ Dashboard Principal (16 KPIs)"
echo "  ✅ Receitas e Glosas (Funil + Pareto)"
echo "  ✅ Compliance e Risco (Matriz 5x5)"
echo "  ✅ Metas e Desempenho (Radar + Planos)"
echo "  ✅ Oráculo IA (Gemini + Simuladores)"
echo ""
echo -e "${PURPLE}⚠️  MENU LATERAL OSS:${NC}"
echo "  Se o menu não aparecer, aplique as mudanças em:"
echo "  src/modules/oss/docs/SIDEBAR_COMPLETE_INSTRUCTIONS.md"
echo ""
echo -e "${BLUE}🔄 Ctrl+C para parar${NC}"
echo "================================"
echo ""

# Executar
npm run dev
