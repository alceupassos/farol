import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { QRCodeSVG } from 'qrcode.react';
import { Shield, Plus, Eye, EyeOff, Download, Users, Activity, Key, LogOut } from 'lucide-react';

interface SiteAccessCode {
  id: string;
  code_name: string;
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

interface AdminUser {
  id: string;
  email: string;
}

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [error, setError] = useState('');

  const [accessCodes, setAccessCodes] = useState<SiteAccessCode[]>([]);
  const [accessLogs, setAccessLogs] = useState<AccessLog[]>([]);
  const [newCodeName, setNewCodeName] = useState('');
  const [showSecret, setShowSecret] = useState<string | null>(null);
  const [generatedQR, setGeneratedQR] = useState<{ qrUri: string; secret: string } | null>(null);
  const [hasActiveCodes, setHasActiveCodes] = useState(false);
  const [codeSecrets, setCodeSecrets] = useState<Record<string, { secret: string; qrUri: string }>>({});
  const [secretLoadingId, setSecretLoadingId] = useState<string | null>(null);

  const resetAdminState = () => {
    setAccessCodes([]);
    setAccessLogs([]);
    setCodeSecrets({});
    setGeneratedQR(null);
    setShowSecret(null);
    setHasActiveCodes(false);
  };

  const loadAdminData = useCallback(
    async (token?: string) => {
      const activeToken = token ?? sessionToken;
      if (!activeToken) {
        return;
      }

      try {
        setIsLoadingData(true);
        const { data, error: invokeError } = await supabase.functions.invoke('site-access-admin', {
          body: {
            action: 'overview',
            sessionToken: activeToken,
          },
        });

        if (invokeError) {
          console.error('Error invoking site-access-admin overview:', invokeError);
          throw new Error(invokeError.message ?? 'Erro ao carregar dados administrativos');
        }

        setAccessCodes(data?.codes ?? []);
        setAccessLogs(data?.logs ?? []);
        setHasActiveCodes(Boolean(data?.codes?.some((code: SiteAccessCode) => code.is_active)));
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar dados administrativos');
      } finally {
        setIsLoadingData(false);
      }
    },
    [sessionToken]
  );

  const adminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      setAuthLoading(true);
      const { data, error: invokeError } = await supabase.functions.invoke('admin-auth', {
        body: {
          action: 'login',
          email: email.trim().toLowerCase(),
          password,
          user_agent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
        },
      });

      if (invokeError) {
        console.error('Erro ao autenticar admin:', invokeError);
        throw new Error(invokeError.message ?? 'Não foi possível autenticar');
      }

      if (!data?.success || !data.sessionToken) {
        setError(data?.error ?? 'Credenciais inválidas');
        return;
      }

      setSessionToken(data.sessionToken);
      setAdminUser(data.adminUser ?? null);
      setIsAuthenticated(true);
      await loadAdminData(data.sessionToken);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    if (sessionToken) {
      await supabase.functions.invoke('admin-auth', {
        body: {
          action: 'logout',
          sessionToken,
        },
      });
    }

