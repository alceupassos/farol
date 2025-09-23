import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, RefreshCw, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';
import { getLatestPiracicabaHealthNews } from '@/data/piracicabaHealthNews2025';

const PiracicabaHealthNews = () => {
  const newsItems = getLatestPiracicabaHealthNews();

  const sentimentMap = {
    positive: {
      label: 'Avaliação positiva',
      className: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      Icon: ThumbsUp,
    },
    negative: {
      label: 'Alerta negativo',
      className: 'text-red-400 bg-red-500/10 border-red-500/20',
      Icon: ThumbsDown,
    },
    neutral: {
      label: 'Impacto neutro',
      className: 'text-yellow-300 bg-yellow-500/10 border-yellow-500/20',
      Icon: Minus,
    },
  } as const;

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <header className="space-y-2 border-b border-border pb-6">
          <Badge variant="outline" className="border-primary/40 text-primary">
            Prefeitura de Piracicaba · 2025
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight">Últimas notícias sobre a saúde em Piracicaba</h1>
          <p className="text-muted-foreground max-w-3xl">
            Curadoria diária das principais pautas de saúde pública na cidade. As matérias são ordenadas da mais recente para a mais antiga e podem ser atualizadas a cada acesso.
          </p>
          <Button variant="ghost" size="sm" className="gap-2 text-primary" onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4" /> Atualizar agora
          </Button>
        </header>

        <div className="space-y-4">
          {newsItems.map((item) => {
            const publishedDate = new Date(item.publishedAt).toLocaleString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });
            const sentiment = sentimentMap[item.sentiment];

            return (
              <Card key={item.id} className="border-border/60 bg-card/95">
                <CardHeader className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      {publishedDate}
                    </Badge>
                    <Badge variant="outline" className="border-slate-400 text-slate-400">
                      {item.source}
                    </Badge>
                    <Badge variant="outline" className={`flex items-center gap-1 ${sentiment.className}`}>
                      <sentiment.Icon className="h-3.5 w-3.5" aria-hidden />
                      {sentiment.label}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  {item.summary.map((line, index) => (
                    <p key={`${item.id}-line-${index}`}>{line}</p>
                  ))}
                  <div className="pt-2">
                    <Button asChild variant="outline" size="sm" className="gap-2">
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" /> Acessar matéria na íntegra
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
};

export default PiracicabaHealthNews;
