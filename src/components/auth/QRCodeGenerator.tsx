import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { QrCode, Smartphone, Copy, CheckCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import QRCodeLib from 'qrcode';
import { TOTPHelper } from './TOTPHelper';
import { testTOTP } from '../../utils/totpTest';

export const QRCodeGenerator: React.FC = () => {
  const [email, setEmail] = useState('admin@saudepublica.com');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [secret, setSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  
  const { generateTOTPSecret } = useAuth();

  const generateQRCode = async () => {
    setLoading(true);
    try {
      const result = await generateTOTPSecret(email);
      
      if (result.error) {
        toast.error('Erro ao gerar QR Code');
        return;
      }

      if (result.secret && result.qrCode) {
        setSecret(result.secret);
        
        // Generate QR code image
        const qrCodeDataUrl = await QRCodeLib.toDataURL(result.qrCode, {
          width: 256,
          margin: 2,
          color: {
            dark: '#1f2937',
            light: '#ffffff'
          }
        });
        
        setQrCodeUrl(qrCodeDataUrl);
        setGenerated(true);
        toast.success('QR Code gerado com sucesso!');
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast.error('Erro ao gerar QR Code');
    } finally {
      setLoading(false);
    }
  };

  const copySecret = () => {
    navigator.clipboard.writeText(secret);
    toast.success('Código secreto copiado!');
  };

  const goToLogin = () => {
    window.location.href = '/';
  };

  // Test TOTP on component mount
  useEffect(() => {
    console.log('Testing Simple TOTP...');
    const testResult = testTOTP();
    console.log('Simple TOTP test result:', testResult);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-start pt-8">
        {/* QR Code Generator */}
        <Card className="w-full shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
            <QrCode className="h-8 w-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Configurar Google Authenticator
            </CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Configure a autenticação de dois fatores
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {!generated ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email para configuração
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                  disabled={loading}
                  required
                />
              </div>

              <Button
                onClick={generateQRCode}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-3"
                disabled={loading || !email}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Gerando QR Code...
                  </div>
                ) : (
                  <>
                    <QrCode className="h-4 w-4 mr-2" />
                    Gerar QR Code
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* QR Code Display */}
              <div className="text-center space-y-4">
                <div className="bg-white p-4 rounded-lg border-2 border-gray-200 inline-block">
                  <img 
                    src={qrCodeUrl} 
                    alt="QR Code para Google Authenticator" 
                    className="w-64 h-64"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Código Secreto (backup manual)
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      value={secret}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copySecret}
                      className="shrink-0"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <Alert className="border-green-200 bg-green-50">
                <Smartphone className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <div className="space-y-2">
                    <p className="font-medium">Como configurar:</p>
                    <ol className="list-decimal list-inside space-y-1 text-sm">
                      <li>Abra o Google Authenticator no seu celular</li>
                      <li>Toque em "+" para adicionar uma conta</li>
                      <li>Escolha "Digitalizar código QR"</li>
                      <li>Aponte a câmera para o QR Code acima</li>
                      <li>Sua conta será adicionada automaticamente</li>
                    </ol>
                  </div>
                </AlertDescription>
              </Alert>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setGenerated(false)}
                  className="flex-1"
                >
                  Gerar Novo
                </Button>
                <Button
                  onClick={goToLogin}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Ir para Login
                </Button>
              </div>

              {/* Success Message */}
              <Alert className="border-blue-200 bg-blue-50">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <p className="font-medium">✅ QR Code gerado com sucesso!</p>
                  <p className="text-sm mt-1">
                    Após configurar no Google Authenticator, você pode fazer login usando os códigos de 6 dígitos.
                  </p>
                </AlertDescription>
              </Alert>
            </div>
          )}

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-yellow-900 mb-2">
                📱 Como usar com Google Authenticator:
              </h4>
              <p className="text-xs text-yellow-700 mb-2">
                1. Abra o Google Authenticator no seu celular
              </p>
              <p className="text-xs text-yellow-700 mb-2">
                2. Toque em "+" e escolha "Digitalizar código QR"
              </p>
              <p className="text-xs text-yellow-700 mb-2">
                3. Aponte para o QR Code acima
              </p>
              <p className="text-xs text-yellow-700">
                4. Use o código de 6 dígitos que aparecerá no app para fazer login
              </p>
          </div>
        </CardContent>
      </Card>

      {/* TOTP Helper */}
      <TOTPHelper />
      </div>
    </div>
  );
};
