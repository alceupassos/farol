# 🚀 COMANDOS PARA EXECUTAR O PROJETO OSS COMPLETO

## ⚡ COMANDO RÁPIDO - COPIE E COLE:

```bash
cd /Users/alceualvespasssosmac/Farol/farol && chmod +x restart-oss.sh && ./restart-oss.sh
```

## ✅ Opção 1: Script de Restart (NOVO - RECOMENDADO)

Abra o terminal na pasta do projeto e execute:

```bash
# Dar permissão de execução ao script
chmod +x run-complete-oss.sh

# Executar o script completo (lint + build + dev)
./run-complete-oss.sh
```

## Opção 2: Script Básico (Apenas Dev)

```bash
# Dar permissão de execução ao script
chmod +x run-oss.sh

# Executar apenas o servidor
./run-oss.sh
```

## Opção 3: Executar comandos manualmente

Se preferir executar manualmente, use estes comandos em sequência:

### 1️⃣ Verificar o código com ESLint
```bash
npm run lint
```

### 2️⃣ Compilar o projeto
```bash
npm run build
```

### 3️⃣ Iniciar o servidor de desenvolvimento
```bash
npm run dev
```

## 📝 Notas Importantes

- O servidor será iniciado em: **http://localhost:5173**
- Se a porta 5173 estiver ocupada, o Vite escolherá outra automaticamente

## 🧪 Como Testar o Módulo OSS

1. Acesse **http://localhost:5173**
2. Clique no botão **"Acessar Sistema"**
3. Selecione **"Gestão Contratual/OSS"** (terceira opção)
4. Digite o código TOTP: **123456**
5. Você será redirecionado para o Dashboard OSS

## 🔧 Troubleshooting

### Se houver erros de lint:
```bash
# Ver detalhes dos erros
npm run lint

# Tentar corrigir automaticamente (se possível)
npx eslint . --fix
```

### Se houver erros de build:
```bash
# Limpar cache e node_modules
rm -rf node_modules dist
npm install
npm run build
```

### Se a porta estiver ocupada:
```bash
# Encontrar processo usando a porta 5173
lsof -i :5173

# Matar o processo (substitua PID pelo número do processo)
kill -9 PID

# Ou usar outra porta
npm run dev -- --port 3000
```

## ✅ Sucesso!

Quando tudo estiver funcionando, você verá:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

---

**Dica:** Mantenha o terminal aberto para ver logs e erros em tempo real.
