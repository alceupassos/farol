# 🌐 Guia de Internacionalização (i18n)

## Como usar traduções em qualquer componente

### 1. Importar o hook
```tsx
import { useGlobalTranslation } from '@/contexts/GlobalTranslationContext';
```

### 2. Usar no componente
```tsx
const MyComponent = () => {
  const { t, language, changeLanguage } = useGlobalTranslation();
  
  return (
    <div>
      <h1>{t('dashboard.title')}</h1>
      <p>{t('dashboard.overview')}</p>
      <button onClick={() => changeLanguage('en')}>
        {t('common.save')}
      </button>
    </div>
  );
};
```

## Chaves de Tradução Disponíveis

### 🧭 Navegação (nav.*)
- `nav.dashboard` - Dashboard
- `nav.profile` - Perfil Médico
- `nav.records` - Prontuários
- `nav.medications` - Medicamentos
- `nav.appointments` - Consultas
- `nav.metrics` - Métricas de Saúde
- `nav.access` - Controle de Acesso
- `nav.emergency` - QR de Emergência
- `nav.labexams` - Exames Laboratoriais
- `nav.help` - Central de Ajuda
- `nav.support` - Suporte
- `nav.manage` - Gerenciar Acesso
- `nav.logout` - Sair
- `nav.search` - Pesquisar...

### 🔧 Comum (common.*)
- `common.save` - Salvar
- `common.cancel` - Cancelar
- `common.edit` - Editar
- `common.delete` - Excluir
- `common.add` - Adicionar
- `common.remove` - Remover
- `common.confirm` - Confirmar
- `common.loading` - Carregando...
- `common.error` - Erro
- `common.success` - Sucesso
- `common.warning` - Aviso
- `common.info` - Informação

### 🏥 Telemedicina (telemedicine.*)
- `telemedicine.welcome` - Bem-vindo à Telemedicina
- `telemedicine.telemedicineConsultation` - Consulta de Telemedicina
- `telemedicine.waitingForPatient` - Aguardando paciente...
- `telemedicine.patientConnected` - Paciente conectado
- `telemedicine.inProgress` - Em Andamento
- `telemedicine.recording` - Gravando
- `telemedicine.you` - Você
- `telemedicine.noMessages` - Nenhuma mensagem
- `telemedicine.typeMessage` - Digite uma mensagem...
- `telemedicine.sendMessage` - Enviar Mensagem
- `telemedicine.close` - Fechar
- `telemedicine.fullscreen` - Tela Cheia
- `telemedicine.exitFullscreen` - Sair da Tela Cheia
- `telemedicine.cameraOn` - Câmera Ativada
- `telemedicine.cameraOff` - Câmera Desativada
- `telemedicine.copyLink` - Copiar Link
- `telemedicine.linkCopied` - Link copiado!
- `telemedicine.sessionId` - ID da Sessão
- `telemedicine.patientLink` - Link do Paciente
- `telemedicine.copyConsultationLink` - Copiar link da consulta
- `telemedicine.chat` - Chat
- `telemedicine.participants` - Participantes
- `telemedicine.inviteParticipant` - Convidar Participante
- `telemedicine.connectionQuality` - Qualidade da Conexão
- `telemedicine.excellent` - Excelente

### 🔐 Autenticação (auth.*)
- `auth.login` - Entrar
- `auth.logout` - Sair
- `auth.register` - Cadastrar
- `auth.email` - E-mail
- `auth.password` - Senha
- `auth.name` - Nome completo

### 👤 Perfil (profile.*)
- `profile.title` - Perfil do Usuário
- `profile.personalInfo` - Informações Pessoais
- `profile.medicalInfo` - Informações Médicas

### 📊 Dashboard (dashboard.*)
- `dashboard.title` - Dashboard
- `dashboard.overview` - Visão Geral
- `dashboard.recentActivity` - Atividade Recente
- `dashboard.quickActions` - Ações Rápidas

## Idiomas Suportados

- 🇧🇷 **Português** (pt) - Padrão
- 🇺🇸 **English** (en)
- 🇪🇸 **Español** (es)
- 🇫🇷 **Français** (fr)

## Como Adicionar Novas Traduções

1. Abra o arquivo `/src/hooks/useSimpleTranslation.ts`
2. Adicione a nova chave em todos os idiomas:

```typescript
const translations = {
  pt: {
    'minha.nova.chave': 'Meu texto em português',
    // ... outras traduções
  },
  en: {
    'minha.nova.chave': 'My text in English',
    // ... outras traduções
  },
  es: {
    'minha.nova.chave': 'Mi texto en español',
    // ... outras traduções
  },
  fr: {
    'minha.nova.chave': 'Mon texte en français',
    // ... outras traduções
  }
};
```

3. Use no componente:
```tsx
const text = t('minha.nova.chave');
```

## Exemplo Completo

```tsx
import React from 'react';
import { useGlobalTranslation } from '@/contexts/GlobalTranslationContext';
import { Button } from '@/components/ui/button';

const ExemploTraduzido = () => {
  const { t, language, changeLanguage } = useGlobalTranslation();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {t('dashboard.title')}
      </h1>
      
      <p className="mb-4">
        {t('dashboard.overview')}
      </p>
      
      <div className="space-x-2">
        <Button onClick={() => changeLanguage('pt')}>
          🇧🇷 Português
        </Button>
        <Button onClick={() => changeLanguage('en')}>
          🇺🇸 English
        </Button>
        <Button onClick={() => changeLanguage('es')}>
          🇪🇸 Español
        </Button>
        <Button onClick={() => changeLanguage('fr')}>
          🇫🇷 Français
        </Button>
      </div>
      
      <div className="mt-4">
        <p>Idioma atual: {language}</p>
        <p>{t('common.loading')}</p>
        <p>{t('telemedicine.welcome')}</p>
      </div>
    </div>
  );
};

export default ExemploTraduzido;
```

## 🎯 Dicas Importantes

1. **Sempre use chaves descritivas**: `dashboard.title` ao invés de `dt`
2. **Agrupe por contexto**: `nav.*`, `common.*`, `telemedicine.*`
3. **Mantenha consistência**: Use o mesmo padrão em todos os idiomas
4. **Teste todos os idiomas**: Verifique se todas as traduções estão corretas
5. **Use o contexto global**: Importe `useGlobalTranslation` em qualquer componente

## 🚀 Status Atual

✅ **Navbar** - Totalmente traduzido
✅ **TelemedicineModal** - Totalmente traduzido  
✅ **Dashboard** - Exemplo implementado
✅ **Bandeiras clicáveis** - Funcionais
✅ **Persistência** - LocalStorage
✅ **4 idiomas** - PT, EN, ES, FR

Para traduzir qualquer página ou componente, basta importar `useGlobalTranslation` e usar `t('chave.da.traducao')`!
