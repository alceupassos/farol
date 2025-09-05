import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, ArrowLeft } from 'lucide-react';
import { GoogleAuthenticatorSetup } from '@/components/auth/GoogleAuthenticatorSetup';
import { use2FA } from '@/hooks/use2FA';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Setup2FA = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setup2FA, has2FA, check2FAStatus } = use2FA();
  const [setupData, setSetupData] = useState<{ secret: string; backupCodes: string[] } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSetup, setShowSetup] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    check2FAStatus();
  }, [user]);

  const handleStart2FASetup = async () => {
    setIsLoading(true);
    try {
      const data = await setup2FA();
      setSetupData(data);
      setShowSetup(true);
    } catch (error) {
      toast.error('Erro ao configurar autenticação');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetupComplete = () => {
    toast.success('Autenticação de dois fatores configurada com sucesso!');
    navigate('/dashboard');
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  if (has2FA) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center space-y-2">
          <Shield className="h-12 w-12 mx-auto text-primary" />
          <h1 className="text-3xl font-bold">Configurar Autenticação Segura</h1>
          <p className="text-muted-foreground">
            Proteja sua conta com autenticação de dois fatores
          </p>
        </div>

        {!showSetup ? (
          <Card>
            <CardHeader>
              <CardTitle>Segurança Adicional</CardTitle>
              <CardDescription>
                A autenticação de dois fatores adiciona uma camada extra de segurança à sua conta.
                Mesmo que alguém descubra sua senha, precisará do código do seu celular para acessar.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-2">
                    <p className="font-medium">Por que configurar 2FA?</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Protege contra acesso não autorizado</li>
                      <li>Mantém dados médicos seguros</li>
                      <li>Atende padrões de segurança em saúde</li>
                      <li>Fácil de usar com apps como Google Authenticator</li>
                    </ul>
                  </div>
                </AlertDescription>
              </Alert>

              <div className="flex gap-3">
                <Button 
                  onClick={handleStart2FASetup}
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? 'Configurando...' : 'Configurar Agora'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleSkip}
                  className="flex-1"
                >
                  Pular (Não Recomendado)
                </Button>
              </div>

              <div className="text-center">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/dashboard')}
                  className="text-sm"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar ao Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          setupData && (
            <GoogleAuthenticatorSetup 
              onComplete={handleSetupComplete}
              setupData={setupData}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Setup2FA;