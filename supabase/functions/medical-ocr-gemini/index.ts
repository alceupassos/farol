import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GeminiRequest {
  imageData: string;
  documentType: string;
  patientInfo?: {
    name: string;
    age: number;
    gender: string;
  };
}

interface ParameterAnalysis {
  name: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'warning' | 'critical';
  explanation: string;
  function: string;
  lowRiskConsequences: string;
  highRiskConsequences: string;
  nutritionalRecommendations: string[];
  lifestyle: string[];
}

interface GeminiResponse {
  parameters: ParameterAnalysis[];
  summary: string;
  overallRisk: 'low' | 'moderate' | 'high';
  recommendations: string[];
  correlations: Array<{
    parameters: string[];
    observation: string;
  }>;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageData, documentType, patientInfo }: GeminiRequest = await req.json();
    const geminiApiKey = Deno.env.get('GOOGLE_GEMINI_API_KEY');

    if (!geminiApiKey) {
      throw new Error('Google Gemini API key not configured');
    }

    console.log('Processing medical document with Gemini 2.5...', { documentType });

    // Prepare the prompt for medical analysis
    const systemPrompt = `Você é um especialista em análise de exames médicos. Analise esta imagem de exame médico e extraia todas as informações de forma estruturada.

Para cada parâmetro encontrado, forneça:
1. Nome do parâmetro
2. Valor encontrado 
3. Unidade de medida
4. Faixa de referência
5. Status (normal, warning, critical)
6. Explicação sobre a função no organismo
7. Consequências de valores baixos
8. Consequências de valores altos
9. Recomendações nutricionais específicas
10. Recomendações de estilo de vida

Retorne apenas um JSON válido no formato especificado, sem texto adicional.`;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: systemPrompt
            },
            {
              inline_data: {
                mime_type: "image/jpeg",
                data: imageData.split(',')[1] // Remove data:image/jpeg;base64, prefix
              }
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.1,
        topK: 32,
        topP: 1,
        maxOutputTokens: 4096,
      }
    };

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API Error:', errorData);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Gemini API Response:', JSON.stringify(data, null, 2));

    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response format from Gemini API');
    }

    const analysisText = data.candidates[0].content.parts[0].text;
    
    // Try to parse the JSON response
    let analysisResult: GeminiResponse;
    try {
      // Clean the response and extract JSON
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback: create structured response from text
        analysisResult = createFallbackAnalysis(analysisText, documentType);
      }
    } catch (parseError) {
      console.error('Failed to parse Gemini response as JSON:', parseError);
      analysisResult = createFallbackAnalysis(analysisText, documentType);
    }

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in medical-ocr-gemini function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to analyze medical document', 
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

function createFallbackAnalysis(text: string, documentType: string): GeminiResponse {
  // Create a basic structured response when JSON parsing fails
  return {
    parameters: [
      {
        name: "Análise Extraída",
        value: "Texto processado",
        unit: "",
        referenceRange: "N/A",
        status: "normal",
        explanation: "Análise de texto extraído do documento médico",
        function: "Informações gerais extraídas",
        lowRiskConsequences: "Não aplicável",
        highRiskConsequences: "Não aplicável", 
        nutritionalRecommendations: ["Manter dieta equilibrada"],
        lifestyle: ["Consultar médico regularmente"]
      }
    ],
    summary: text.substring(0, 500) + "...",
    overallRisk: "low",
    recommendations: ["Consultar médico para interpretação completa"],
    correlations: []
  };
}