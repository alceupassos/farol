  import React, { useState } from 'react';
import { 
  FolderOpen, 
  Activity, 
  TrendingUp, 
  Globe, 
  Brain, 
  ImageIcon, 
  Download, 
  Upload, 
  Search, 
  Eye, 
  ExternalLink,
  Grid3X3,
  List
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const categories = [
  { id: 'all', label: 'Todas', icon: <FolderOpen className="h-4 w-4" />, count: 13 },
  { id: 'laboratorial', label: 'Laboratorial', icon: <Activity className="h-4 w-4" />, count: 2 },
  { id: 'financeiro', label: 'Financeiro', icon: <TrendingUp className="h-4 w-4" />, count: 2 },
  { id: 'conceitual', label: 'Conceitual', icon: <Globe className="h-4 w-4" />, count: 5 },
  { id: 'medico', label: 'Médico', icon: <Brain className="h-4 w-4" />, count: 4 }
];

const stats = [
  { label: 'Total de Imagens', value: '13', icon: <ImageIcon className="h-5 w-5" />, color: 'text-blue-400' },
  { label: 'Categorias', value: '4', icon: <FolderOpen className="h-5 w-5" />, color: 'text-green-400' },
  { label: 'Tamanho Total', value: '~6.8MB', icon: <Download className="h-5 w-5" />, color: 'text-purple-400' },
  { label: 'Última Atualização', value: 'Agora', icon: <Upload className="h-5 w-5" />, color: 'text-orange-400' }
];

const images = [
  {
    id: 1,
    title: 'Análise de Hemograma',
    category: 'laboratorial',
    url: '/api/placeholder/400/300',
    description: 'Gráfico de análise de hemograma completo',
    size: '245KB',
    format: 'PNG',
    tags: ['hemograma', 'sangue', 'laboratório']
  },
  {
    id: 2,
    title: 'Relatório Financeiro Q1',
    category: 'financeiro',
    url: '/api/placeholder/400/300',
    description: 'Dashboard financeiro do primeiro trimestre',
    size: '512KB',
    format: 'JPG',
    tags: ['financeiro', 'relatório', 'trimestre']
  },
  {
    id: 3,
    title: 'Estrutura do SUS',
    category: 'conceitual',
    url: '/api/placeholder/400/300',
    description: 'Organograma do Sistema Único de Saúde',
    size: '1.2MB',
    format: 'SVG',
    tags: ['sus', 'organograma', 'estrutura']
  },
  {
    id: 4,
    title: 'Análise de Hemograma 2',
    category: 'laboratorial',
    url: '/api/placeholder/400/300',
    description: 'Gráfico de análise de hemograma completo 2',
    size: '245KB',
    format: 'PNG',
    tags: ['hemograma', 'sangue', 'laboratório']
  },
  {
    id: 5,
    title: 'Relatório Financeiro Q2',
    category: 'financeiro',
    url: '/api/placeholder/400/300',
    description: 'Dashboard financeiro do segundo trimestre',
    size: '512KB',
    format: 'JPG',
    tags: ['financeiro', 'relatório', 'trimestre']
  }
];

export default function ImageRepositoryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredImages = images.filter(image => {
    const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;
    const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">
            Repositório de Imagens
          </h1>
          <p className="text-slate-300 text-lg">
            Biblioteca centralizada de recursos visuais para saúde pública
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className={`${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  selectedCategory === category.id
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {category.icon}
                <span className="ml-2">{category.label}</span>
                <Badge variant="secondary" className="ml-2 bg-slate-700 text-slate-300">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Buscar imagens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-600 text-white placeholder-slate-400 w-64"
              />
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-blue-600' : 'bg-slate-800 border-slate-600'}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-blue-600' : 'bg-slate-800 border-slate-600'}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <Card key={image.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-200 group">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="font-semibold text-white mb-2">{image.title}</h3>
                <p className="text-slate-400 text-sm mb-3">{image.description}</p>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span>{image.format}</span>
                  <span>{image.size}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {image.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-slate-700 text-slate-300 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="h-16 w-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-400 mb-2">
              Nenhuma imagem encontrada
            </h3>
            <p className="text-slate-500">
              Tente ajustar os filtros ou termo de busca
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
