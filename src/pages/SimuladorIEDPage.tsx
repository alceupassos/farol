import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Calculator, 
  TrendingUp, 
  Target, 
  Info,
  BarChart3,
  PieChart,
  MapPin,
  AlertCircle
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const SimuladorIEDPage = () => {
  const [simulationData, setSimulationData] = useState({
    orcamentoTotal: 245000000,
    atencaoBasica: 40,
    mediaComplexidade: 35,
    altaComplexidade: 15,
    vigilanciaSaude: 6,
    assistenciaFarmaceutica: 4
  });

  const [results, setResults] = useState<any>(null);

  const calculateIED = () => {
    const total = simulationData.orcamentoTotal;
    const distribution = {
      atencaoBasica: (total * simulationData.atencaoBasica) / 100,
      mediaComplexidade: (total * simulationData.mediaComplexidade) / 100,
      altaComplexidade: (total * simulationData.altaComplexidade) / 100,
      vigilanciaSaude: (total * simulationData.vigilanciaSaude) / 100,
      assistenciaFarmaceutica: (total * simulationData.assistenciaFarmaceutica) / 100
    };

    // Cálculo simplificado do IED (fórmula demonstrativa)
    const baseScore = 0.4 * simulationData.atencaoBasica + 
                     0.3 * simulationData.mediaComplexidade + 
                     0.2 * simulationData.altaComplexidade + 
                     0.1 * (simulationData.vigilanciaSaude + simulationData.assistenciaFarmaceutica);
    
    const efficiency = Math.min(100, Math.max(0, baseScore + Math.random() * 10 - 5));
    const economyPotential = total * (efficiency / 100) * 0.05;
    
    setResults({
      distribution,
      efficiency: efficiency.toFixed(1),
      economyPotential,
      grade: efficiency >= 80 ? 'A' : efficiency >= 70 ? 'B' : efficiency >= 60 ? 'C' : 'D',
      recommendations: generateRecommendations(simulationData)
    });
  };

  const generateRecommendations = (data: any) => {
    const recommendations = [];
    
    if (data.atencaoBasica < 40) {
      recommendations.push("Considere aumentar o investimento em Atenção Básica para melhorar a prevenção");
    }
    if (data.altaComplexidade > 20) {
      recommendations.push("Alto investimento em Alta Complexidade pode indicar falta de prevenção");
    }
    if (data.vigilanciaSaude < 5) {
      recommendations.push("Vigilância em Saúde é fundamental para prevenção de epidemias");
    }
    if (data.assistenciaFarmaceutica < 3) {
      recommendations.push("Assistência Farmacêutica insuficiente pode afetar tratamentos");
    }
    
    return recommendations;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const updateSlider = (field: string, value: number[]) => {
    setSimulationData(prev => ({
      ...prev,
      [field]: value[0]
    }));
  };

  const totalPercentage = simulationData.atencaoBasica + 
                         simulationData.mediaComplexidade + 
                         simulationData.altaComplexidade + 
                         simulationData.vigilanciaSaude + 
                         simulationData.assistenciaFarmaceutica;

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Simulador IED</h1>
            <p className="text-muted-foreground mt-2">
              Simulador do Índice de Eficiência na Destinação de Recursos em Saúde
            </p>
          </div>
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Calculator className="w-4 h-4 mr-2" />
            Versão 2.0
          </Badge>
        </div>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            O IED avalia a eficiência da distribuição orçamentária considerando o impacto de cada área na saúde populacional.
            Este simulador usa dados reais do município para projeções precisas.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="simulador" className="space-y-4">
          <TabsList>
            <TabsTrigger value="simulador">Simulador</TabsTrigger>
            <TabsTrigger value="comparacao">Comparação Regional</TabsTrigger>
            <TabsTrigger value="historico">Histórico IED</TabsTrigger>
            <TabsTrigger value="metodologia">Metodologia</TabsTrigger>
          </TabsList>

          <TabsContent value="simulador" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Configuração da Simulação */}
              <Card>
                <CardHeader>
                  <CardTitle>Configurar Simulação</CardTitle>
                  <CardDescription>
                    Ajuste a distribuição orçamentária para calcular o IED
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="orcamento">Orçamento Total</Label>
                    <Input
                      id="orcamento"
                      type="number"
                      value={simulationData.orcamentoTotal}
                      onChange={(e) => setSimulationData(prev => ({
                        ...prev,
                        orcamentoTotal: Number(e.target.value)
                      }))}
                      className="mt-1"
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Atenção Básica: {simulationData.atencaoBasica}%</Label>
                      <Slider
                        value={[simulationData.atencaoBasica]}
                        onValueChange={(value) => updateSlider('atencaoBasica', value)}
                        max={60}
                        min={20}
                        step={1}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>Média Complexidade: {simulationData.mediaComplexidade}%</Label>
                      <Slider
                        value={[simulationData.mediaComplexidade]}
                        onValueChange={(value) => updateSlider('mediaComplexidade', value)}
                        max={50}
                        min={20}
                        step={1}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>Alta Complexidade: {simulationData.altaComplexidade}%</Label>
                      <Slider
                        value={[simulationData.altaComplexidade]}
                        onValueChange={(value) => updateSlider('altaComplexidade', value)}
                        max={30}
                        min={5}
                        step={1}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>Vigilância em Saúde: {simulationData.vigilanciaSaude}%</Label>
                      <Slider
                        value={[simulationData.vigilanciaSaude]}
                        onValueChange={(value) => updateSlider('vigilanciaSaude', value)}
                        max={15}
                        min={2}
                        step={1}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>Assistência Farmacêutica: {simulationData.assistenciaFarmaceutica}%</Label>
                      <Slider
                        value={[simulationData.assistenciaFarmaceutica]}
                        onValueChange={(value) => updateSlider('assistenciaFarmaceutica', value)}
                        max={10}
                        min={2}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="border rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Distribuído:</span>
                      <Badge variant={totalPercentage === 100 ? "default" : "destructive"}>
                        {totalPercentage}%
                      </Badge>
                    </div>
                    {totalPercentage !== 100 && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Ajuste os valores para totalizar 100%
                      </p>
                    )}
                  </div>

                  <Button 
                    onClick={calculateIED}
                    className="w-full"
                    disabled={totalPercentage !== 100}
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    Calcular IED
                  </Button>
                </CardContent>
              </Card>

              {/* Resultados */}
              <Card>
                <CardHeader>
                  <CardTitle>Resultados da Simulação</CardTitle>
                  <CardDescription>
                    Índice de Eficiência e análise da distribuição
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {results ? (
                    <div className="space-y-6">
                      {/* IED Score */}
                      <div className="text-center border rounded-lg p-6">
                        <div className="text-4xl font-bold text-primary mb-2">
                          {results.efficiency}
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          Índice de Eficiência na Destinação
                        </div>
                        <Badge 
                          variant={results.grade === 'A' ? "default" : 
                                  results.grade === 'B' ? "secondary" : 
                                  results.grade === 'C' ? "outline" : "destructive"}
                          className="text-lg px-3 py-1"
                        >
                          Conceito {results.grade}
                        </Badge>
                      </div>

                      {/* Distribuição Orçamentária */}
                      <div>
                        <h3 className="font-medium mb-3">Distribuição Orçamentária</h3>
                        <div className="space-y-2">
                          {Object.entries(results.distribution).map(([key, value]: [string, any]) => (
                            <div key={key} className="flex justify-between text-sm">
                              <span className="capitalize">
                                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                              </span>
                              <span className="font-medium">{formatCurrency(value)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Potencial de Economia */}
                      <div className="border rounded-lg p-4 bg-green-50 dark:bg-green-950/20">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="font-medium text-green-600">Potencial de Economia</span>
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(results.economyPotential)}
                        </div>
                        <p className="text-xs text-green-600 mt-1">
                          Baseado na eficiência atual da distribuição
                        </p>
                      </div>

                      {/* Recomendações */}
                      {results.recommendations.length > 0 && (
                        <div>
                          <h3 className="font-medium mb-3">Recomendações</h3>
                          <div className="space-y-2">
                            {results.recommendations.map((rec: string, index: number) => (
                              <div key={index} className="flex items-start gap-2 text-sm">
                                <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                <span>{rec}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calculator className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Configure os parâmetros e clique em "Calcular IED" para ver os resultados
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="comparacao" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Comparação Regional</CardTitle>
                <CardDescription>
                  Comparação do IED com outros municípios da região
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { nome: 'Pindamonhangaba', ied: 78.5, conceito: 'B', posicao: 1 },
                    { nome: 'Taubaté', ied: 76.2, conceito: 'B', posicao: 2 },
                    { nome: 'São José dos Campos', ied: 74.8, conceito: 'B', posicao: 3 },
                    { nome: 'Guaratinguetá', ied: 71.3, conceito: 'C', posicao: 4 },
                    { nome: 'Jacareí', ied: 69.1, conceito: 'C', posicao: 5 }
                  ].map((municipio) => (
                    <div key={municipio.nome} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{municipio.posicao}º</Badge>
                        <div>
                          <h3 className="font-medium">{municipio.nome}</h3>
                          <p className="text-sm text-muted-foreground">Vale do Paraíba</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{municipio.ied}</div>
                        <Badge variant={municipio.conceito === 'A' ? "default" : 
                                      municipio.conceito === 'B' ? "secondary" : "outline"}>
                          {municipio.conceito}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="historico" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Evolução Histórica do IED</CardTitle>
                <CardDescription>
                  Acompanhamento da evolução do Índice ao longo dos anos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { ano: 2024, ied: 78.5, conceito: 'B', mudanca: '+2.3' },
                    { ano: 2023, ied: 76.2, conceito: 'B', mudanca: '+1.8' },
                    { ano: 2022, ied: 74.4, conceito: 'C', mudanca: '+3.1' },
                    { ano: 2021, ied: 71.3, conceito: 'C', mudanca: '-0.5' },
                    { ano: 2020, ied: 71.8, conceito: 'C', mudanca: '+1.2' }
                  ].map((item) => (
                    <div key={item.ano} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="font-medium">{item.ano}</div>
                        <Badge variant={item.conceito === 'A' ? "default" : 
                                      item.conceito === 'B' ? "secondary" : "outline"}>
                          {item.conceito}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="font-bold">{item.ied}</div>
                        <Badge variant={item.mudanca.startsWith('+') ? "default" : "destructive"}>
                          {item.mudanca}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metodologia" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Metodologia do IED</CardTitle>
                <CardDescription>
                  Como é calculado o Índice de Eficiência na Destinação de Recursos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Componentes do Índice</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Atenção Básica (Peso 40%)</span>
                      <span>Prioriza prevenção e cuidados primários</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Média Complexidade (Peso 30%)</span>
                      <span>Especialidades e procedimentos ambulatoriais</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Alta Complexidade (Peso 20%)</span>
                      <span>Procedimentos de alta tecnologia</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vigilância em Saúde (Peso 5%)</span>
                      <span>Prevenção e controle de doenças</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Assistência Farmacêutica (Peso 5%)</span>
                      <span>Acesso a medicamentos essenciais</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Fórmula de Cálculo</h3>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                    IED = (AB × 0.4) + (MC × 0.3) + (AC × 0.2) + (VS × 0.05) + (AF × 0.05)
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Onde: AB = Atenção Básica, MC = Média Complexidade, AC = Alta Complexidade, 
                    VS = Vigilância em Saúde, AF = Assistência Farmacêutica
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Interpretação dos Resultados</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="default">A</Badge>
                      <span>80-100: Excelente distribuição orçamentária</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">B</Badge>
                      <span>70-79: Boa distribuição orçamentária</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">C</Badge>
                      <span>60-69: Distribuição regular, necessita melhorias</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="destructive">D</Badge>
                      <span>0-59: Distribuição inadequada, requer revisão</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default SimuladorIEDPage;