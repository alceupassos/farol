# Mudanças Necessárias no App.tsx

## 1. Adicionar import do OSSDashboard
Adicione após a linha de import do PrefeituraDashboard (aproximadamente linha 91):
```typescript
import OSSDashboard from "./pages/OSSDashboard";
```

## 2. Adicionar a rota para o OSS Dashboard
Adicione dentro do componente Routes, após a rota do prefeitura-dashboard:
```typescript
<Route path="/oss-dashboard" element={<OSSDashboard />} />
```

## Localização exata:
- **Import**: Adicionar na linha 92, após `import PrefeituraDashboard from "./pages/PrefeituraDashboard";`
- **Route**: Adicionar após a rota `/prefeitura-dashboard` no componente Routes

## Exemplo completo:
```typescript
// Imports (linha ~91-92)
import PrefeituraDashboard from "./pages/PrefeituraDashboard";
import OSSDashboard from "./pages/OSSDashboard";

// Routes (dentro do componente Routes)
<Route path="/prefeitura-dashboard" element={<PrefeituraDashboard />} />
<Route path="/oss-dashboard" element={<OSSDashboard />} />
```
