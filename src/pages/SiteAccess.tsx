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
    setError(''); // Clear any previous errors
    
    try {
      console.log('🔧 Generating new site access code...');
      
      const { secret, salt, encryptedSecret, qrUri } = generateSiteAccessCode('Sistema Principal');
      
      console.log('🔑 Generated crypto data:', {
        secretLength: secret.length,
        saltLength: salt.length,
        encryptedLength: encryptedSecret.length,
        qrUriLength: qrUri.length
      });

      // Save to database
      console.log('💾 Saving access code to database...');
      const { data, error } = await supabase
        .from('site_access_codes')
        .insert({
          code_name: 'Sistema Principal',
          encrypted_secret: encryptedSecret,
          salt: salt,
          is_active: true
        })
        .select()
        .single();

      if (error) {
        console.error('❌ Error saving access code:', error);
        setError('Erro ao salvar código de acesso no banco de dados');
        setStep('verify');
        return;
      }

      console.log('✅ Access code saved successfully:', data?.id);
      
      setQrCodeData({ qrUri, secret });
      setStep('setup');
      setIsFirstAccess(true);
      
      console.log('🎯 QR Code ready - moving to setup step');
      
    } catch (error) {
      console.error('💥 Error generating access code:', error);
      setError(`Erro ao gerar código de acesso: ${error.message}`);
      setStep('verify');
    } finally {
      setIsCreatingCode(false);
    }
  };

  // Check if this is first access and auto-generate QR
  useEffect(() => {
    const checkFirstAccessAndSetup = async () => {
      try {
        console.log('🔍 Checking for existing access codes...');
        
        const { data: accessCodes, error } = await supabase
          .from('site_access_codes')
          .select('*')
          .eq('is_active', true);

        if (error) {
          console.error('❌ Error checking access codes:', error);
          setError('Erro ao verificar configuração do sistema');
          setStep('verify');
          return;
        }

        console.log('📊 Access codes found:', accessCodes?.length || 0);

        // Check if codes exist and are valid (not temporary)
        const validCodes = accessCodes?.filter(code => 
          code.encrypted_secret && 
          code.salt &&
          code.encrypted_secret.length > 10 &&
          code.salt.length > 10
        ) || [];

        console.log('✅ Valid codes found:', validCodes.length);

        if (validCodes.length === 0) {
          console.log('🆕 First access detected - generating QR code...');
          setIsFirstAccess(true);
          // Auto-generate QR on first access
          await autoGenerateQR();
        } else {
          console.log('🔒 System already configured - showing verification');
          setIsFirstAccess(false);
          setStep('verify');
        }
      } catch (error) {
        console.error('💥 Error in checkFirstAccess:', error);
        setError('Erro inesperado ao verificar configuração');
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
                    Passo 2: Escaneie o QR Code
                  </h3>
                  {qrCodeData ? (
                    <div className="space-y-4">
                      <div className="bg-white p-6 rounded-lg mx-auto flex justify-center">
                        <QRCodeSVG value={qrCodeData.qrUri} size={180} />
                      </div>
                      
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs font-medium mb-1">Código manual (se não conseguir escanear):</p>
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
                          Configurado! Inserir código
                        </div>
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center p-4">
                      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      <span className="ml-2 text-sm text-muted-foreground">Gerando QR Code...</span>
                    </div>
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

  // Verify step - always show code input, QR code only if available
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <div className="w-full max-w-lg">
        <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <Shield className="w-10 h-10 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">Acesso Protegido</CardTitle>
              <CardDescription className="text-muted-foreground mt-2">
                Digite o código do seu aplicativo Google Authenticator
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
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