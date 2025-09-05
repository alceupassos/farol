import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Smartphone, AlertCircle, ArrowLeft } from 'lucide-react';
import { use2FA } from '@/hooks/use2FA';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Auth2FA = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { verify2FACode, has2FA, check2FAStatus } = use2FA();
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 5;

  const redirectPath = location.state?.from || '/dashboard';

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    // Check if user has 2FA enabled
    check2FAStatus().then(() => {
      // If user doesn't have 2FA, redirect to setup
      if (!has2FA) {
        navigate('/setup-2fa');
      }
    });
  }, [user, has2FA]);

  const handleVerifyCode = async () => {
    if (verificationCode.length !== 6) {
      toast.error('Digite um código de 6 dígitos');
      return;
    }

    if (attempts >= maxAttempts) {
      toast.error('Muitas tentativas. Faça login novamente.');
      await signOut();
      navigate('/auth');
      return;
    }

    setIsVerifying(true);
    try {
      const isValid = await verify2FACode(verificationCode);
      if (isValid) {
        toast.success('Código verificado com sucesso!');
        navigate(redirectPath, { replace: true });
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        setVerificationCode('');
        
        if (newAttempts >= maxAttempts) {
          toast.error('Muitas tentativas inválidas. Redirecionando para login...');
          await signOut();
          navigate('/auth');
        } else {
          toast.error(`Código inválido. ${maxAttempts - newAttempts} tentativas restantes.`);
        }
      }
    } catch (error) {
      toast.error('Erro ao verificar código');
      console.error(error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleVerifyCode();
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Shield className="h-12 w-12 mx-auto text-primary" />
          <h1 className="text-3xl font-bold">Verificação de Segurança</h1>
          <p className="text-muted-foreground">
            Digite o código do seu app autenticador
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Código de Verificação
            </CardTitle>
            <CardDescription>
              Abra seu app autenticador e digite o código de 6 dígitos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="code">Código de Verificação</Label>
              <Input
                id="code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                className="font-mono text-lg text-center tracking-widest"
                maxLength={6}
                autoComplete="one-time-code"
                autoFocus
                onKeyPress={handleKeyPress}
              />
              <p className="text-xs text-muted-foreground text-center">
                O código muda a cada 30 segundos
              </p>
            </div>

            {attempts > 0 && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Tentativas inválidas: {attempts}/{maxAttempts}
                </AlertDescription>
              </Alert>
            )}

            <Button 
              onClick={handleVerifyCode}
              disabled={verificationCode.length !== 6 || isVerifying || attempts >= maxAttempts}
              className="w-full"
            >
              {isVerifying ? 'Verificando...' : 'Verificar Código'}
            </Button>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground text-center">
                Não consegue acessar seu celular?
              </p>
              <div className="text-center space-x-2">
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Fazer Login Novamente
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-muted-foreground">
          <p>Problemas com a verificação? Entre em contato com o suporte.</p>
        </div>
      </div>
    </div>
  );
};

export default Auth2FA;