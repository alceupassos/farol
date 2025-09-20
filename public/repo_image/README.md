# Repositório de Imagens - Sistema de Saúde Pública

Este diretório contém as imagens utilizadas no sistema de saúde pública.

## Imagens Disponíveis:

### 1. laboratory-dashboard.png
- **Descrição**: Dashboard de operações laboratoriais
- **Conteúdo**: RNDS Exam Status Heatmap, TAT Performance (92%), Daily Sample Throughput (1.250/1.500), Cold Chain Logistics Tracker
- **Dimensões**: Interface completa de laboratório
- **Uso**: Gestão de operações laboratoriais, monitoramento RNDS

### 2. revenue-growth-dashboard.png
- **Descrição**: Dashboard de crescimento de receita trimestral
- **Conteúdo**: Q3 2023: +18.5% growth, gráficos comparativos de Software, Hardware e Serviços
- **Dimensões**: Análise financeira detalhada
- **Uso**: Relatórios executivos, análise de performance financeira

### 3. health-network-global.png
- **Descrição**: Rede global de saúde conectada
- **Conteúdo**: Visualização futurística com IA, hospitais, médicos e pacientes interconectados
- **Dimensões**: Conceito de telemedicina global
- **Uso**: Apresentações, marketing, visão estratégica

### 4. data-analytics-illustration.png
- **Descrição**: Ilustração de análise de dados em saúde
- **Conteúdo**: Profissional interagindo com gráficos e dashboards analíticos
- **Dimensões**: Representação moderna de BI
- **Uso**: Interfaces de business intelligence, relatórios

### 5. radiology-dashboard.png
- **Descrição**: Dashboard de radiologia com IA
- **Conteúdo**: Análise de tomografia cerebral, Jane Doe, confidence score 98%, AI diagnosis: suspected glioma
- **Dimensões**: Interface médica especializada
- **Uso**: Sistema de diagnóstico por imagem, telemedicina

### 6. laboratory-operations-dashboard-real.png ⭐ NOVO
- **Descrição**: Dashboard real de operações laboratoriais
- **Conteúdo**: RNDS Exam Status Heatmap detalhado, TAT Performance 92%, Daily Sample Throughput 1.250/1.500, Cold Chain Logistics Tracker, Resource Utilization
- **Dimensões**: Interface operacional completa em ambiente real
- **Uso**: Gestão operacional laboratorial, monitoramento RNDS em tempo real, cold chain tracking

### 7. quarterly-revenue-growth-real.png ⭐ NOVO
- **Descrição**: Dashboard real de crescimento de receita trimestral
- **Conteúdo**: Q3 2023: +18.5% growth em ambiente de trabalho profissional, análise detalhada por segmento
- **Dimensões**: Análise financeira em contexto empresarial
- **Uso**: Relatórios executivos trimestrais, apresentações para stakeholders, análise de performance

### 8. health-ecosystem-network.png ⭐ NOVO
- **Descrição**: Ecossistema de saúde conectado
- **Conteúdo**: Visualização futurística avançada com IA, hospitais, médicos e pacientes em rede neural
- **Dimensões**: Conceito de ecossistema de saúde global
- **Uso**: Apresentações estratégicas, marketing de telemedicina, visão de futuro da saúde

### 9. business-intelligence-health.png ⭐ NOVO
- **Descrição**: Business Intelligence em saúde
- **Conteúdo**: Profissional de saúde interagindo com dashboards de BI e dados em tempo real
- **Dimensões**: Representação moderna de BI em saúde
- **Uso**: Interfaces de BI em saúde, dashboards analíticos, relatórios gerenciais

### 10. radiology-ai-dashboard.png ⭐ NOVO
- **Descrição**: Dashboard profissional de radiologia com IA
- **Conteúdo**: Interface completa com análise de tomografia cerebral, histórico do paciente Jane Doe, ferramentas de segmentação, diagnóstico de glioma com 98% de confiança
- **Dimensões**: Interface médica especializada profissional
- **Uso**: Sistemas de diagnóstico por imagem, interfaces de radiologia, IA médica para diagnóstico

## Estrutura do Repositório:
```
public/repo_image/
├── README.md                                    # Este arquivo
├── laboratory-dashboard.png                     # Dashboard laboratorial (conceitual)
├── revenue-growth-dashboard.png                 # Crescimento de receita (conceitual)
├── health-network-global.png                   # Rede global de saúde (conceitual)
├── data-analytics-illustration.png             # Ilustração de analytics (conceitual)
├── radiology-dashboard.png                     # Dashboard de radiologia (conceitual)
├── laboratory-operations-dashboard-real.png    # Dashboard laboratorial (real) ⭐
├── quarterly-revenue-growth-real.png           # Crescimento receita (real) ⭐
├── health-ecosystem-network.png                # Ecossistema saúde (avançado) ⭐
├── business-intelligence-health.png            # BI em saúde (moderno) ⭐
└── radiology-ai-dashboard.png                  # Radiologia IA (profissional) ⭐
```

