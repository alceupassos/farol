import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Zap, CheckCircle, Clock, AlertTriangle, Hash, Shield } from "lucide-react";

export const BlockchainVerificationPanel = () => {
  const verificationQueue = [
    {
      id: "0x1a2b3c4d",
      type: "Patient Record",
      data: "Medical History Update",
      status: "pending",
      timestamp: "2024-01-15 14:30:25",
      gasEstimate: "0.0012 ETH",
      priority: "high"
    },
    {
      id: "0x5e6f7g8h",
      type: "Lab Results",
      data: "Blood Test Results",
      status: "verifying",
      timestamp: "2024-01-15 14:28:15",
      gasEstimate: "0.0008 ETH",
      priority: "medium"
    },
    {
      id: "0x9i0j1k2l",
      type: "Prescription",
      data: "Medication Update",
      status: "completed",
      timestamp: "2024-01-15 14:25:10",
      gasEstimate: "0.0006 ETH",
      priority: "low"
    }
  ];

  const blockchainStats = [
    { label: "Blocos Verificados", value: "2,847", trend: "+12" },
    { label: "Hash Rate", value: "98.7%", trend: "+0.3%" },
    { label: "Nós Ativos", value: "156", trend: "+3" },
    { label: "Tempo Médio", value: "0.3s", trend: "-0.1s" }
  ];

  const recentBlocks = [
    {
      blockNumber: 2847,
      hash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p",
      transactions: 23,
      timestamp: "2 min ago",
      validator: "Node #156"
    },
    {
      blockNumber: 2846,
      hash: "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q",
      transactions: 18,
      timestamp: "4 min ago",
      validator: "Node #142"
    },
    {
      blockNumber: 2845,
      hash: "0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r",
      transactions: 31,
      timestamp: "6 min ago",
      validator: "Node #089"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "default";
      case "verifying": return "secondary";
      case "pending": return "outline";
      case "failed": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4" />;
      case "verifying": return <Clock className="w-4 h-4" />;
      case "pending": return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Blockchain Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {blockchainStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <Zap className="w-8 h-8 text-green-500" />
              </div>
              <div className="flex items-center mt-2 text-sm">
                <span className="text-green-500">{stat.trend}</span>
                <span className="text-muted-foreground ml-1">última hora</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Verification Queue */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-500" />
              Fila de Verificação
            </CardTitle>
            <CardDescription>
              Transações aguardando verificação blockchain
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {verificationQueue.map((item) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">{item.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getPriorityColor(item.priority)}>
                        {item.priority}
                      </Badge>
                      <Badge variant={getStatusColor(item.status)}>
                        {getStatusIcon(item.status)}
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">{item.data}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Transaction ID</p>
                      <p className="text-muted-foreground font-mono">{item.id}</p>
                    </div>
                    <div>
                      <p className="font-medium">Gas Estimate</p>
                      <p className="text-muted-foreground">{item.gasEstimate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                    <Button size="sm" variant="outline">
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Blocks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              Blocos Recentes
            </CardTitle>
            <CardDescription>
              Últimos blocos adicionados à blockchain
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBlocks.map((block) => (
                <div key={block.blockNumber} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                        <Hash className="w-4 h-4 text-green-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Bloco #{block.blockNumber}</h4>
                        <p className="text-sm text-muted-foreground">{block.transactions} transações</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{block.timestamp}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium">Hash</p>
                      <p className="text-xs text-muted-foreground font-mono break-all">
                        {block.hash}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Validador: {block.validator}</span>
                      <Button size="sm" variant="ghost">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Verificado
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Network Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-green-500" />
            Status da Rede Blockchain
          </CardTitle>
          <CardDescription>
            Saúde e performance da rede blockchain
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-medium mb-2">Consenso da Rede</p>
              <Progress value={98.7} className="h-3 mb-2" />
              <p className="text-xs text-muted-foreground">98.7% dos nós em consenso</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Throughput</p>
              <Progress value={85} className="h-3 mb-2" />
              <p className="text-xs text-muted-foreground">85 TPS (transações por segundo)</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Latência</p>
              <Progress value={92} className="h-3 mb-2" />
              <p className="text-xs text-muted-foreground">Latência média: 0.3s</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};