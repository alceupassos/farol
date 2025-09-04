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

interface EpidemiologicalRequest {
  region: string;
  timeframe: 'daily' | 'weekly' | 'monthly';
  dataPoints: Array<{
    date: string;
    documentType: string;
    conditions: string[];
    ageGroup: string;
    geoLocation?: { lat: number; lon: number };
  }>;
}

interface EpidemiologicalInsights {
  outbreakRisk: 'low' | 'medium' | 'high' | 'critical';
  patterns: string[];
  recommendations: string[];
  hotspots: Array<{
    area: string;
    riskLevel: string;
    conditions: string[];
  }>;
  trends: any;
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
    const { region, timeframe, dataPoints }: EpidemiologicalRequest = await req.json();

    if (!region || !timeframe || !dataPoints || dataPoints.length === 0) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Analyzing epidemiological data for ${region} - ${timeframe}`);

    // Aggregate data for analysis
    const conditionCounts = dataPoints.reduce((acc, point) => {
      point.conditions.forEach(condition => {
        acc[condition] = (acc[condition] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    const ageGroupDistribution = dataPoints.reduce((acc, point) => {
      acc[point.ageGroup] = (acc[point.ageGroup] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const timeDistribution = dataPoints.reduce((acc, point) => {
      const date = point.date.split('T')[0]; // Get date part only
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const analysisPrompt = `Analise estes dados epidemiológicos e forneça insights sobre padrões de saúde e riscos de surto:

REGIÃO: ${region}
PERÍODO: ${timeframe}
TOTAL DE CASOS ANALISADOS: ${dataPoints.length}

DISTRIBUIÇÃO POR CONDIÇÕES:
${JSON.stringify(conditionCounts, null, 2)}

DISTRIBUIÇÃO POR FAIXA ETÁRIA:
${JSON.stringify(ageGroupDistribution, null, 2)}

DISTRIBUIÇÃO TEMPORAL:
${JSON.stringify(timeDistribution, null, 2)}

Com base nestes dados epidemiológicos, retorne um JSON com:
{
  "outbreakRisk": "low|medium|high|critical",
  "riskAssessment": "avaliação detalhada do risco de surto",
  "patterns": [
    "padrões epidemiológicos identificados"
  ],
  "recommendations": [
    "recomendações para vigilância e prevenção"
  ],
  "hotspots": [
    {
      "area": "área geográfica de risco",
      "riskLevel": "nível de risco",
      "conditions": ["condições prevalentes"],
      "urgentActions": ["ações urgentes necessárias"]
    }
  ],
  "trends": {
    "increasing": ["condições em crescimento"],
    "decreasing": ["condições em declínio"],
    "stable": ["condições estáveis"],
    "seasonal": ["padrões sazonais identificados"]
  },
  "alertLevel": "green|yellow|orange|red",
  "nextActions": [
    "próximas ações recomendadas para vigilância"
  ],
  "resourceAllocation": {
    "priority": "high|medium|low",
    "areas": ["áreas que necessitam mais recursos"],
    "interventions": ["intervenções prioritárias"]
  }
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
            content: 'Você é um especialista em epidemiologia e vigilância em saúde pública. Analise padrões epidemiológicos e forneça insights sobre riscos de surtos e necessidades de intervenção. Sempre retorne JSON válido.' 
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
    let insights: any;
    try {
      insights = JSON.parse(aiAnalysis);
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      // Fallback if JSON parsing fails
      insights = {
        outbreakRisk: 'low',
        patterns: [],
        recommendations: ['Dados insuficientes para análise completa'],
        hotspots: [],
        trends: {},
        alertLevel: 'green'
      };
    }

    console.log('Epidemiological analysis completed successfully');

    return new Response(JSON.stringify({
      region,
      timeframe,
      analysisDate: new Date().toISOString(),
      dataPointsAnalyzed: dataPoints.length,
      insights,
      summary: `Análise epidemiológica de ${dataPoints.length} casos na região ${region}`
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in epidemiological-analyzer:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Erro ao processar análise epidemiológica'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});