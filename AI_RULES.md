# Regras de Desenvolvimento e Tech Stack

Este documento descreve a stack tecnológica utilizada no projeto e as regras para o uso de bibliotecas, visando manter a consistência, performance e manutenibilidade do código.

## Tech Stack

*   **React**: Biblioteca principal para construção da interface de usuário.
*   **TypeScript**: Linguagem de programação para tipagem estática e melhor robustez do código.
*   **Vite**: Ferramenta de build rápida para desenvolvimento e otimização de produção.
*   **Tailwind CSS**: Framework CSS utilitário para estilização rápida e responsiva.
*   **shadcn/ui**: Coleção de componentes de UI reutilizáveis e acessíveis, construídos com Radix UI e estilizados com Tailwind CSS.
*   **React Router DOM**: Biblioteca para gerenciamento de rotas e navegação na aplicação.
*   **Supabase**: Backend-as-a-Service (BaaS) para autenticação, banco de dados (PostgreSQL), armazenamento de arquivos e Edge Functions.
*   **TanStack Query (React Query)**: Biblioteca para gerenciamento de estado do servidor, caching e sincronização de dados.
*   **Lucide React**: Biblioteca de ícones leves e personalizáveis.
*   **Recharts**: Biblioteca para criação de gráficos e visualização de dados.
*   **date-fns**: Biblioteca para manipulação e formatação de datas.
*   **Sonner**: Biblioteca para notificações (toasts) amigáveis e acessíveis.
*   **Mapbox GL JS**: Biblioteca para renderização de mapas interativos.

## Regras de Uso de Bibliotecas

Para garantir a consistência e a qualidade do código, siga as seguintes diretrizes:

*   **Componentes de UI**:
    *   Sempre utilize os componentes da biblioteca `shadcn/ui`.
    *   Se um componente específico não estiver disponível ou precisar de personalização, crie um novo componente que envolva ou estenda os primitivos do `shadcn/ui`. **Nunca modifique os arquivos originais do `shadcn/ui` diretamente.**
*   **Estilização**:
    *   Utilize exclusivamente o **Tailwind CSS** para toda a estilização.
    *   Evite estilos inline ou arquivos CSS personalizados, a menos que seja estritamente necessário para casos muito específicos e não compatíveis com o Tailwind (o que deve ser raro).
*   **Gerenciamento de Estado**:
    *   Para estado do servidor (data fetching, caching, sincronização), utilize **TanStack Query**.
    *   Para estado local de componentes, utilize `useState` e `useReducer` do React.
    *   Para estado global do cliente (como autenticação, idioma, acesso ao site), utilize a **React Context API**.
*   **Navegação**:
    *   Utilize `react-router-dom` para todas as rotas e navegação no lado do cliente.
    *   Mantenha a definição das rotas centralizada em `src/App.tsx`.
*   **Interação com Backend**:
    *   Utilize o cliente `supabase` (`@supabase/supabase-js`) para todas as interações com os serviços Supabase (autenticação, banco de dados, armazenamento, Edge Functions).
*   **Ícones**:
    *   Utilize `lucide-react` para todos os ícones na aplicação.
*   **Gráficos**:
    *   Utilize `recharts` para todas as visualizações de dados em formato de gráfico.
*   **Manipulação de Datas**:
    *   Utilize `date-fns` para todas as operações de manipulação, formatação e comparação de datas e horas.
*   **Notificações (Toasts)**:
    *   Utilize `sonner` para exibir mensagens de notificação ao usuário.
*   **Mapas**:
    *   Utilize `mapbox-gl` para implementar funcionalidades de mapa.
*   **Autenticação e Segurança**:
    *   A autenticação de usuários é gerenciada pelo Supabase.
*   Para funcionalidades de 2FA e geração de QR codes, utilize `otplib` e `crypto-js` conforme demonstrado nas Edge Functions (`supabase/functions/secure-totp`, `supabase/functions/site-access-admin`).
*   **Estrutura de Arquivos**:
    *   `src/pages/`: Para as views/páginas de nível superior.
    *   `src/components/`: Para componentes de UI reutilizáveis.
    *   `src/contexts/`: Para provedores de contexto do React.
    *   `src/hooks/`: Para hooks personalizados do React.
    *   `src/utils/`: Para funções utilitárias.
    *   `src/data/`: Para dados mock ou dados estáticos.
    *   `src/integrations/supabase/`: Para o cliente e tipos do Supabase.
