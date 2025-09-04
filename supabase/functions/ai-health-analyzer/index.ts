import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { healthData, analysisType } = await req.json()

    // Simulate AI analysis based on health data
    let analysis = {}

    switch (analysisType) {
      case 'risk_prediction':
        analysis = await performRiskPrediction(healthData)
        break
      case 'health_insights':
        analysis = await generateHealthInsights(healthData)
        break
      case 'medication_optimization':
        analysis = await optimizeMedication(healthData)
        break
      default:
        analysis = await comprehensiveAnalysis(healthData)
    }

    return new Response(
      JSON.stringify(analysis),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error in AI health analyzer:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})

async function performRiskPrediction(healthData: any) {
  // Simulate cardiovascular risk prediction
  const cardiovascularRisk = calculateCardiovascularRisk(healthData)
  const diabetesRisk = calculateDiabetesRisk(healthData)
  const mentalHealthRisk = calculateMentalHealthRisk(healthData)

  return {
    type: 'risk_prediction',
    predictions: [
      {
        condition: 'cardiovascular_disease',
        risk_level: cardiovascularRisk.level,
        probability: cardiovascularRisk.probability,
        timeline: '6 months',
        factors: cardiovascularRisk.factors,
        recommendations: cardiovascularRisk.recommendations
      },
      {
        condition: 'diabetes_type2',
        risk_level: diabetesRisk.level,
        probability: diabetesRisk.probability,
        timeline: '12 months',
        factors: diabetesRisk.factors,
        recommendations: diabetesRisk.recommendations
      },
      {
        condition: 'mental_health_episode',
        risk_level: mentalHealthRisk.level,
        probability: mentalHealthRisk.probability,
        timeline: '3 months',
        factors: mentalHealthRisk.factors,
        recommendations: mentalHealthRisk.recommendations
      }
    ],
    confidence: 87,
    last_updated: new Date().toISOString()
  }
}

async function generateHealthInsights(healthData: any) {
  return {
    type: 'health_insights',
    insights: [
      {
        category: 'cardiovascular',
        title: 'Padrão de Pressão Arterial Irregular',
        description: 'Detectadas variações significativas na pressão arterial nos últimos 30 dias',
        severity: 'medium',
        confidence: 92,
        recommendations: [
          'Monitorar pressão arterial diariamente',
          'Reduzir consumo de sódio',
          'Consultar cardiologista'
        ]
      },
      {
        category: 'metabolic',
        title: 'Otimização do Controle Glicêmico',
        description: 'IA sugere ajustes no horário das refeições para melhor controle da glicemia',
        severity: 'low',
        confidence: 78,
        recommendations: [
          'Intervalos regulares entre refeições',
          'Monitorar glicemia pós-prandial',
          'Exercícios leves após refeições'
        ]
      },
      {
        category: 'lifestyle',
        title: 'Padrão de Sono Inadequado',
        description: 'Qualidade do sono está impactando negativamente a recuperação e imunidade',
        severity: 'medium',
        confidence: 85,
        recommendations: [
          'Estabelecer rotina de sono',
          'Evitar telas 2h antes de dormir',
          'Ambiente escuro e silencioso'
        ]
      }
    ],
    generated_at: new Date().toISOString()
  }
}

async function optimizeMedication(healthData: any) {
  return {
    type: 'medication_optimization',
    optimizations: [
      {
        medication: 'Metformina',
        current_dosage: '850mg 2x/dia',
        suggested_dosage: '500mg 3x/dia',
        reason: 'Melhor distribuição ao longo do dia para controle glicêmico',
        confidence: 89,
        requires_physician_approval: true
      },
      {
        medication: 'Losartana',
        current_dosage: '50mg 1x/dia',
        suggested_timing: 'Noite',
        reason: 'Administração noturna pode melhorar controle pressórico',
        confidence: 76,
        requires_physician_approval: false
      }
    ],
    interactions: [],
    warnings: [
      'Sempre consulte seu médico antes de alterar dosagens',
      'Monitore efeitos colaterais ao fazer mudanças'
    ]
  }
}

async function comprehensiveAnalysis(healthData: any) {
  const riskPrediction = await performRiskPrediction(healthData)
  const insights = await generateHealthInsights(healthData)
  const medications = await optimizeMedication(healthData)

  return {
    type: 'comprehensive_analysis',
    risk_predictions: riskPrediction.predictions,
    health_insights: insights.insights,
    medication_optimizations: medications.optimizations,
    overall_health_score: calculateOverallHealthScore(healthData),
    priority_actions: [
      'Agendar consulta cardiológica',
      'Iniciar monitoramento glicêmico',
      'Implementar rotina de exercícios'
    ],
    generated_at: new Date().toISOString()
  }
}

