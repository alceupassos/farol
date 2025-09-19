import React, { useState, useEffect } from 'react';
import * as OTPAuth from 'otplib';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Shield, Copy } from 'lucide-react';
import { toast } from 'sonner';

export const TOTPHelper: React.FC = () => {
  const [currentToken, setCurrentToken] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(30);

  const secret = 'JBSWY3DPEHPK3PXP';

  useEffect(() => {
    const updateToken = () => {
      try {
        console.log('Generating Google Authenticator token');
        
        // Configure otplib for Google Authenticator
        OTPAuth.authenticator.options = {
          step: 30,
          digits: 6
        };
        
        // Generate the current token
        const token = OTPAuth.authenticator.generate(secret);
        
        console.log('Generated Google Auth token:', token);
        console.log('Current time:', new Date().toISOString());
        console.log('Unix timestamp:', Math.floor(Date.now() / 1000));
        
        setCurrentToken(token);
        
        // Calculate time remaining until next token
        const now = Math.floor(Date.now() / 1000);
        const remaining = 30 - (now % 30);
        setTimeRemaining(remaining);
        
        console.log('Time remaining until next code:', remaining);
      } catch (error) {
        console.error('Error generating token:', error);
        setCurrentToken('ERROR');
      }
    };

    // Update immediately
    updateToken();

    // Update every second
    const interval = setInterval(updateToken, 1000);

    return () => clearInterval(interval);
  }, []);

  const copyToken = () => {
    navigator.clipboard.writeText(currentToken);
    toast.success('Código copiado para a área de transferência!');
  };

  const getProgressColor = () => {
    if (timeRemaining > 20) return 'bg-green-500';
    if (timeRemaining > 10) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2 text-green-800">
          <Shield className="h-5 w-5" />
          Código TOTP Atual
        </CardTitle>
        <CardDescription className="text-green-600">
          Para testes - use este código no login
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Token */}
        <div className="text-center">
          <div 
            className="text-4xl font-mono font-bold text-green-800 bg-white/70 rounded-lg p-4 cursor-pointer hover:bg-white/90 transition-colors"
            onClick={copyToken}
            title="Clique para copiar"
          >
            {currentToken || '------'}
          </div>
          <p className="text-xs text-green-600 mt-2 flex items-center justify-center gap-1">
            <Copy className="h-3 w-3" />
            Clique para copiar
          </p>
        </div>

        {/* Time Remaining */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-green-700 flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Expira em:
            </span>
            <Badge variant="outline" className="text-green-800 border-green-300">
              {timeRemaining}s
            </Badge>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-1000 ${getProgressColor()}`}
              style={{ width: `${(timeRemaining / 30) * 100}%` }}
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-green-100 border border-green-200 rounded-lg p-3">
          <h4 className="text-sm font-medium text-green-900 mb-1">
            📱 Como usar:
          </h4>
          <ul className="text-xs text-green-700 space-y-1">
            <li>• Copie o código acima</li>
            <li>• Cole na tela de login TOTP</li>
            <li>• O código muda a cada 30 segundos</li>
            <li>• Use antes que expire!</li>
          </ul>
        </div>

        {/* Secret Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <h4 className="text-sm font-medium text-blue-900 mb-1">
            🔑 Secret usado:
          </h4>
          <p className="text-xs font-mono text-blue-700 bg-white/70 rounded px-2 py-1">
            {secret}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
