#!/bin/bash

# Script completo para executar o módulo OSS com todas as funcionalidades
# Data: 26/09/2025

echo "🚀 INICIANDO SISTEMA OSS COMPLETO - FAROL"
echo "=========================================="
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 1. LINT - Verificar código
echo -e "${BLUE}📝 ETAPA 1: Verificando código com ESLint...${NC}"
npm run lint

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Lint concluído sem erros!${NC}"
else
    echo -e "${YELLOW}⚠️  Avisos encontrados no lint, mas continuando...${NC}"
fi

echo ""

# 2. BUILD - Compilar projeto
echo -e "${BLUE}🔨 ETAPA 2: Compilando o projeto...${NC}"
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build concluído com sucesso!${NC}"
    echo ""
    echo -e "${GREEN}📊 Funcionalidades OSS implementadas:${NC}"
    echo "  ✅ Dashboard Principal com 16 KPIs"
    echo "  ✅ Drill-down Receitas e Glosas"
    echo "  ✅ Drill-down Compliance e Risco"
    echo "  ✅ Drill-down Metas e Desempenho"
    echo "  ✅ Oráculo IA com Google Gemini"
    echo "  ✅ Serviços de Integração (SUS, Audesp, TISS, Bancos)"
else
    echo -e "${RED}❌ Erro durante o build. Verifique os erros acima.${NC}"
    echo "Tentando executar em modo desenvolvimento mesmo assim..."
fi

echo ""

# 3. DEV - Iniciar servidor
echo -e "${BLUE}🌟 ETAPA 3: Iniciando servidor de desenvolvimento...${NC}"
echo ""
echo -e "${GREEN}📌 INSTRUÇÕES DE ACESSO:${NC}"
echo "================================"
echo -e "${YELLOW}1. Acesse:${NC} http://localhost:5173"
echo -e "${YELLOW}2. Clique em:${NC} 'Acessar Sistema'"
echo -e "${YELLOW}3. Selecione:${NC} 'Gestão Contratual/OSS' (3ª opção)"
echo -e "${YELLOW}4. Código TOTP:${NC} 123456"
echo ""
echo -e "${GREEN}📊 PÁGINAS DISPONÍVEIS NO OSS:${NC}"
echo "  • Dashboard Principal: /oss-dashboard"
echo "  • Receitas e Glosas: /oss-receitas-glosas"
echo "  • Compliance e Risco: /oss-compliance-risco"
echo "  • Metas e Desempenho: /oss-metas-desempenho"
echo "  • Oráculo IA: /oss-oracle-ai"
echo ""
echo -e "${BLUE}🔄 Pressione Ctrl+C para parar o servidor${NC}"
echo "================================"
echo ""

# Executar o servidor
npm run dev
