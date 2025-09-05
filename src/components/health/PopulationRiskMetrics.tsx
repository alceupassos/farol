import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, AlertTriangle, Target } from 'lucide-react';

const PopulationRiskMetrics: React.FC = () => {
  // Dados mock para métricas populacionais
  const riskDistribution = [
    { nivel: 'Baixo', quantidade: 12450, porcentagem: 65, cor: '#22c55e' },
    { nivel: 'Moderado', quantidade: 4820, porcentagem: 25, cor: '#eab308' },
    { nivel: 'Alto', quantidade: 1540, porcentagem: 8, cor: '#f97316' },
    { nivel: 'Crítico', quantidade: 380, porcentagem: 2, cor: '#ef4444' }
  ];

  const riskByAge = [
    { faixa: '0-18', baixo: 85, moderado: 12, alto: 2, critico: 1 },
    { faixa: '19-39', baixo: 78, moderado: 18, alto: 3, critico: 1 },
    { faixa: '40-59', baixo: 60, moderado: 28, alto: 9, critico: 3 },
    { faixa: '60+', baixo: 35, moderado: 40, alto: 18, critico: 7 }
  ];

  const riskByRegion = [
    { bairro: 'Centro', score: 45, populacao: 2500 },
    { bairro: 'Vila Nova', score: 52, populacao: 3200 },
    { bairro: 'Jardim América', score: 38, populacao: 1800 },
    { bairro: 'Cidade Alta', score: 67, populacao: 2800 },
    { bairro: 'Santa Rosa', score: 41, populacao: 2100 }
  ];

  const totalPopulation = riskDistribution.reduce((sum, item) => sum + item.quantidade, 0);

  return (
    <div className="space-y-6">
      {/* KPIs Principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{totalPopulation.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">População Total</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-500" />
            <div className="text-2xl font-bold text-red-600">
              {(riskDistribution.find(r => r.nivel === 'Crítico')?.quantidade || 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Risco Crítico</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-orange-500" />
            <div className="text-2xl font-bold text-orange-600">
              {((riskDistribution.find(r => r.nivel === 'Alto')?.porcentagem || 0) + 
                (riskDistribution.find(r => r.nivel === 'Crítico')?.porcentagem || 0))}%
            </div>
            <div className="text-sm text-muted-foreground">Alto Risco</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold text-green-600">
              {riskDistribution.find(r => r.nivel === 'Baixo')?.porcentagem || 0}%
            </div>
            <div className="text-sm text-muted-foreground">Baixo Risco</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribuição Geral de Risco */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Risco na População</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ nivel, porcentagem }) => `${nivel}: ${porcentagem}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="quantidade"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.cor} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [value.toLocaleString(), 'Pessoas']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risco por Faixa Etária */}
        <Card>
          <CardHeader>
            <CardTitle>Risco por Faixa Etária (%)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riskByAge}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="faixa" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="baixo" stackId="a" fill="#22c55e" name="Baixo" />
                <Bar dataKey="moderado" stackId="a" fill="#eab308" name="Moderado" />
                <Bar dataKey="alto" stackId="a" fill="#f97316" name="Alto" />
                <Bar dataKey="critico" stackId="a" fill="#ef4444" name="Crítico" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Risco por Região */}
      <Card>
        <CardHeader>
          <CardTitle>Score Médio de Risco por Bairro</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={riskByRegion}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="bairro" />
              <YAxis />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  name === 'score' ? `${value} pontos` : value.toLocaleString(),
                  name === 'score' ? 'Score Médio' : 'População'
                ]}
              />
              <Bar dataKey="score" fill="#3b82f6" name="Score Médio" />
            </BarChart>
          </ResponsiveContainer>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4">
            {riskByRegion.map((region) => (
              <div key={region.bairro} className="p-3 bg-muted/30 rounded-lg text-center">
                <div className="font-medium text-sm">{region.bairro}</div>
                <div className={`text-lg font-bold ${
                  region.score > 60 ? 'text-red-600' :
                  region.score > 45 ? 'text-orange-600' :
                  region.score > 30 ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {region.score}
                </div>
                <div className="text-xs text-muted-foreground">
                  {region.populacao.toLocaleString()} hab.
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alertas e Recomendações */}
      <Card>
        <CardHeader>
          <CardTitle>Alertas e Ações Recomendadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center mb-2">
                <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                <span className="font-medium text-red-800">Alerta Crítico</span>
              </div>
              <p className="text-sm text-red-700">
                380 pessoas com risco crítico necessitam avaliação médica imediata. 
                Foco na Cidade Alta que concentra 45% dos casos.
              </p>
            </div>
            
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center mb-2">
                <TrendingUp className="w-5 h-5 text-orange-600 mr-2" />
                <span className="font-medium text-orange-800">Ação Preventiva</span>
              </div>
              <p className="text-sm text-orange-700">
                População acima de 60 anos apresenta 25% de risco alto/crítico. 
                Implementar programa de acompanhamento específico.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center mb-2">
                <Target className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-medium text-green-800">Meta Atingida</span>
              </div>
              <p className="text-sm text-green-700">
                65% da população está em baixo risco, superando a meta de 60%. 
                Manter estratégias preventivas atuais.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PopulationRiskMetrics;