    setIsAuthenticated(false);
    setSessionToken(null);
    setAdminUser(null);
    resetAdminState();
  };

  const generateNewAccessCode = async () => {
    if (!sessionToken) {
      setError('Sessão expirada. Faça login novamente.');
      return;
    }

    if (!newCodeName.trim()) {
      setError('Nome do código é obrigatório');
      return;
    }

    try {
      setActionLoading(true);
      setError('');
      const { data, error: invokeError } = await supabase.functions.invoke('site-access-admin', {
        body: {
          action: 'create_code',
          sessionToken,
          codeName: newCodeName.trim(),
        },
      });

      if (invokeError) {
        console.error('Erro ao gerar código de acesso:', invokeError);
        throw new Error(invokeError.message ?? 'Não foi possível criar o código');
      }

      if (!data?.code || !data?.secret || !data?.qrUri) {
        throw new Error('Resposta inválida ao gerar código');
      }

      setGeneratedQR({ secret: data.secret, qrUri: data.qrUri });
      setNewCodeName('');
      await loadAdminData(sessionToken);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Erro ao gerar código de acesso');
    } finally {
      setActionLoading(false);
    }
  };

  const toggleCodeStatus = async (id: string, currentStatus: boolean) => {
    if (!sessionToken) {
      setError('Sessão expirada. Faça login novamente.');
      return;
    }

    try {
      setActionLoading(true);
      const { error: invokeError } = await supabase.functions.invoke('site-access-admin', {
        body: {
          action: 'update_status',
          sessionToken,
          codeId: id,
          isActive: !currentStatus,
        },
      });

      if (invokeError) {
        console.error('Erro ao atualizar status do código:', invokeError);
        throw new Error(invokeError.message ?? 'Não foi possível atualizar o status');
      }

      await loadAdminData(sessionToken);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Erro ao atualizar status do código');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRevealSecret = async (codeId: string) => {
    if (showSecret === codeId) {
      setShowSecret(null);
      return;
    }

    if (!sessionToken) {
      setError('Sessão expirada. Faça login novamente.');
      return;
    }

    if (!codeSecrets[codeId]) {
      try {
        setSecretLoadingId(codeId);
        const { data, error: invokeError } = await supabase.functions.invoke('site-access-admin', {
          body: {
            action: 'get_code_secret',
            sessionToken,
            codeId,
          },
        });

        if (invokeError) {
          console.error('Erro ao obter segredo do código:', invokeError);
          throw new Error(invokeError.message ?? 'Não foi possível recuperar o segredo');
        }

        if (!data?.secret || !data?.qrUri) {
          throw new Error('Resposta inválida ao recuperar segredo');
        }

        setCodeSecrets((prev) => ({
          ...prev,
          [codeId]: { secret: data.secret, qrUri: data.qrUri },
        }));
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Erro ao recuperar segredo do código');
        return;
      } finally {
        setSecretLoadingId(null);
      }
    }

    setShowSecret(codeId);
  };

  useEffect(() => {
    if (isAuthenticated && sessionToken) {
      void loadAdminData(sessionToken);
    }
  }, [isAuthenticated, sessionToken, loadAdminData]);

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
              <Button type="submit" className="w-full" disabled={authLoading}>
                {authLoading ? 'Entrando...' : 'Entrar'}
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
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Shield className="w-8 h-8 text-primary" />
              Painel Admin
            </h1>
            <p className="text-muted-foreground">
              {adminUser?.email ? `Logado como ${adminUser.email}` : 'Gerenciamento de códigos de acesso ao sistema'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {hasActiveCodes ? (
              <Badge variant="default" className="bg-emerald-100 text-emerald-700">
                Códigos ativos: {accessCodes.filter((code) => code.is_active).length}
              </Badge>
            ) : (
              <Badge variant="destructive">Nenhum código ativo</Badge>
            )}
            <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
          </div>
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
                {isLoadingData ? (
                  <p className="text-sm text-muted-foreground">Carregando códigos...</p>
                ) : (
                  <div className="space-y-4">
                    {accessCodes.map((code) => {
                      const secretInfo = codeSecrets[code.id];
                      const downloadHref = secretInfo
                        ? `data:text/plain;charset=utf-8,${encodeURIComponent(secretInfo.qrUri)}`
                        : undefined;

                      return (
                      <div key={code.id} className="p-4 border rounded-lg space-y-3">
                        <div className="flex items-center justify-between">
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
                              onClick={() => handleRevealSecret(code.id)}
                              disabled={actionLoading || secretLoadingId === code.id}
                            >
                              {showSecret === code.id ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                            <Button
                              variant={code.is_active ? 'destructive' : 'default'}
                              size="sm"
                              onClick={() => toggleCodeStatus(code.id, code.is_active)}
                              disabled={actionLoading}
                            >
                              {code.is_active ? 'Desativar' : 'Ativar'}
                            </Button>
                          </div>
                        </div>

                        {showSecret === code.id && (
                          <div className="border rounded-lg p-3 bg-muted/40">
                            {secretLoadingId === code.id && !secretInfo ? (
                              <p className="text-sm text-muted-foreground">Carregando segredo...</p>
                            ) : (
                              <div className="space-y-2">
                                <p className="text-xs text-muted-foreground">Use este código no autenticador:</p>
                                <p className="text-xs font-mono break-all bg-background/60 p-2 rounded">
                                  {secretInfo?.secret ?? 'Segredo indisponível'}
                                </p>
                                {secretInfo?.qrUri && (
                                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                    <QRCodeSVG value={secretInfo.qrUri} size={140} className="border rounded p-2 bg-white" />
                                    {downloadHref && (
                                      <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
                                        <a href={downloadHref} download={`site-access-${code.code_name}.txt`}>
                                          <Download className="w-4 h-4" />
                                          Baixar otpauth
                                        </a>
                                      </Button>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      )})}
                    {accessCodes.length === 0 && (
                      <p className="text-sm text-muted-foreground">Nenhum código cadastrado ainda.</p>
                    )}
                  </div>
                )}
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
                {isLoadingData ? (
                  <p className="text-sm text-muted-foreground">Carregando logs...</p>
                ) : (
                  <div className="space-y-2">
                    {accessLogs.map((log) => (
                      <div key={log.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 border rounded">
                        <div className="flex items-center gap-2">
                          <Badge variant={log.success ? 'default' : 'destructive'}>
                            {log.success ? 'Sucesso' : 'Falha'}
                          </Badge>
                          <span className="text-sm">
                            {new Date(log.attempted_at).toLocaleString('pt-BR')}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          {log.ip_address && <span className="flex items-center gap-1"><Users className="w-3 h-3" />{String(log.ip_address)}</span>}
                          {log.user_agent && <span className="hidden sm:flex items-center gap-1"><Activity className="w-3 h-3" />{String(log.user_agent).slice(0, 60)}...</span>}
                        </div>
                      </div>
                    ))}
                    {accessLogs.length === 0 && (
                      <p className="text-sm text-muted-foreground">Nenhum log registrado ainda.</p>
                    )}
                  </div>
                )}
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
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    placeholder="Nome do código (ex: Admin Principal)"
                    value={newCodeName}
                    onChange={(e) => setNewCodeName(e.target.value)}
                    disabled={actionLoading}
                  />
                  <Button onClick={generateNewAccessCode} disabled={actionLoading}>
                    {actionLoading ? 'Gerando...' : 'Gerar'}
                  </Button>
                </div>

                {generatedQR && (
                  <div className="space-y-4 p-4 border rounded-lg bg-primary/5">
                    <h3 className="font-medium text-primary">🔐 Configure seu Google Authenticator</h3>
                    <div className="flex flex-col items-center space-y-4">
                      <QRCodeSVG value={generatedQR.qrUri} size={200} className="border-2 border-primary/20 rounded-lg p-2 bg-white" />
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
