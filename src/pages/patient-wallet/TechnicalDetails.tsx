
import MainLayout from '@/components/layout/MainLayout';
import TechnicalDetailsHeader from '@/components/technical-details/TechnicalDetailsHeader';
import FrontendDetailsCard from '@/components/technical-details/FrontendDetailsCard';
import BackendDetailsCard from '@/components/technical-details/BackendDetailsCard';

const TechnicalDetailsPage = () => {
  const frontendDescription = `A aplicação frontend é construída utilizando React com TypeScript, aproveitando o Vite para um desenvolvimento rápido e eficiente. A estilização é gerenciada com Tailwind CSS e componentes pré-construídos da biblioteca shadcn/ui, garantindo uma interface de usuário moderna e responsiva. O gerenciamento de estado global é facilitado pelo React Context API para temas e internacionalização (i18n), enquanto o TanStack Query (React Query) é empregado para data fetching, caching e sincronização de estado com o backend. A navegação é tratada pelo React Router DOM. A estrutura do projeto segue uma organização modular com componentes reutilizáveis e páginas dedicadas para cada funcionalidade principal.`;

  const backendDescription = `
Arquitetura Técnica do Backend - Carteira Digital de Saúde

Visão Geral da Arquitetura
O sistema backend é construído sobre uma arquitetura blockchain híbrida que combina tecnologias empresariais e públicas para criar uma solução segura, escalável e interoperável para gestão de dados de saúde.

Stack Tecnológico Principal

Core Blockchain Infrastructure
Hyperledger Fabric
•	Função: Blockchain principal para dados sensíveis de saúde
•	Características: 
o	Rede permissionada com controle de acesso baseado em identidade
o	Canais privados para segregação de dados por especialidade médica
o	Consenso PBFT (Practical Byzantine Fault Tolerance)
o	Suporte a Smart Contracts via Chaincode
•	Vantagens: Zero fees, alta performance, privacidade nativa

Kaleido (Ambiente de Desenvolvimento)
•	Função: Plataforma BaaS para prototipagem e desenvolvimento inicial
•	Uso: Ambiente de staging e testes antes da migração para Hyperledger
•	Transição: Migração planejada para infraestrutura Hyperledger própria

Camada de Dados
CouchDB (World State Database)
•	Função: Armazenamento de estado atual dos registros médicos
•	Estrutura: 
{  "patientId": "uuid",  "recordType": "consultation|exam|prescription|treatment",  "timestamp": "ISO8601",  "authorizedProviders": ["providerId1", "providerId2"],  "dataHash": "sha256_hash",  "encryptionKey": "encrypted_key"}
•	Características: 
o	Consultas rich queries com MapReduce
o	Indexação automática por campos médicos
o	Suporte a documentos JSON complexos

IPFS (InterPlanetary File System)
•	Função: Armazenamento distribuído de arquivos médicos grandes
•	Uso: Imagens de exames, documentos PDF, arquivos DICOM
•	Integração: Hashes IPFS armazenados no ledger do Hyperledger

Smart Contracts e Lógica de Negócio
Chaincode (Hyperledger Fabric)
// Exemplo de estrutura do Chaincode em Go
type HealthRecord struct {
    ID              string    \`json:"id"\`
    PatientID       string    \`json:"patientId"\`
    ProviderID      string    \`json:"providerId"\`
    RecordType      string    \`json:"recordType"\`
    Timestamp       time.Time \`json:"timestamp"\`
    DataHash        string    \`json:"dataHash"\`
    AccessLevel     string    \`json:"accessLevel"\`
    EncryptedData   string    \`json:"encryptedData"\`
}

Solidity Smart Contracts (Componente Público)
•	Função: Gerenciamento de identidades e certificações
•	Uso: Registro de provedores médicos, validação de credenciais
•	Deploy: Redes Ethereum compatíveis via Tatum SDK

MasterToken (ERC-20)
•	Repositório: https://github.com/thomasdev5832/master-token
•	Função: Token utilitário para transações e incentivos no ecossistema
•	Casos de Uso: 
o	Pagamento de taxas de transação na rede
o	Incentivos para provedores de saúde
o	Recompensas por compartilhamento de dados (com consentimento)
o	Governança descentralizada do protocolo

Camada de Segurança
Rust Security Modules
•	Função: Módulos críticos de criptografia e gestão de chaves
•	Componentes: 
o	Key Management System (KMS)
o	Encryption/Decryption services
o	Digital signature validation
o	Zero-knowledge proof implementations

Controle de Acesso Baseado em Atributos (ABAC)
# Exemplo de política de acesso
policies:
  - name: "cardiologist_access"
    subjects: ["role:cardiologist"]
    resources: ["patient:*/records/cardiology/*"]
    actions: ["read", "write"]
    conditions: 
      - "patient.authorized_providers contains subject.id"
      - "timestamp within patient.consent_period"

Arquitetura de Rede
Organização da Rede Hyperledger
Organizações Participantes
•	Hospitals: Nós completos com capacidade de validação
•	Clinics: Nós de consulta com acesso limitado
•	Laboratories: Nós especializados para dados de exames
•	Insurance: Nós de auditoria somente leitura
•	Patients: Clientes leves via mobile/web apps

Canais (Channels)
├── general-health-channel
│   ├── basic-consultations
│   └── general-practitioners
├── specialist-channels
│   ├── cardiology-channel
│   ├── oncology-channel
│   └── radiology-channel
└── emergency-channel
    └── critical-access-only

APIs e Integrações
RESTful API Gateway
// Estrutura da API
/api/v1/
├── /patients
│   ├── /{id}/records
│   ├── /{id}/permissions
│   └── /{id}/audit-trail
├── /providers
│   ├── /{id}/patients
│   └── /{id}/credentials
├── /records
│   ├── /create
│   ├── /query
│   └── /update
├── /tokens
│   ├── /balance
│   ├── /transfer
│   └── /rewards
└── /auth
    ├── /login
    └── /permissions

Tatum SDK Integration
•	Função: Abstração para múltiplas blockchains
•	Uso: Interoperabilidade com sistemas legados e integração com MasterToken
•	Benefícios: Simplified deployment, multi-chain support, token operations

MasterToken Integration
•	Smart Contract: ERC-20 implementado no repositório oficial
•	Operações: Transfer, balance queries, reward distribution
•	Gas Optimization: Batch operations para reduzir custos

Infraestrutura de Desenvolvimento
Foundry Toolkit
// Exemplo de teste automatizado
contract HealthRecordTest is Test {
    function testAuthorizedAccess() public {
        // Setup patient and provider
        // Test access control logic
        // Verify audit trail
    }
    
    function testMasterTokenIntegration() public {
        // Test token rewards for data sharing
        // Verify transaction fees payment
        // Test governance token distribution
    }
}
Componentes:
•	Forge: Compilação e teste de smart contracts (incluindo MasterToken)
•	Cast: Interação com contratos via CLI
•	Anvil: Node local para desenvolvimento
•	MasterToken Repository: https://github.com/thomasdev5832/master-token

DevOps e Deployment
Containerização (Docker)
# docker-compose.yml structure
services:
  fabric-peer:
    image: hyperledger/fabric-peer:2.4
    environment:
      - CORE_PEER_ID=peer0.hospital1.health.network
      
  couchdb:
    image: couchdb:3.2
    environment:
      - COUCHDB_USER=admin
      
  api-gateway:
    build: ./api-gateway
    depends_on: [fabric-peer, couchdb]

CI/CD Pipeline
•	Testing: Automated Chaincode testing via Foundry
•	Security: Static analysis com ferramentas Rust
•	Deployment: Blue-green deployment strategy

Fluxo de Dados Técnico
Registro de Novo Dado Médico
1.	Authentication: Provider autentica via PKI certificates
2.	Authorization: ABAC verifica permissões do provider
3.	Encryption: Dados sensíveis criptografados em Rust module
4.	Chaincode Invocation: Transação submetida ao Fabric network
5.	Consensus: Validação pelos peers da organização
6.	State Update: CouchDB atualizado com novo registro
7.	Event Emission: Notificação para sistemas interessados

Consulta de Dados
1.	Patient Authentication: Multi-factor authentication
2.	Query Execution: Rich query no CouchDB via Chaincode
3.	Access Control: Verificação de permissões por registro
4.	Decryption: Descriptografia seletiva dos dados autorizados
5.	Audit Logging: Registro da consulta no ledger imutável

Monitoramento e Observabilidade
Métricas de Performance
•	Latência de transações (< 2s target)
•	Throughput (1000+ TPS per channel)
•	Storage growth rate
•	Network consensus time

Logging e Auditoria
•	Immutable audit trail no ledger
•	Real-time monitoring via Hyperledger Explorer
•	Compliance reporting automatizado
•	Security event correlation

Considerações de Escalabilidade
Horizontal Scaling
•	Sharding por região geográfica
•	Channel partitioning por especialidade
•	Load balancing entre peers

Performance Optimization
•	CouchDB indexing estratégico
•	Chaincode optimization
•	Batching de transações não-críticas
•	Caching layer para consultas frequentes

Segurança e Compliance
Padrões Implementados
•	HIPAA compliance
•	GDPR/LGPD data protection
•	HL7 FHIR interoperability
•	PKI-based identity management

Criptografia
•	AES-256 para dados em repouso
•	TLS 1.3 para dados em trânsito
•	Elliptic curve signatures (secp256k1)
•	Zero-knowledge proofs para privacy preserving queries
`;

  return (
    <MainLayout>
      <div className="space-y-6">
        <TechnicalDetailsHeader />
        <FrontendDetailsCard description={frontendDescription} />
        <BackendDetailsCard description={backendDescription} />
      </div>
    </MainLayout>
  );
};

export default TechnicalDetailsPage;
