import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Copy, CheckCircle2, AlertCircle, Download } from 'lucide-react';
import { generateTOTPUri } from '@/utils/totp';
import { use2FA } from '@/hooks/use2FA';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface GoogleAuthenticatorSetupProps {
  onComplete: () => void;
}

interface SetupData {
  secret: string;
  backupCodes: string[];
}

interface GoogleAuthenticatorSetupProps {
  onComplete: () => void;
  setupData: SetupData;
}

export const GoogleAuthenticatorSetup: React.FC<GoogleAuthenticatorSetupProps> = ({ onComplete, setupData }) => {
  const { user } = useAuth();
  const { verify2FACode, activate2FA } = use2FA();
  const [qrUri, setQrUri] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showBackupCodes, setShowBackupCodes] = useState(false);

  const { secret, backupCodes } = setupData;

  useEffect(() => {
    if (user && secret) {
      const uri = generateTOTPUri(secret, user.email || '');
      setQrUri(uri);
    }
  }, [secret, user]);

  const handleCopySecret = () => {
    navigator.clipboard.writeText(secret);
    toast.success('Chave secreta copiada!');
  };

  const handleCopyBackupCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Código de backup copiado!');
  };

  const handleVerifyCode = async () => {
    if (verificationCode.length !== 6) {
      toast.error('Digite um código de 6 dígitos');
      return;
    }

    setIsVerifying(true);
    try {
      const isValid = await verify2FACode(verificationCode);
      if (isValid) {
        await activate2FA();
        setIsVerified(true);
        setShowBackupCodes(true);
        toast.success('Autenticação configurada com sucesso!');
      } else {
        toast.error('Código inválido. Verifique o código no seu app.');
      }
    } catch (error) {
      toast.error('Erro ao verificar código');
    } finally {
      setIsVerifying(false);
    }
  };

  const downloadBackupCodes = () => {
    const content = `Códigos de Backup - Saúde Municipal+\n\nGuarde estes códigos em local seguro. Cada código pode ser usado apenas uma vez.\n\n${backupCodes.join('\n')}\n\nGerado em: ${new Date().toLocaleString('pt-BR')}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'codigos-backup-2fa.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Códigos de backup baixados!');
  };

  if (!secret || !qrUri) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Configurando Autenticador
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Gerando configuração...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {!isVerified ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Configure o Google Authenticator
            </CardTitle>
            <CardDescription>
              Escaneie o QR code com seu app autenticador ou digite a chave manualmente
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* QR Code */}
            <div className="text-center space-y-4">
              <div className="bg-white p-4 rounded-lg inline-block">
                <QRCodeSVG value={qrUri} size={200} />
              </div>
              <p className="text-sm text-muted-foreground">
                Escaneie este código com Google Authenticator, Authy ou similar
              </p>
            </div>

            {/* Manual Entry */}
            <div className="space-y-2">
              <Label>Ou digite a chave manualmente:</Label>
              <div className="flex gap-2">
                <Input 
                  value={secret} 
                  readOnly 
                  className="font-mono text-sm"
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handleCopySecret}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Steps */}
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <p className="font-medium">Passos para configurar:</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Baixe o Google Authenticator ou Authy</li>
                    <li>Adicione uma nova conta</li>
                    <li>Escaneie o QR code ou digite a chave</li>
                    <li>Digite o código de 6 dígitos abaixo</li>
                  </ol>
                </div>
              </AlertDescription>
            </Alert>

            {/* Verification */}
            <div className="space-y-3">
              <Label htmlFor="verification">Digite o código do seu app:</Label>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                <p className="text-sm text-yellow-800">
                  🧪 <strong>Modo Desenvolvimento:</strong> Use o código <code className="bg-yellow-100 px-1 rounded">322322</code> para testar
                </p>
              </div>
              <div className="flex gap-2">
                <Input
                  id="verification"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  className="font-mono text-lg text-center"
                  maxLength={6}
                />
                <Button 
                  onClick={handleVerifyCode}
                  disabled={verificationCode.length !== 6 || isVerifying}
                >
                  {isVerifying ? 'Verificando...' : 'Verificar'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="h-5 w-5" />
              Autenticação Configurada!
            </CardTitle>
            <CardDescription>
              Sua autenticação de dois fatores está ativa. Salve os códigos de backup.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!showBackupCodes ? (
              <Button onClick={() => setShowBackupCodes(true)}>
                Ver Códigos de Backup
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Códigos de Backup</h3>
                  <Button variant="outline" size="sm" onClick={downloadBackupCodes}>
                    <Download className="h-4 w-4 mr-2" />
                    Baixar
                  </Button>
                </div>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Guarde estes códigos em local seguro. Use-os se perder acesso ao seu celular.
                    Cada código pode ser usado apenas uma vez.
                  </AlertDescription>
                </Alert>
                <div className="grid grid-cols-2 gap-2">
                  {backupCodes.map((code, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono">
                        {code}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyBackupCode(code)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button onClick={onComplete} className="w-full">
                  Concluir Configuração
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};