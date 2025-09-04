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

interface ResidentialAnalysisRequest {
  residenceId: string;
  familyMembers: Array<{
    id: string;
    name: string;
    age: number;
    gender: string;
    documents: Array<{
      type: string;
      analysisResult: any;
      date: string;
    }>;
  }>;
}

interface ResidentialInsights {
  familyHealthScore: number;
  riskFactors: string[];
  recommendations: string[];
  epidemiologicalAlerts: string[];
  preventiveActions: string[];
  healthTrends: any;
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
    const { residenceId, familyMembers }: ResidentialAnalysisRequest = await req.json();

    if (!residenceId || !familyMembers || familyMembers.length === 0) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Analyzing residential health for residence ${residenceId}`);

    // Prepare family health summary for AI analysis
    const familyHealthSummary = familyMembers.map(member => ({
      name: member.name,
      age: member.age,
      gender: member.gender,
      recentDocuments: member.documents.slice(0, 5), // Last 5 documents
      healthConditions: member.documents
        .flatMap(doc => doc.analysisResult?.riskFactors || [])
        .filter((condition, index, arr) => arr.indexOf(condition) === index) // Remove duplicates
    }));

    const analysisPrompt = `Analise a saúde familiar desta residência e forneça insights abrangentes:

DADOS DA FAMÍLIA:
${JSON.stringify(familyHealthSummary, null, 2)}

Considerando:
1. Padrões de saúde familiares
2. Fatores de risco genéticos e ambientais
3. Necessidades de prevenção
4. Sinais de alerta epidemiológicos
5. Tendências de saúde por faixa etária

Retorne um JSON com:
{
  "familyHealthScore": número de 0-100 representando a saúde geral da família,
  "riskFactors": [
    "fatores de risco identificados na família"
  ],
  "recommendations": [
    "recomendações específicas para a família"
  ],
  "epidemiologicalAlerts": [
    "alertas epidemiológicos relevantes"
  ],
  "preventiveActions": [
    "ações preventivas recomendadas"
  ],
  "healthTrends": {
    "children": "tendências de saúde infantil",
    "adults": "tendências de saúde dos adultos",
    "elderly": "tendências de saúde dos idosos",
    "familyPatterns": "padrões familiares identificados"
  },
  "priorityMembers": [
    {
      "name": "nome do membro",
      "priority": "high|medium|low",
      "reason": "motivo da priorização"
    }
  ],
  "urgentActions": [
    "ações que requerem atenção urgente"
  ]
}`;

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
            content: 'Você é um especialista em saúde pública e medicina familiar. Analise padrões de saúde familiares e forneça insights preventivos e epidemiológicos. Sempre retorne JSON válido.' 
          },
          { role: 'user', content: analysisPrompt }
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
    let insights: ResidentialInsights;
    try {
      const parsedInsights = JSON.parse(aiAnalysis);
      insights = {
        familyHealthScore: parsedInsights.familyHealthScore || 75,
        riskFactors: parsedInsights.riskFactors || [],
        recommendations: parsedInsights.recommendations || [],
        epidemiologicalAlerts: parsedInsights.epidemiologicalAlerts || [],
        preventiveActions: parsedInsights.preventiveActions || [],
        healthTrends: parsedInsights.healthTrends || {}
      };
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      // Fallback if JSON parsing fails
      insights = {
        familyHealthScore: 75,
        riskFactors: [],
        recommendations: ['Consulte um profissional de saúde para avaliação detalhada'],
        epidemiologicalAlerts: [],
        preventiveActions: [],
        healthTrends: {}
      };
    }

    console.log('Residential health analysis completed successfully');

    return new Response(JSON.stringify({
      residenceId,
      analysisDate: new Date().toISOString(),
      insights,
      summary: `Análise de saúde familiar concluída para ${familyMembers.length} membros`
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in residential-health-analyzer:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Erro ao processar análise de saúde residencial'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});