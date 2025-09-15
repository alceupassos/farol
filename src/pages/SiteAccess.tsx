import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSiteAccess } from '@/contexts/SiteAccessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Lock, Smartphone } from 'lucide-react';
// Temporarily commented out QR code related imports
// import { QrCode, CheckCircle } from 'lucide-react';
// import { QRCodeSVG } from 'qrcode.react';
// import { generateSiteAccessCode } from '@/utils/siteCrypto';

const SiteAccess = () => {
  const { siteAccessGranted, loading, verifySiteCode } = useSiteAccess();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  
  // Temporarily commented out QR-related states
  // const [isFirstAccess, setIsFirstAccess] = useState(false);
  // const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  // const [step, setStep] = useState<'loading' | 'setup' | 'verify'>('loading');
  // const [isCreatingCode, setIsCreatingCode] = useState(false);

  // Temporarily commented out QR Code generation function
  /*
  const autoGenerateQR = async () => {
    setIsCreatingCode(true);
    setError('');
    
    try {
      console.log('🔧 Generating new site access code...');
      
      const { secret, salt, encryptedSecret, qrUri } = await generateSiteAccessCode('Sistema Principal');
      
      console.log('🔑 Generated crypto data:', {
        secretLength: secret.length,
        saltLength: salt.length,
        encryptedLength: encryptedSecret.length,
        qrUriLength: qrUri.length
      });

      setQrCodeData(qrUri);
      setStep('setup');
      setIsFirstAccess(true);

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
        
        if (error.code === '42501' || error.message?.includes('policy')) {
          setError('Configuração automática concluída. QR Code está pronto para uso.');
          console.log('ℹ️ RLS policy expected - first access setup working correctly');
        } else if (error.code === '23505') {
          setError('Sistema já configurado. Use o código do seu autenticador.');
          setStep('verify');
          return;
        } else {
          setError(`Erro no banco: ${error.message}`);
          localStorage.removeItem('site_initial_setup_completed');
        }
      } else {
        console.log('✅ Access code saved successfully:', data?.id);
        setError('');
      }
      
      console.log('🎯 QR Code ready - setup complete');
      
    } catch (error) {
      console.error('💥 Error generating access code:', error);
      setError(`Erro ao gerar código: ${(error as Error).message}`);
      localStorage.removeItem('site_initial_setup_completed');
      setStep('setup');
    } finally {
      setIsCreatingCode(false);
    }
  };
  */

  // Simplified initialization - directly show verification
  useEffect(() => {
    // No complex setup needed, just proceed to verification
    console.log('📝 Site access simplified - no QR code setup required');
  }, []);

  // Redirect if already has access
  if (siteAccessGranted) {
    return <Navigate to="/" replace />;
  }

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-lg font-medium text-foreground">Verificando configuração do sistema...</p>
        </div>
      </div>
    );
  }

  // Main verification interface - simplified without QR setup
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
              <div className="mt-3 p-3 bg-primary/10 rounded-lg">
                <p className="text-sm text-center text-primary font-medium">
                  ⚠️ Configuração temporariamente simplificada
                </p>
                <p className="text-xs text-center text-muted-foreground mt-1">
                  Insira qualquer código de 6 dígitos para acessar
                </p>
              </div>
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
              <p>Acesso temporariamente simplificado</p>
              <p className="text-xs mt-1">QR Code removido temporariamente</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SiteAccess;