#!/bin/bash

# Script para limpar cache, build e preview do sistema OSS
# Data: 26/09/2025

echo "🧹 LIMPEZA COMPLETA E PREVIEW - SISTEMA OSS"
echo "==========================================="
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# 1. PARAR PROCESSOS
echo -e "${YELLOW}⏹️  Parando processos anteriores...${NC}"
pkill -f "vite" 2>/dev/null || true
pkill -f "node" 2>/dev/null || true
sleep 2

# 2. LIMPAR CACHE E BUILD
echo -e "${CYAN}🧹 ETAPA 1: Limpando cache e arquivos de build...${NC}"
echo "  • Removendo node_modules/.vite"
rm -rf node_modules/.vite 2>/dev/null || true
echo "  • Removendo dist"
rm -rf dist 2>/dev/null || true
echo "  • Removendo .parcel-cache"
rm -rf .parcel-cache 2>/dev/null || true
echo "  • Limpando cache do npm"
npm cache clean --force 2>/dev/null || true
echo -e "${GREEN}✅ Cache limpo!${NC}"
echo ""

# 3. REINSTALAR DEPENDÊNCIAS (opcional - comentado por padrão)
# echo -e "${BLUE}📦 ETAPA 2: Reinstalando dependências...${NC}"
# rm -rf node_modules package-lock.json
# npm install
# echo -e "${GREEN}✅ Dependências instaladas!${NC}"
# echo ""

# 4. LINT
echo -e "${BLUE}📝 ETAPA 2: Verificando código com ESLint...${NC}"
npm run lint 2>&1 | tail -10
echo ""

# 5. BUILD PARA PRODUÇÃO
echo -e "${BLUE}🔨 ETAPA 3: Compilando para produção...${NC}"
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build de produção concluído!${NC}"
    echo ""
    
    # Mostrar tamanho dos arquivos
    echo -e "${CYAN}📊 Tamanho dos arquivos gerados:${NC}"
    du -sh dist/* 2>/dev/null | head -10
    echo ""
else
    echo -e "${RED}❌ Erro no build. Verifique os erros acima.${NC}"
    exit 1
fi

# 6. PREVIEW
echo -e "${PURPLE}🌐 ETAPA 4: Iniciando servidor de preview (produção)...${NC}"
echo ""
echo -e "${PURPLE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${PURPLE}║      🎯 PREVIEW DE PRODUÇÃO - SISTEMA OSS FAROL       ║${NC}"
echo -e "${PURPLE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}📌 MODO PREVIEW (BUILD DE PRODUÇÃO):${NC}"
echo "================================"
echo -e "${YELLOW}URL:${NC} http://localhost:4173"
echo -e "${YELLOW}Modo:${NC} Produção (otimizado)"
echo -e "${YELLOW}Build:${NC} Minificado e comprimido"
echo ""
echo -e "${GREEN}📊 ACESSO AO SISTEMA OSS:${NC}"
echo "  1. Clique em 'Acessar Sistema'"
echo "  2. Selecione 'Gestão Contratual/OSS'"
echo "  3. Use código TOTP: 123456"
echo ""
echo -e "${CYAN}🎯 FUNCIONALIDADES DISPONÍVEIS:${NC}"
echo "  ✅ Dashboard Principal (16 KPIs)"
echo "  ✅ Receitas e Glosas (Funil + Pareto + XmR)"
echo "  ✅ Compliance e Risco (Matriz 5x5 + Audesp)"
echo "  ✅ Metas e Desempenho (Radar + Benchmark)"
echo "  ✅ Oráculo IA (Gemini + What-If)"
echo ""
echo -e "${YELLOW}⚠️  NOTA:${NC} Este é o modo preview de produção."
echo "  Performance otimizada e arquivos minificados."
echo ""
echo -e "${BLUE}🔄 Pressione Ctrl+C para parar${NC}"
echo "================================"
echo ""

# Executar preview
npm run preview
