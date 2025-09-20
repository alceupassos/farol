# 🌐 Guia de Internacionalização (i18n)

## Como traduzir componentes
1. Importe o hook do `react-i18next`:
   ```tsx
   import { useTranslation } from 'react-i18next';
   ```
2. Use `t` para ler as chaves definidas em `translation.json`:
   ```tsx
   const Example = () => {
     const { t } = useTranslation();

     return (
       <section>
         <h1>{t('dashboard.title')}</h1>
         <p>{t('dashboard.overview')}</p>
         <button>{t('common.save')}</button>
       </section>
     );
   };
   ```
3. Para listas ou objetos completos, utilize `returnObjects: true`:
   ```tsx
   const highlights = t('landing.hero.highlights', { returnObjects: true }) as Array<{ label: string; value: string }>;
   ```

## Estrutura de chaves disponível
- `nav.*`: itens de navegação/placeholder de busca
- `common.*`: botões e mensagens genéricas
- `navbar.*`: textos específicos da barra superior (ex.: botão de telemedicina, papéis do usuário)
- `telemedicine.*`: rótulos usados nos fluxos de telemedicina
- Outros módulos seguem o mesmo padrão (`dashboard.*`, `patients.*`, etc.)

## Onde editar traduções
1. Cada idioma possui um arquivo em `src/locales/<lang>/translation.json` (`pt`, `en`, `es`, `fr`).
2. Sempre adicione a nova chave em todos os idiomas.
3. Mantenha a mesma estrutura/ordem para facilitar revisões (`nav`, depois `common`, `navbar`, ...).
4. Após editar, execute `npm run dev` ou `npm run build` para garantir que o JSON continua válido.

## Troca de idioma
- O arquivo `src/i18n.ts` inicializa o i18next com as traduções estáticas.
- O componente `LanguageSwitcher` (`src/components/common/LanguageSwitcher.tsx`) usa `i18n.changeLanguage` para alternar entre `pt`, `en`, `es`, `fr`.
- Para trocar manualmente dentro de um componente você pode chamar `const { i18n } = useTranslation();` e executar `void i18n.changeLanguage('en');`.

## Boas práticas
- Prefira chaves descritivas (`navbar.roles.manager`) ao invés de abreviações.
- Agrupe chaves por contexto lógico para evitar colisões.
- Reaproveite chaves existentes antes de criar novas.
- Revise cada idioma após alterações para garantir que não ficaram termos em português.

## Status atual
- `LanguageSwitcher` integrado ao `react-i18next`.
- `Navbar` utiliza apenas chaves do dicionário e exibe nomes de papéis traduzidos.
- Dicionário atualizado com nomes dos idiomas e mensagens de logout.

Próximos passos recomendados: migrar strings fixas dos módulos restantes (`Sidebar`, landing pages e dashboards específicos) para o dicionário central.
