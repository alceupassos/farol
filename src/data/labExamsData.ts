
import { LabExam } from '@/components/labexams/types';

export const sampleLabExams: LabExam[] = [
  {
    id: "1",
    name: "Hemograma Completo",
    date: "24/05/2022",
    category: "Hematologia",
    provider: "Laboratório Flor",
    doctor: "Dr. Alexander Marques Cabral",
    status: "warning",
    scanned: true,
    verified: true,
    imageUrl: "/lovable-uploads/f4731860-a224-4e16-b81d-315aed901499.png",
    groups: [
      {
        name: "Eritrograma",
        parameters: [
          {
            name: "Hemácias",
            value: 4.35,
            unit: "milhões/mm³",
            referenceRange: "4,00 a 5,50 milhões/mm³",
            status: "normal",
            description: "Células vermelhas do sangue"
          },
          {
            name: "Hemoglobina",
            value: 11.3,
            unit: "g/dL",
            referenceRange: "12,0 a 16,0 g/dL",
            status: "warning",
            description: "Proteína que transporta oxigênio",
            trend: "down"
          },
          {
            name: "Hematócrito",
            value: 35.3,
            unit: "%",
            referenceRange: "37,0 a 47,0 %",
            status: "warning",
            description: "Percentual de células vermelhas no sangue"
          },
          {
            name: "VCM",
            value: 81.15,
            unit: "fL",
            referenceRange: "82,00 a 92,00 fL",
            status: "warning",
            description: "Volume Corpuscular Médio"
          },
          {
            name: "HCM",
            value: 29.98,
            unit: "pg",
            referenceRange: "27,00 a 34,00 pg",
            status: "normal",
            description: "Hemoglobina Corpuscular Média"
          },
          {
            name: "CHCM",
            value: 32.01,
            unit: "g/dL",
            referenceRange: "32,00 a 36,00 g/dL",
            status: "normal",
            description: "Concentração de Hemoglobina Corpuscular Média"
          },
          {
            name: "RDW",
            value: 14.0,
            unit: "%",
            referenceRange: "11,0 a 15,1 %",
            status: "normal",
            description: "Amplitude de Distribuição dos Glóbulos Vermelhos"
          }
        ]
      },
      {
        name: "Leucograma",
        parameters: [
          {
            name: "Leucócitos",
            value: 7.700,
            unit: "/mm³",
            referenceRange: "4.500 a 10.000 /mm³",
            status: "normal",
            description: "Células brancas do sangue"
          },
          {
            name: "Mielócitos",
            value: 0.0,
            unit: "%",
            referenceRange: "0 /mm³",
            status: "normal"
          },
          {
            name: "Metamielócitos",
            value: 0.0,
            unit: "%",
            referenceRange: "0 a 100 /mm³",
            status: "normal"
          },
          {
            name: "Bastonetes",
            value: 3.0,
            unit: "%",
            referenceRange: "0 a 500 /mm³",
            status: "normal"
          },
          {
            name: "Segmentados",
            value: 48.0,
            unit: "%",
            referenceRange: "2.250 a 6.000 /mm³",
            status: "normal"
          },
          {
            name: "Eosinófilos",
            value: 8.0,
            unit: "%",
            referenceRange: "45 a 400 /mm³",
            status: "normal"
          },
          {
            name: "Basófilos",
            value: 0.0,
            unit: "%",
            referenceRange: "0 a 100 /mm³",
            status: "normal"
          },
          {
            name: "Monócitos",
            value: 4.0,
            unit: "%",
            referenceRange: "90 a 800 /mm³",
            status: "normal"
          },
          {
            name: "Linfócitos",
            value: 37.0,
            unit: "%",
            referenceRange: "900 a 3.300 /mm³",
            status: "normal"
          }
        ]
      },
      {
        name: "Plaquetograma",
        parameters: [
          {
            name: "Plaquetas",
            value: 202.000,
            unit: "/mm³",
            referenceRange: "150.000 a 400.000 /mm³",
            status: "normal",
            description: "Células responsáveis pela coagulação"
          }
        ]
      }
    ]
  },
  {
    id: "2",
    name: "Colesterol e Triglicerídeos",
    date: "12/04/2022",
    category: "Bioquímica",
    provider: "Laboratório Central",
    doctor: "Dra. Maria Souza",
    status: "normal",
    scanned: false,
    verified: true,
    groups: [
      {
        name: "Perfil Lipídico",
        parameters: [
          {
            name: "Colesterol Total",
            value: 185,
            unit: "mg/dL",
            referenceRange: "< 200 mg/dL",
            status: "normal"
          },
          {
            name: "HDL",
            value: 55,
            unit: "mg/dL",
            referenceRange: "> 40 mg/dL",
            status: "normal"
          },
          {
            name: "LDL",
            value: 115,
            unit: "mg/dL",
            referenceRange: "< 130 mg/dL",
            status: "normal"
          },
          {
            name: "Triglicerídeos",
            value: 120,
            unit: "mg/dL",
            referenceRange: "< 150 mg/dL",
            status: "normal"
          }
        ]
      }
    ]
  },
  {
    id: "3",
    name: "Glicemia de Jejum",
    date: "15/03/2022",
    category: "Bioquímica",
    provider: "Laboratório Flor",
    doctor: "Dr. Carlos Eduardo",
    status: "critical",
    scanned: false,
    verified: true,
    groups: [
      {
        name: "Glicemia",
        parameters: [
          {
            name: "Glicose",
            value: 142,
            unit: "mg/dL",
            referenceRange: "70 a 99 mg/dL",
            status: "critical",
            trend: "up"
          }
        ]
      }
    ]
  },
  {
    id: "4",
    name: "TSH e T4 Livre",
    date: "22/02/2022",
    category: "Hormônios",
    provider: "Laboratório Análises Clínicas",
    doctor: "Dra. Paula Mendes",
    status: "normal",
    scanned: false,
    verified: true,
    groups: [
      {
        name: "Função Tireoidiana",
        parameters: [
          {
            name: "TSH",
            value: 2.35,
            unit: "µUI/mL",
            referenceRange: "0,4 a 4,0 µUI/mL",
            status: "normal"
          },
          {
            name: "T4 Livre",
            value: 1.2,
            unit: "ng/dL",
            referenceRange: "0,8 a 1,8 ng/dL",
            status: "normal"
          }
        ]
      }
    ]
  }
];

