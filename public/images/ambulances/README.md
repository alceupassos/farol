# Imagens das Ambulâncias - Sistema Farol APH

## 📋 Instruções para Substituição das Imagens

Este diretório contém as imagens das ambulâncias utilizadas no sistema APH (Atendimento Pré-Hospitalar).

### 🖼️ Imagens a Substituir:

1. **ambulance-exterior-1.jpg** - Imagem externa da ambulância
   - Substituir pela primeira imagem fornecida (exterior da ambulância)
   - Dimensões recomendadas: 800x600px
   - Formato: JPG ou PNG

2. **ambulance-interior-1.jpg** - Interior da ambulância (equipamentos)
   - Substituir pela segunda imagem fornecida (interior com equipamentos)
   - Dimensões recomendadas: 800x600px
   - Formato: JPG ou PNG

3. **ambulance-interior-2.jpg** - Interior com equipe médica
   - Substituir pela terceira imagem fornecida (equipe atendendo paciente)
   - Dimensões recomendadas: 800x600px
   - Formato: JPG ou PNG

4. **ambulance-interior-3.jpg** - Interior moderno
   - Substituir pela quarta imagem fornecida (interior moderno)
   - Dimensões recomendadas: 800x600px
   - Formato: JPG ou PNG

5. **ambulance-interior-4.jpg** - Equipe trabalhando
   - Substituir pela quinta imagem fornecida (equipe trabalhando)
   - Dimensões recomendadas: 800x600px
   - Formato: JPG ou PNG

### 🔧 Como Substituir:

1. Salve as imagens fornecidas pelo usuário com os nomes exatos listados acima
2. Substitua os arquivos placeholder neste diretório
3. Mantenha os mesmos nomes de arquivo para que o sistema continue funcionando
4. As imagens serão exibidas automaticamente no:
   - Cockpit da ambulância (painel lateral direito)
   - Galeria da frota (seção inferior do mapa)

### 📍 Onde as Imagens Aparecem:

- **Mapa GPS Ambulâncias** (`/aph-mapa-ambulancias`)
  - Cockpit da ambulância selecionada
  - Galeria da frota com todas as ambulâncias
  - Clique nas imagens da galeria para selecionar a ambulância

### 🎯 Funcionalidades:

- **Interatividade:** Clique nas imagens da galeria para ver detalhes da ambulância
- **Responsividade:** Imagens se adaptam a diferentes tamanhos de tela
- **Fallback:** Se uma imagem não carregar, ela será ocultada automaticamente
- **Status Visual:** Badges coloridos indicam o status de cada ambulância

### 🚀 Após a Substituição:

1. Execute `npm run build` para recompilar
2. Execute `npm run dev` para testar
3. Acesse `/aph-mapa-ambulancias` para ver as novas imagens
4. Teste a interatividade clicando nas ambulâncias no mapa e na galeria

---

**Nota:** As imagens atuais são placeholders de texto. Substitua-as pelas imagens reais das ambulâncias fornecidas pelo usuário para uma experiência visual completa.
