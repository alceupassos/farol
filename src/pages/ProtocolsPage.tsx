import React, { useState } from 'react';
import { Search, FileText, Clock, User, Download, Eye, Star } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Protocol {
  id: string;
  title: string;
  category: string;
  version: string;
  lastUpdated: string;
  author: string;
  description: string;
  tags: string[];
  isFavorite: boolean;
  downloadCount: number;
  rating: number;
}

const mockProtocols: Protocol[] = [
  {
    id: '1',
    title: 'Protocolo de Diabetes Tipo 2',
    category: 'Endocrinologia',
    version: '2.1',
    lastUpdated: '2024-01-15',
    author: 'Dr. Carlos Silva',
    description: 'Diretrizes atualizadas para diagnóstico, tratamento e acompanhamento de pacientes com diabetes tipo 2.',
    tags: ['diabetes', 'endocrinologia', 'insulina', 'glicemia'],
    isFavorite: true,
    downloadCount: 245,
    rating: 4.8
  },
  {
    id: '2',
    title: 'Protocolo de Hipertensão Arterial',
    category: 'Cardiologia',
    version: '3.0',
    lastUpdated: '2024-01-10',
    author: 'Dra. Maria Santos',
    description: 'Protocolo completo para manejo da hipertensão arterial sistêmica em adultos.',
    tags: ['hipertensão', 'cardiologia', 'pressão arterial'],
    isFavorite: false,
    downloadCount: 312,
    rating: 4.9
  },
  {
    id: '3',
    title: 'Protocolo de Vacinação Infantil',
    category: 'Pediatria',
    version: '1.5',
    lastUpdated: '2024-01-08',
    author: 'Dr. João Oliveira',
    description: 'Calendário vacinal atualizado e procedimentos para imunização infantil.',
    tags: ['vacinação', 'pediatria', 'imunização'],
    isFavorite: true,
    downloadCount: 189,
    rating: 4.7
  },
  {
    id: '4',
    title: 'Protocolo de Saúde Mental',
    category: 'Psiquiatria',
    version: '2.3',
    lastUpdated: '2024-01-12',
    author: 'Dra. Ana Ferreira',
    description: 'Diretrizes para diagnóstico e tratamento de transtornos mentais comuns.',
    tags: ['saúde mental', 'psiquiatria', 'depressão', 'ansiedade'],
    isFavorite: false,
    downloadCount: 156,
    rating: 4.6
  },
  {
    id: '5',
    title: 'Protocolo de Emergência Cardíaca',
    category: 'Emergência',
    version: '1.8',
    lastUpdated: '2024-01-18',
    author: 'Dr. Roberto Lima',
    description: 'Procedimentos para atendimento de emergências cardiovasculares.',
    tags: ['emergência', 'cardiologia', 'infarto', 'arritmia'],
    isFavorite: true,
    downloadCount: 278,
    rating: 4.9
  }
];

const categories = ['Todos', 'Cardiologia', 'Endocrinologia', 'Pediatria', 'Psiquiatria', 'Emergência'];

const ProtocolsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todos');
  const [favorites, setFavorites] = useState<string[]>(
    mockProtocols.filter(p => p.isFavorite).map(p => p.id)
  );

  const toggleFavorite = (protocolId: string) => {
    setFavorites(prev => 
      prev.includes(protocolId) 
        ? prev.filter(id => id !== protocolId)
        : [...prev, protocolId]
    );
  };

  const filteredProtocols = mockProtocols.filter(protocol => {
    const matchesSearch = protocol.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         protocol.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         protocol.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'Todos' || protocol.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const favoriteProtocols = filteredProtocols.filter(protocol => favorites.includes(protocol.id));

  const ProtocolCard = ({ protocol }: { protocol: Protocol }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-lg">{protocol.title}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleFavorite(protocol.id)}
                className="p-1 h-auto"
              >
                <Star 
                  className={`h-4 w-4 ${
                    favorites.includes(protocol.id) 
                      ? 'text-yellow-500 fill-yellow-500' 
                      : 'text-muted-foreground'
                  }`} 
                />
              </Button>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{protocol.category}</Badge>
              <Badge variant="outline">v{protocol.version}</Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                {protocol.rating}
              </div>
            </div>
            <CardDescription className="mb-3">
              {protocol.description}
            </CardDescription>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {protocol.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {protocol.author}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {new Date(protocol.lastUpdated).toLocaleDateString('pt-BR')}
            </div>
            <div className="flex items-center gap-1">
              <Download className="h-3 w-3" />
              {protocol.downloadCount}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-1" />
              Visualizar
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );

  return (
    <MainLayout>
      <div className="pt-8 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-display font-semibold mb-2">
              Protocolos Médicos
            </h1>
            <p className="text-muted-foreground">
              Acesse diretrizes clínicas e protocolos de atendimento atualizados
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar protocolos por título, descrição ou tags..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{mockProtocols.length}</div>
                <p className="text-sm text-muted-foreground">Total de Protocolos</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{favorites.length}</div>
                <p className="text-sm text-muted-foreground">Meus Favoritos</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">8</div>
                <p className="text-sm text-muted-foreground">Categorias</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {mockProtocols.reduce((sum, p) => sum + p.downloadCount, 0)}
                </div>
                <p className="text-sm text-muted-foreground">Total Downloads</p>
              </CardContent>
            </Card>
          </div>

          {/* Protocols */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="all">Todos os Protocolos</TabsTrigger>
              <TabsTrigger value="favorites">Meus Favoritos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              <div className="space-y-4">
                {filteredProtocols.map((protocol) => (
                  <ProtocolCard key={protocol.id} protocol={protocol} />
                ))}
                
                {filteredProtocols.length === 0 && (
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Nenhum protocolo encontrado com os filtros aplicados.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="favorites" className="mt-6">
              <div className="space-y-4">
                {favoriteProtocols.map((protocol) => (
                  <ProtocolCard key={protocol.id} protocol={protocol} />
                ))}
                
                {favoriteProtocols.length === 0 && (
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Você ainda não tem protocolos favoritos.
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Clique no ícone de estrela para adicionar protocolos aos seus favoritos.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProtocolsPage;