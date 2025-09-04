import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.0';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DocumentAnalysisRequest {
  ocrText: string;
  documentType: 'exam' | 'prescription' | 'medical_record' | 'report';
  patientInfo?: {
    name?: string;
    age?: number;
    gender?: string;
  };
}

interface AnalysisResult {
  documentType: string;
  extractedData: any;
  medicalInsights: string[];
  riskFactors: string[];
  recommendations: string[];
  structuredData: any;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const { ocrText, documentType, patientInfo }: DocumentAnalysisRequest = await req.json();

    if (!ocrText || !documentType) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Processing ${documentType} document analysis`);

    // Prepare specialized prompts based on document type
    const prompts = {
      exam: `Analise este exame médico e extraia informações estruturadas:

TEXTO OCR: ${ocrText}

INFORMAÇÕES DO PACIENTE: ${JSON.stringify(patientInfo || {})}

Retorne um JSON com:
{
  "examType": "tipo do exame",
  "examDate": "data do exame",
  "results": [
    {
      "parameter": "nome do parâmetro",
      "value": "valor",
      "unit": "unidade",
      "referenceRange": "valores de referência",
      "status": "normal|altered|critical"
    }
  ],
  "medicalInsights": ["insights médicos relevantes"],
  "riskFactors": ["fatores de risco identificados"],
  "recommendations": ["recomendações médicas"],
  "summary": "resumo geral do exame"
}`,

      prescription: `Analise esta receita médica e extraia informações estruturadas:

TEXTO OCR: ${ocrText}

INFORMAÇÕES DO PACIENTE: ${JSON.stringify(patientInfo || {})}

Retorne um JSON com:
{
  "prescriptionDate": "data da receita",
  "doctorName": "nome do médico",
  "doctorCRM": "CRM do médico",
  "medications": [
    {
      "name": "nome do medicamento",
      "dosage": "dosagem",
      "frequency": "frequência",
      "duration": "duração do tratamento",
      "instructions": "instruções especiais"
    }
  ],
  "diagnosis": "diagnóstico principal",
  "medicalInsights": ["insights sobre o tratamento"],
  "drugInteractions": ["possíveis interações medicamentosas"],
  "recommendations": ["recomendações de cuidados"]
}`,

      medical_record: `Analise este prontuário médico e extraia informações estruturadas:

TEXTO OCR: ${ocrText}

INFORMAÇÕES DO PACIENTE: ${JSON.stringify(patientInfo || {})}

Retorne um JSON com:
{
  "recordDate": "data do atendimento",
  "chiefComplaint": "queixa principal",
  "symptoms": ["sintomas relatados"],
  "physicalExam": "exame físico",
  "diagnosis": "diagnóstico",
  "treatment": "tratamento prescrito",
  "followUp": "orientações de retorno",
  "medicalInsights": ["insights clínicos"],
  "riskFactors": ["fatores de risco"],
  "recommendations": ["recomendações preventivas"]
}`,

      report: `Analise este laudo médico e extraia informações estruturadas:

TEXTO OCR: ${ocrText}

INFORMAÇÕES DO PACIENTE: ${JSON.stringify(patientInfo || {})}

Retorne um JSON com:
{
  "reportType": "tipo de laudo",
  "reportDate": "data do laudo",
  "findings": ["achados principais"],
  "conclusion": "conclusão do laudo",
  "recommendations": ["recomendações"],
  "urgency": "normal|urgent|critical",
  "medicalInsights": ["insights médicos"],
  "followUpNeeded": "necessidade de acompanhamento"
}`
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-2025-08-07',
        messages: [
          { 
            role: 'system', 
            content: 'Você é um especialista em análise de documentos médicos. Sempre retorne respostas em JSON válido e estruturado. Seja preciso na extração de dados médicos e forneça insights clínicos relevantes.' 
          },
          { role: 'user', content: prompts[documentType] }
        ],
        max_completion_tokens: 2000,
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.status, await response.text());
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const aiData = await response.json();
    const aiAnalysis = aiData.choices[0].message.content;

    // Parse the JSON response from AI
    let analysisResult: AnalysisResult;
    try {
      const parsedAnalysis = JSON.parse(aiAnalysis);
      analysisResult = {
        documentType,
        extractedData: parsedAnalysis,
        medicalInsights: parsedAnalysis.medicalInsights || [],
        riskFactors: parsedAnalysis.riskFactors || [],
        recommendations: parsedAnalysis.recommendations || [],
        structuredData: parsedAnalysis
      };
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      // Fallback if JSON parsing fails
      analysisResult = {
        documentType,
        extractedData: { rawAnalysis: aiAnalysis },
        medicalInsights: [],
        riskFactors: [],
        recommendations: [],
        structuredData: { summary: aiAnalysis }
      };
    }

    console.log('Document analysis completed successfully');

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in medical-document-analyzer:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Erro ao processar análise do documento médico'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});