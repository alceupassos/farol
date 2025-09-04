import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Lock, Key, Shield, RefreshCw, AlertTriangle, CheckCircle } from "lucide-react";

interface EncryptionManagerProps {
  compact?: boolean;
}

export const EncryptionManager = ({ compact = false }: EncryptionManagerProps) => {
  const encryptionKeys = [
    {
      id: "key-001",
      name: "Master Encryption Key",
      algorithm: "AES-256-GCM",
      status: "active",
      expiry: "2025-01-15",
      usage: 95,
      keySize: 256
    },
    {
      id: "key-002",
      name: "Patient Data Key",
      algorithm: "ChaCha20-Poly1305",
      status: "active",
      expiry: "2024-12-30",
      usage: 67,
      keySize: 256
    },
    {
      id: "key-003",
      name: "Communication Key",
      algorithm: "RSA-4096",
      status: "rotating",
      expiry: "2024-06-15",
      usage: 23,
      keySize: 4096
    },
    {
      id: "key-004",
      name: "Backup Key",
      algorithm: "AES-256-CBC",
      status: "standby",
      expiry: "2025-03-20",
      usage: 0,
      keySize: 256
    }
  ];

  const encryptionStats = [
    { label: "Dados Criptografados", value: "100%", status: "excellent" },
    { label: "Chaves Ativas", value: "3", status: "good" },
    { label: "Rotação Automática", value: "Ativa", status: "good" },
    { label: "Última Rotação", value: "2h ago", status: "good" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "rotating": return "secondary";
      case "standby": return "outline";
      case "expired": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="w-4 h-4" />;
      case "rotating": return <RefreshCw className="w-4 h-4 animate-spin" />;
      case "standby": return <Lock className="w-4 h-4" />;
      case "expired": return <AlertTriangle className="w-4 h-4" />;
      default: return <Lock className="w-4 h-4" />;
    }
  };

  if (compact) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-green-500" />
            Criptografia Resumida
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {encryptionStats.map((stat, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm font-medium">{stat.label}</span>
                <span className="text-sm text-muted-foreground">{stat.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Encryption Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {encryptionStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <Lock className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Encryption Keys Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5 text-green-500" />
            Gerenciamento de Chaves
          </CardTitle>
          <CardDescription>
            Controle e monitore as chaves de criptografia do sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {encryptionKeys.map((key) => (
              <div key={key.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                      <Key className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{key.name}</h4>
                      <p className="text-sm text-muted-foreground">{key.algorithm}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusColor(key.status)}>
                      {getStatusIcon(key.status)}
                      {key.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium">Key Size</p>
                    <p className="text-sm text-muted-foreground">{key.keySize} bits</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Usage</p>
                    <div className="space-y-1">
                      <Progress value={key.usage} className="h-2" />
                      <p className="text-xs text-muted-foreground">{key.usage}%</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Expiry</p>
                    <p className="text-sm text-muted-foreground">{key.expiry}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Rotate
                    </Button>
                    <Button size="sm" variant="outline">
                      <Shield className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Encryption Protocols */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" />
            Protocolos de Criptografia
          </CardTitle>
          <CardDescription>
            Algoritmos e protocolos de segurança ativos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Criptografia Simétrica</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 border rounded">
                  <span className="font-medium">AES-256-GCM</span>
                  <Badge variant="default">Ativo</Badge>
                </div>
                <div className="flex justify-between items-center p-2 border rounded">
                  <span className="font-medium">ChaCha20-Poly1305</span>
                  <Badge variant="default">Ativo</Badge>
                </div>
                <div className="flex justify-between items-center p-2 border rounded">
                  <span className="font-medium">AES-256-CBC</span>
                  <Badge variant="secondary">Standby</Badge>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Criptografia Assimétrica</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 border rounded">
                  <span className="font-medium">RSA-4096</span>
                  <Badge variant="default">Ativo</Badge>
                </div>
                <div className="flex justify-between items-center p-2 border rounded">
                  <span className="font-medium">ECDSA P-384</span>
                  <Badge variant="default">Ativo</Badge>
                </div>
                <div className="flex justify-between items-center p-2 border rounded">
                  <span className="font-medium">Ed25519</span>
                  <Badge variant="secondary">Disponível</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};