// Function to generate a sample hemogram (simulating OCR result)
export const processSampleHemogram = (): LabExam => {
  return {
    id: new Date().getTime().toString(),
    name: "Hemograma Completo",
    date: "24/05/2022",
    category: "Hematologia",
    provider: "Laboratório Flor",
    doctor: "Dr. Alexander Marques Cabral",
    status: "warning",
    scanned: true,
    verified: true,
    imageUrl: "/lovable-uploads/f4731860-a224-4e16-b81d-315aed901499.png",
    groups: [
      {
        name: "Eritrograma",
        parameters: [
          {
            name: "Hemácias",
            value: 4.35,
            unit: "milhões/mm³",
            referenceRange: "4,00 a 5,50 milhões/mm³",
            status: "normal",
            description: "Células vermelhas do sangue"
          },
          {
            name: "Hemoglobina",
            value: 11.3,
            unit: "g/dL",
            referenceRange: "12,0 a 16,0 g/dL",
            status: "warning",
            description: "Proteína que transporta oxigênio",
            trend: "down"
          },
          {
            name: "Hematócrito",
            value: 35.3,
            unit: "%",
            referenceRange: "37,0 a 47,0 %",
            status: "warning",
            description: "Percentual de células vermelhas no sangue"
          },
          {
            name: "VCM",
            value: 81.15,
            unit: "fL",
            referenceRange: "82,00 a 92,00 fL",
            status: "warning",
            description: "Volume Corpuscular Médio"
          },
          {
            name: "HCM",
            value: 29.98,
            unit: "pg",
            referenceRange: "27,00 a 34,00 pg",
            status: "normal",
            description: "Hemoglobina Corpuscular Média"
          },
          {
            name: "CHCM",
            value: 32.01,
            unit: "g/dL",
            referenceRange: "32,00 a 36,00 g/dL",
            status: "normal",
            description: "Concentração de Hemoglobina Corpuscular Média"
          },
          {
            name: "RDW",
            value: 14.0,
            unit: "%",
            referenceRange: "11,0 a 15,1 %",
            status: "normal",
            description: "Amplitude de Distribuição dos Glóbulos Vermelhos"
          }
        ]
      },
      {
        name: "Leucograma",
        parameters: [
          {
            name: "Leucócitos",
            value: 7.700,
            unit: "/mm³",
            referenceRange: "4.500 a 10.000 /mm³",
            status: "normal",
            description: "Células brancas do sangue"
          },
          {
            name: "Bastonetes",
            value: 3.0,
            unit: "%",
            referenceRange: "0 a 500 /mm³",
            status: "normal"
          },
          {
            name: "Segmentados",
            value: 48.0,
            unit: "%",
            referenceRange: "2.250 a 6.000 /mm³",
            status: "normal"
          },
          {
            name: "Eosinófilos",
            value: 8.0,
            unit: "%",
            referenceRange: "45 a 400 /mm³",
            status: "normal"
          },
          {
            name: "Monócitos",
            value: 4.0,
            unit: "%",
            referenceRange: "90 a 800 /mm³",
            status: "normal"
          },
          {
            name: "Linfócitos",
            value: 37.0,
            unit: "%",
            referenceRange: "900 a 3.300 /mm³",
            status: "normal"
          }
        ]
      },
      {
        name: "Plaquetograma",
        parameters: [
          {
            name: "Plaquetas",
            value: 202.000,
            unit: "/mm³",
            referenceRange: "150.000 a 400.000 /mm³",
            status: "normal",
            description: "Células responsáveis pela coagulação"
          }
        ]
      }
    ]
  };
};
