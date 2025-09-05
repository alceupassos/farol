import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSiteAccess } from '@/contexts/SiteAccessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Lock, Smartphone, QrCode, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { QRCodeSVG } from 'qrcode.react';
import { generateSiteAccessCode } from '@/utils/siteCrypto';

const SiteAccess = () => {
  const { siteAccessGranted, loading, verifySiteCode } = useSiteAccess();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isFirstAccess, setIsFirstAccess] = useState(false);
  const [qrCodeData, setQrCodeData] = useState<{ qrUri: string; secret: string } | null>(null);
  const [step, setStep] = useState<'loading' | 'setup' | 'verify'>('loading');
  const [isCreatingCode, setIsCreatingCode] = useState(false);

  // Auto-generate QR Code function
  const autoGenerateQR = async () => {
    setIsCreatingCode(true);
    try {
      const { secret, salt, encryptedSecret, qrUri } = generateSiteAccessCode('Sistema Principal');
      
      // Save to database
      const { error } = await supabase
        .from('site_access_codes')
        .insert({
          code_name: 'Sistema Principal',
          encrypted_secret: encryptedSecret,
          salt: salt,
          is_active: true
        });

      if (error) {
        console.error('Error saving access code:', error);
        setError('Erro ao configurar o código de acesso');
        setStep('verify');
        return;
      }

      setQrCodeData({ qrUri, secret });
      setStep('setup');
      setIsFirstAccess(true);
    } catch (error) {
      console.error('Error generating access code:', error);
      setError('Erro ao gerar código de acesso');
      setStep('verify');
    } finally {
      setIsCreatingCode(false);
    }
  };

  // Check if this is first access and auto-generate QR
  useEffect(() => {
    const checkFirstAccessAndSetup = async () => {
      try {
        const { data: accessCodes, error } = await supabase
          .from('site_access_codes')
          .select('*')
          .eq('is_active', true);

        if (error) {
          console.error('Error checking access codes:', error);
          setStep('verify');
          return;
        }

        // Check if codes exist and are valid (not temporary)
        const validCodes = accessCodes?.filter(code => 
          code.encrypted_secret !== 'temp_encrypted_secret' && 
          code.salt !== 'temp_salt' &&
          code.encrypted_secret && 
          code.salt
        ) || [];

        if (validCodes.length === 0) {
          setIsFirstAccess(true);
          // Auto-generate QR on first access
          await autoGenerateQR();
        } else {
          setIsFirstAccess(false);
          setStep('verify');
        }
      } catch (error) {
        console.error('Error in checkFirstAccess:', error);
        setStep('verify');
      }
    };

    if (!siteAccessGranted && !loading) {
      checkFirstAccessAndSetup();
    }
  }, [siteAccessGranted, loading]);

  // Redirect if already has access
  if (siteAccessGranted) {
    return <Navigate to="/" replace />;
  }

  const handleSetupAuthenticator = autoGenerateQR;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (code.length !== 6) {
      setError('O código deve ter 6 dígitos');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      const isValid = await verifySiteCode(code);
      
      if (isValid) {
        // Access granted, will redirect automatically
      } else {
        setError('Código inválido. Verifique seu aplicativo autenticador.');
        setCode('');
      }
    } catch (err) {
      setError('Erro ao verificar código. Tente novamente.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as any);
    }
  };

  if (loading || step === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-lg font-medium text-foreground">Verificando configuração do sistema...</p>
        </div>
      </div>
    );
  }

  if (step === 'setup') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
        <div className="w-full max-w-lg">
          <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <QrCode className="w-10 h-10 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Primeira Configuração</CardTitle>
                <CardDescription className="text-muted-foreground mt-2">
                  Configure o Google Authenticator para proteger o acesso ao sistema
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Smartphone className="w-4 h-4" />
                    Passo 1: Instale o Google Authenticator
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Baixe o app Google Authenticator na App Store ou Google Play
                  </p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <QrCode className="w-4 h-4" />
                    Passo 2: Configure o acesso
                  </h3>
                  {qrCodeData ? (
                    <div className="space-y-4">
                      <div className="bg-white p-6 rounded-lg mx-auto flex justify-center">
                        <QRCodeSVG value={qrCodeData.qrUri} size={180} />
                      </div>
                      
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs font-medium mb-1">Código manual:</p>
                        <p className="text-xs font-mono bg-background p-2 rounded border break-all">
                          {qrCodeData.secret}
                        </p>
                      </div>

                      <Button
                        onClick={() => setStep('verify')}
                        className="w-full"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Já configurei, continuar
                        </div>
                      </Button>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      QR Code será gerado automaticamente...
                    </p>
                  )}
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="text-center text-sm text-muted-foreground">
                <p>Este processo é feito apenas uma vez</p>
                <p className="text-xs mt-1">Após configurar, você usará códigos de 6 dígitos para acessar</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <div className="w-full max-w-lg">
        <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur">
          {qrCodeData && (
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Configure o Google Authenticator</CardTitle>
                <CardDescription className="text-muted-foreground mt-2">
                  Escaneie o QR Code abaixo com seu aplicativo Google Authenticator
                </CardDescription>
              </div>
            </CardHeader>
          )}

          {!qrCodeData && (
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="w-10 h-10 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Acesso Protegido</CardTitle>
                <CardDescription className="text-muted-foreground mt-2">
                  Digite o código do seu aplicativo autenticador para acessar o sistema
                </CardDescription>
              </div>
            </CardHeader>
          )}

          <CardContent className="space-y-6">
            {qrCodeData && (
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg mx-auto flex justify-center">
                  <QRCodeSVG value={qrCodeData.qrUri} size={200} />
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium mb-2">Código manual (se não conseguir escanear):</p>
                  <p className="text-xs font-mono bg-background p-2 rounded border break-all">
                    {qrCodeData.secret}
                  </p>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Como configurar:</h4>
                  <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>1. Abra o Google Authenticator</li>
                    <li>2. Toque em "+" ou "Adicionar conta"</li>
                    <li>3. Escaneie o QR Code acima</li>
                    <li>4. Digite o código de 6 dígitos gerado</li>
                  </ol>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code" className="text-sm font-medium flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  Código do Autenticador
                </Label>
                <Input
                  id="code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  maxLength={6}
                  className="text-center text-xl font-mono tracking-widest"
                  autoComplete="off"
                  autoFocus
                  onKeyPress={handleKeyPress}
                />
                <p className="text-xs text-muted-foreground text-center">
                  O código muda a cada 30 segundos
                </p>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isVerifying || code.length !== 6}
              >
                {isVerifying ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Verificando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Acessar Sistema
                  </div>
                )}
              </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground">
              <p>Sistema protegido por autenticação dupla</p>
              <p className="text-xs mt-1">Powered by Google Authenticator</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SiteAccess;