function calculateCardiovascularRisk(data: any) {
  // Simplified risk calculation
  let riskScore = 0
  const factors = []
  
  if (data.blood_pressure?.systolic > 140) {
    riskScore += 30
    factors.push('Pressão arterial elevada')
  }
  
  if (data.cholesterol?.total > 240) {
    riskScore += 25
    factors.push('Colesterol alto')
  }
  
  if (data.lifestyle?.smoking) {
    riskScore += 20
    factors.push('Tabagismo')
  }
  
  if (data.age > 55) {
    riskScore += 15
    factors.push('Idade avançada')
  }

  const level = riskScore > 60 ? 'high' : riskScore > 30 ? 'medium' : 'low'
  
  return {
    level,
    probability: Math.min(riskScore + Math.random() * 10, 95),
    factors,
    recommendations: getCardiovascularRecommendations(level)
  }
}

function calculateDiabetesRisk(data: any) {
  let riskScore = 0
  const factors = []
  
  if (data.glucose?.fasting > 110) {
    riskScore += 35
    factors.push('Glicemia de jejum elevada')
  }
  
  if (data.bmi > 30) {
    riskScore += 25
    factors.push('Obesidade')
  }
  
  if (data.family_history?.diabetes) {
    riskScore += 20
    factors.push('Histórico familiar')
  }

  const level = riskScore > 50 ? 'high' : riskScore > 25 ? 'medium' : 'low'
  
  return {
    level,
    probability: Math.min(riskScore + Math.random() * 15, 90),
    factors,
    recommendations: getDiabetesRecommendations(level)
  }
}

function calculateMentalHealthRisk(data: any) {
  let riskScore = 0
  const factors = []
  
  if (data.stress_level > 7) {
    riskScore += 30
    factors.push('Estresse elevado')
  }
  
  if (data.sleep_quality < 4) {
    riskScore += 25
    factors.push('Qualidade do sono ruim')
  }
  
  if (data.social_isolation) {
    riskScore += 20
    factors.push('Isolamento social')
  }

  const level = riskScore > 45 ? 'medium' : 'low'
  
  return {
    level,
    probability: Math.min(riskScore + Math.random() * 20, 85),
    factors,
    recommendations: getMentalHealthRecommendations(level)
  }
}

function getCardiovascularRecommendations(level: string) {
  const recommendations = {
    high: [
      'Consulta cardiológica urgente',
      'Iniciar medicação anti-hipertensiva',
      'Programa supervisionado de exercícios',
      'Dieta com baixo teor de sódio'
    ],
    medium: [
      'Consulta cardiológica em 30 dias',
      'Exercícios aeróbicos regulares',
      'Monitoramento da pressão arterial',
      'Redução do estresse'
    ],
    low: [
      'Manter hábitos saudáveis',
      'Exercícios regulares',
      'Dieta balanceada',
      'Check-up anual'
    ]
  }
  
  return recommendations[level as keyof typeof recommendations] || recommendations.low
}

function getDiabetesRecommendations(level: string) {
  const recommendations = {
    high: [
      'Consulta endocrinológica urgente',
      'Teste de tolerância à glicose',
      'Dieta low-carb',
      'Perda de peso supervisionada'
    ],
    medium: [
      'Monitoramento glicêmico regular',
      'Dieta com controle de carboidratos',
      'Exercícios físicos regulares',
      'Consulta nutricional'
    ],
    low: [
      'Dieta equilibrada',
      'Exercícios regulares',
      'Manutenção do peso',
      'Check-up anual'
    ]
  }
  
  return recommendations[level as keyof typeof recommendations] || recommendations.low
}

function getMentalHealthRecommendations(level: string) {
  const recommendations = {
    high: [
      'Consulta psicológica urgente',
      'Técnicas de gerenciamento do estresse',
      'Atividades sociais regulares',
      'Apoio familiar'
    ],
    medium: [
      'Técnicas de relaxamento',
      'Exercícios de mindfulness',
      'Atividades prazerosas',
      'Sono adequado'
    ],
    low: [
      'Manter atividades sociais',
      'Exercícios regulares',
      'Hobbies e lazer',
      'Equilíbrio trabalho-vida'
    ]
  }
  
  return recommendations[level as keyof typeof recommendations] || recommendations.low
}

function calculateOverallHealthScore(data: any) {
  // Simplified health score calculation
  let score = 100
  
  if (data.blood_pressure?.systolic > 140) score -= 15
  if (data.cholesterol?.total > 240) score -= 10
  if (data.bmi > 30) score -= 12
  if (data.glucose?.fasting > 110) score -= 15
  if (data.stress_level > 7) score -= 8
  if (data.sleep_quality < 4) score -= 10
  if (data.lifestyle?.smoking) score -= 20
  
  return Math.max(score, 0)
}