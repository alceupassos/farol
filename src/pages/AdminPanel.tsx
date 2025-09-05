import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { generateSiteAccessCode } from '@/utils/siteCrypto';
import { QRCodeSVG } from 'qrcode.react';
import { Shield, Plus, Eye, EyeOff, Download, Clock, Users, Activity, Key } from 'lucide-react';

interface SiteAccessCode {
  id: string;
  code_name: string;
  encrypted_secret: string;
  salt: string;
  is_active: boolean;
  created_at: string;
  expires_at: string | null;
  last_used_at: string | null;
}

interface AccessLog {
  id: string;
  success: boolean;
  attempted_at: string;
  ip_address: unknown;
  user_agent: unknown;
  code_used?: string;
}

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [accessCodes, setAccessCodes] = useState<SiteAccessCode[]>([]);
  const [accessLogs, setAccessLogs] = useState<AccessLog[]>([]);
  const [newCodeName, setNewCodeName] = useState('');
  const [showSecret, setShowSecret] = useState<string | null>(null);
  const [generatedQR, setGeneratedQR] = useState<{ qrUri: string; secret: string } | null>(null);
  const [hasActiveCodes, setHasActiveCodes] = useState(false);

  const adminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simple admin authentication (in production, use proper hashing)
      if (email === 'alceupassos@gmail.com' && password === 'B5b0dcf500@#') {
        setIsAuthenticated(true);
        loadAdminData();
      } else {
        setError('Credenciais inválidas');
      }
    } catch (err) {
      setError('Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  const loadAdminData = async () => {
    try {
      // Load access codes
      const { data: codes } = await supabase
        .from('site_access_codes')
        .select('*')
        .order('created_at', { ascending: false });

      if (codes) {
        setAccessCodes(codes);
        setHasActiveCodes(codes.some(code => code.is_active));
      }

      // Load access logs
      const { data: logs } = await supabase
        .from('site_access_logs')
        .select('*')
        .order('attempted_at', { ascending: false })
        .limit(50);

      if (logs) setAccessLogs(logs);
    } catch (err) {
      console.error('Error loading admin data:', err);
    }
  };

  const generateNewAccessCode = async () => {
    if (!newCodeName.trim()) {
      setError('Nome do código é obrigatório');
      return;
    }

    try {
      setLoading(true);
      const { secret, salt, encryptedSecret, qrUri } = generateSiteAccessCode(newCodeName);

      const { error } = await supabase
        .from('site_access_codes')
        .insert({
          code_name: newCodeName,
          encrypted_secret: encryptedSecret,
          salt: salt,
          is_active: true
        });

      if (error) throw error;

      setGeneratedQR({ qrUri, secret });
      setNewCodeName('');
      loadAdminData();
    } catch (err) {
      setError('Erro ao gerar código de acesso');
    } finally {
      setLoading(false);
    }
  };

  const toggleCodeStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('site_access_codes')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      loadAdminData();
    } catch (err) {
      setError('Erro ao alterar status do código');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Painel Admin</CardTitle>
            <CardDescription>Gerenciamento de códigos de acesso</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={adminLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  autoComplete="username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Shield className="w-8 h-8 text-primary" />
              Painel Admin
            </h1>
            <p className="text-muted-foreground">Gerenciamento de códigos de acesso ao sistema</p>
          </div>
          <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
            Sair
          </Button>
        </div>

        <Tabs defaultValue="codes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="codes" className="flex items-center gap-2">
              <Key className="w-4 h-4" />
              Códigos
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Logs
            </TabsTrigger>
            <TabsTrigger value="generate" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Gerar Novo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="codes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Códigos de Acesso Ativos</CardTitle>
                <CardDescription>
                  Lista de todos os códigos de acesso ao sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {accessCodes.map((code) => (
                    <div key={code.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{code.code_name}</h3>
                          <Badge variant={code.is_active ? 'default' : 'secondary'}>
                            {code.is_active ? 'Ativo' : 'Inativo'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Criado em: {new Date(code.created_at).toLocaleString('pt-BR')}
                        </p>
                        {code.last_used_at && (
                          <p className="text-sm text-muted-foreground">
                            Último uso: {new Date(code.last_used_at).toLocaleString('pt-BR')}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowSecret(showSecret === code.id ? null : code.id)}
                        >
                          {showSecret === code.id ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button
                          variant={code.is_active ? 'destructive' : 'default'}
                          size="sm"
                          onClick={() => toggleCodeStatus(code.id, code.is_active)}
                        >
                          {code.is_active ? 'Desativar' : 'Ativar'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Logs de Acesso</CardTitle>
                <CardDescription>
                  Histórico de tentativas de acesso ao sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {accessLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-2">
                        <Badge variant={log.success ? 'default' : 'destructive'}>
                          {log.success ? 'Sucesso' : 'Falha'}
                        </Badge>
                        <span className="text-sm">
                          {new Date(log.attempted_at).toLocaleString('pt-BR')}
                        </span>
                      </div>
                      {log.ip_address && (
                        <span className="text-sm text-muted-foreground">{String(log.ip_address)}</span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="generate" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gerar Código Adicional</CardTitle>
                <CardDescription>
                  Criar códigos adicionais para outros administradores
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertDescription>
                    👥 <strong>Códigos adicionais:</strong> O primeiro código é criado automaticamente na página de acesso. Aqui você pode gerar códigos para outros administradores.
                  </AlertDescription>
                </Alert>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Nome do código (ex: Admin Principal)"
                    value={newCodeName}
                    onChange={(e) => setNewCodeName(e.target.value)}
                  />
                  <Button onClick={generateNewAccessCode} disabled={loading}>
                    Gerar
                  </Button>
                </div>

                {generatedQR && (
                  <div className="space-y-4 p-4 border rounded-lg bg-primary/5">
                    <h3 className="font-medium text-primary">🔐 Configure seu Google Authenticator</h3>
                    <div className="flex flex-col items-center space-y-4">
                      <QRCodeSVG value={generatedQR.qrUri} size={200} className="border-2 border-primary/20 rounded-lg p-2" />
                      <div className="text-center space-y-2">
                        <p className="text-sm text-muted-foreground">
                          <strong>1.</strong> Abra o Google Authenticator no seu celular<br/>
                          <strong>2.</strong> Toque em "+" e escolha "Escanear código QR"<br/>
                          <strong>3.</strong> Aponte a câmera para o código acima
                        </p>
                        <div className="bg-muted p-3 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Chave manual (se não conseguir escanear):</p>
                          <p className="text-xs font-mono text-primary break-all">
                            {generatedQR.secret}
                          </p>
                        </div>
                        <Alert>
                          <AlertDescription className="text-sm">
                            ⚠️ <strong>IMPORTANTE:</strong> Guarde esta chave em local seguro. Este QR code só aparece uma vez!
                          </AlertDescription>
                        </Alert>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setGeneratedQR(null)}
                        >
                          Código Configurado
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;