## Categorização por Uso:

### 📊 **Área Laboratorial (2 imagens):**
- `laboratory-dashboard.png`: Versão conceitual
- `laboratory-operations-dashboard-real.png`: Versão real/operacional ⭐

### 💰 **Área Financeira (2 imagens):**
- `revenue-growth-dashboard.png`: Versão conceitual
- `quarterly-revenue-growth-real.png`: Versão real/empresarial ⭐

### 🌐 **Área Conceitual (4 imagens):**
- `health-network-global.png`: Rede global básica
- `data-analytics-illustration.png`: Analytics básico
- `health-ecosystem-network.png`: Ecossistema avançado ⭐
- `business-intelligence-health.png`: BI moderno ⭐

### 🏥 **Área Médica (2 imagens):**
- `radiology-dashboard.png`: Versão conceitual
- `radiology-ai-dashboard.png`: Versão profissional ⭐

## Como Usar no Sistema:

### 1. Importação em React/TypeScript:
```typescript
// Imagens originais
import laboratoryDashboard from '/repo_image/laboratory-dashboard.png';
import revenueGrowth from '/repo_image/revenue-growth-dashboard.png';
import healthNetwork from '/repo_image/health-network-global.png';
import dataAnalytics from '/repo_image/data-analytics-illustration.png';
import radiologyDashboard from '/repo_image/radiology-dashboard.png';

// Novas imagens ⭐
import labOperationsReal from '/repo_image/laboratory-operations-dashboard-real.png';
import quarterlyRevenueReal from '/repo_image/quarterly-revenue-growth-real.png';
import healthEcosystem from '/repo_image/health-ecosystem-network.png';
import businessIntelligence from '/repo_image/business-intelligence-health.png';
import radiologyAI from '/repo_image/radiology-ai-dashboard.png';

// Uso em componentes
<img src={labOperationsReal} alt="Laboratory Operations Dashboard" />
<img src={radiologyAI} alt="Radiology AI Dashboard" />
```

### 2. Referência direta em HTML:
```html
<!-- Imagens originais -->
<img src="/repo_image/laboratory-dashboard.png" alt="Laboratory Dashboard" />
<img src="/repo_image/revenue-growth-dashboard.png" alt="Revenue Growth" />

<!-- Novas imagens ⭐ -->
<img src="/repo_image/laboratory-operations-dashboard-real.png" alt="Lab Operations Real" />
<img src="/repo_image/quarterly-revenue-growth-real.png" alt="Quarterly Revenue Real" />
<img src="/repo_image/health-ecosystem-network.png" alt="Health Ecosystem" />
<img src="/repo_image/business-intelligence-health.png" alt="BI Health" />
<img src="/repo_image/radiology-ai-dashboard.png" alt="Radiology AI" />
```

### 3. Uso em CSS/Tailwind:
```css
/* Versões conceituais */
.bg-laboratory { background-image: url('/repo_image/laboratory-dashboard.png'); }
.bg-revenue { background-image: url('/repo_image/revenue-growth-dashboard.png'); }

/* Versões reais/profissionais ⭐ */
.bg-lab-real { background-image: url('/repo_image/laboratory-operations-dashboard-real.png'); }
.bg-revenue-real { background-image: url('/repo_image/quarterly-revenue-growth-real.png'); }
.bg-health-ecosystem { background-image: url('/repo_image/health-ecosystem-network.png'); }
.bg-bi-health { background-image: url('/repo_image/business-intelligence-health.png'); }
.bg-radiology-ai { background-image: url('/repo_image/radiology-ai-dashboard.png'); }
```

## Recomendações de Uso:

### 🎯 **Para Apresentações Executivas:**
- `quarterly-revenue-growth-real.png` (ambiente empresarial)
- `health-ecosystem-network.png` (visão estratégica)

### 🏥 **Para Sistemas Médicos:**
- `radiology-ai-dashboard.png` (interface profissional)
- `laboratory-operations-dashboard-real.png` (operações reais)

### 📊 **Para Dashboards de BI:**
- `business-intelligence-health.png` (BI moderno)
- `data-analytics-illustration.png` (analytics conceitual)

### 🌐 **Para Marketing/Conceitual:**
- `health-network-global.png` (rede básica)
- `health-ecosystem-network.png` (ecossistema avançado)

## Integração com o Sistema:

Estas imagens podem ser utilizadas em:
- **Dashboards**: Como backgrounds ou elementos visuais
- **Landing pages**: Para ilustrar funcionalidades
- **Apresentações**: Em slides e demonstrações
- **Documentação**: Como exemplos visuais
- **Marketing**: Em materiais promocionais
- **Interfaces profissionais**: Versões reais para produção

## Licença e Uso:
Imagens destinadas exclusivamente para uso no Sistema de Saúde Pública.
Não redistribuir sem autorização.

---
*Criado em: 20/01/2025*
*Última atualização: 20/01/2025 - Adicionadas 5 novas imagens ⭐*
*Total: 10 imagens em 4 categorias*
