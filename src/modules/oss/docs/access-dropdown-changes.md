# Mudanças Necessárias no AccessDropdown.tsx

## Atualização — Controle de OPME no fluxo OSS
- Ao selecionar o papel OSS, garantir que o menu lateral contenha o item **Controle de OPME** (`/oss-controle-opme`).
- Revisar materiais de onboarding para destacar o acesso ao novo módulo dentro de “Acesso ao Sistema”.

## 1. Adicionar import do ícone FileText
```typescript
import { ChevronDown, User, UserCheck, Building2, Hospital, Loader2, TestTube, FileText } from 'lucide-react';
```

## 2. Adicionar opção OSS no array accessOptions (após Hospital)
```typescript
{
  id: 'oss',
  label: t('accessDropdown.options.oss.label'),
  icon: FileText,
  description: t('accessDropdown.options.oss.description'),
  color: 'text-purple-500'
},
```

## 3. Adicionar redirecionamento na função redirectAfterRole
```typescript
} else if (role === 'oss') {
  console.log('AccessDropdown: Redirecting to OSS dashboard');
  navigate('/oss-dashboard');
}
```

## Localização das mudanças:
- **Import**: Linha 2
- **accessOptions**: Adicionar após o objeto hospital (aproximadamente linha 46)
- **redirectAfterRole**: Adicionar após o if de hospital (aproximadamente linha 100)
