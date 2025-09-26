#!/usr/bin/env bash
set -euo pipefail

COMMIT_MSG=${1:-"chore: manutenção OSS"}
BRANCH=$(git rev-parse --abbrev-ref HEAD)

printf "🔄 Limpando caches...\n"
rm -rf node_modules/.vite dist .turbo || true
pnpm store prune || true

printf "📦 Instalando dependências...\n"
pnpm install

printf "🛠️ Gerando build...\n"
pnpm run build

printf "🧹 Executando lint...\n"
pnpm run lint

printf "🚀 Reiniciando preview...\n"
pkill -f "pnpm run preview" || true
nohup pnpm run preview -- --host > /tmp/farol-preview.log 2>&1 &
printf "Preview ativo; logs em /tmp/farol-preview.log\n"

printf "🌐 Atualizando GitHub...\n"
git add -A
git commit -m "$COMMIT_MSG" || true
git pull --rebase origin "$BRANCH"
git push origin "$BRANCH"

printf "✅ Fluxo concluído.\n"
