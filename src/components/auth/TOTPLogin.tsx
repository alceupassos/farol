import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Smartphone, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface TOTPLoginProps {
  onSuccess: () => void;
}

export const TOTPLogin: React.FC<TOTPLoginProps> = ({ onSuccess }) => {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { verifyTOTP } = useAuth();
  const fixedEmail = 'admin@saudepublica.com';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await verifyTOTP(fixedEmail, token);
      
      if (result.success) {
        toast.success('Autenticação realizada com sucesso!');
        onSuccess();
      } else {
        setError('Código inválido. Verifique o código no seu Google Authenticator.');
        toast.error('Código inválido');
      }
    } catch (err) {
      setError('Erro na autenticação. Tente novamente.');
      toast.error('Erro na autenticação');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Autenticação Segura
            </CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Digite o código do Google Authenticator
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-2">
              <Label htmlFor="token" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Código de Verificação
              </Label>
              <Input
                id="token"
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                className="w-full text-center text-2xl font-mono tracking-widest"
                disabled={loading}
                maxLength={6}
                required
              />
              <p className="text-xs text-gray-500 text-center">
                Digite o código de 6 dígitos do seu Google Authenticator
              </p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3"
              disabled={loading || token.length !== 6}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verificando...
                </div>
              ) : (
                'Autenticar'
              )}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Não tem o Google Authenticator configurado?{' '}
              <a 
                href="/qrcodenovo" 
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Configure aqui
              </a>
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-900 mb-2">
              📱 Google Authenticator + Demo:
            </h4>
            <p className="text-xs text-blue-700 mb-2">
              • Configure o Google Authenticator com QR Code em /qrcodenovo
            </p>
            <p className="text-xs text-blue-700 mb-2">
              • Use o código do app OU o código do helper na página
            </p>
            <p className="text-xs text-blue-600 font-medium">
              • Para demo: qualquer código de 6 dígitos funciona
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
