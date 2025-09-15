import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, MapPin, FileText } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";

const ComissoesCIRPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Comissões Intergestores Regionais (CIR)</h1>
          <p className="text-muted-foreground">
            Gestão e coordenação das Comissões Intergestores Regionais para articulação das políticas de saúde.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* CIR Regional São Paulo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                CIR Regional São Paulo
              </CardTitle>
              <CardDescription>Região Metropolitana de São Paulo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>39 municípios</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Reunião: 3ª quinta-feira do mês</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>12 deliberações em 2024</span>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-200">
                Ativa
              </Badge>
            </CardContent>
          </Card>

          {/* CIR Vale do Paraíba */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                CIR Vale do Paraíba
              </CardTitle>
              <CardDescription>Região do Vale do Paraíba</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>35 municípios</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Reunião: 2ª terça-feira do mês</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>8 deliberações em 2024</span>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-200">
                Ativa
              </Badge>
            </CardContent>
          </Card>

          {/* CIR Baixada Santista */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                CIR Baixada Santista
              </CardTitle>
              <CardDescription>Região da Baixada Santista</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>9 municípios</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Reunião: 1ª sexta-feira do mês</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>15 deliberações em 2024</span>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-200">
                Ativa
              </Badge>
            </CardContent>
          </Card>

          {/* CIR Interior Norte */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                CIR Interior Norte
              </CardTitle>
              <CardDescription>Região Norte do Interior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>62 municípios</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Reunião: 4ª segunda-feira do mês</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>6 deliberações em 2024</span>
              </div>
              <Badge variant="outline" className="text-yellow-600 border-yellow-200">
                Em Revisão
              </Badge>
            </CardContent>
          </Card>

          {/* CIR Interior Sul */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                CIR Interior Sul
              </CardTitle>
              <CardDescription>Região Sul do Interior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>48 municípios</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Reunião: 2ª quarta-feira do mês</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>10 deliberações em 2024</span>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-200">
                Ativa
              </Badge>
            </CardContent>
          </Card>

          {/* CIR Litoral Norte */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                CIR Litoral Norte
              </CardTitle>
              <CardDescription>Região do Litoral Norte</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>4 municípios</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Reunião: 1ª segunda-feira do mês</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>5 deliberações em 2024</span>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-200">
                Ativa
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Summary Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total de CIRs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">6</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Municípios Cobertos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">197</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Deliberações 2024</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">56</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">CIRs Ativas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">5</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ComissoesCIRPage;