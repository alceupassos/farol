import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Eye, 
  EyeOff, 
  RefreshCw, 
  User, 
  Settings,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const AuthDebugPanel = () => {
  const { user, session, userRole, loading, signInAsGuest } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);
  const [testing, setTesting] = useState(false);

  const runAuthTests = async () => {
    setTesting(true);
    const results: any = {};

    try {
      // Test 1: Check database connectivity
      try {
        const { data: testData, error: testError } = await supabase
          .from('profiles')
          .select('id')
          .limit(1);
          
        if (!testError) {
          results.databaseConnection = { status: 'success', message: 'Conexão com banco de dados funcionando' };
        } else {
          results.databaseConnection = { status: 'error', message: 'Erro na conexão: ' + testError.message };
        }
      } catch (error) {
        results.databaseConnection = { status: 'error', message: 'Erro na conexão com banco: ' + (error as Error).message };
      }

      // Test 2: Check authentication system
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          results.authSystem = { status: 'success', message: 'Sistema de autenticação funcionando' };
        }
      } catch (error: any) {
        results.databaseConnection = { status: 'error', message: `Erro DB: ${error.message}` };
      }

      // Test 3: Check user_roles table access
      try {
        const { data, error } = await supabase.from('user_roles').select('count').limit(1);
        if (!error) {
          results.userRolesAccess = { status: 'success', message: 'Acesso à tabela user_roles OK' };
        } else {
          results.userRolesAccess = { status: 'warning', message: `Erro roles: ${error.message}` };
        }
      } catch (error: any) {
        results.userRolesAccess = { status: 'error', message: `Erro roles: ${error.message}` };
      }

      // Test 4: Test guest login function
      try {
        const result = await signInAsGuest('paciente');
        if (!result.error) {
          results.guestLoginFunction = { status: 'success', message: 'Função signInAsGuest funcionando' };
        } else {
          results.guestLoginFunction = { status: 'error', message: `Erro função: ${result.error.message}` };
        }
      } catch (error: any) {
        results.guestLoginFunction = { status: 'error', message: `Erro função: ${error.message}` };
      }

    } catch (error: any) {
      results.generalError = { status: 'error', message: `Erro geral: ${error.message}` };
    }

    setTestResults(results);
    setTesting(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          variant="outline"
          size="sm"
          className="bg-background/80 backdrop-blur-sm"
        >
          <Settings className="w-4 h-4 mr-2" />
          Debug Auth
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96">
      <Card className="bg-background/95 backdrop-blur-sm shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Debug de Autenticação</CardTitle>
            <Button
              onClick={() => setIsVisible(false)}
              variant="ghost"
              size="sm"
            >
              <EyeOff className="w-4 h-4" />
            </Button>
          </div>
          <CardDescription className="text-xs">
            Informações de debug para troubleshooting
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-3">
          {/* Current Auth State */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Estado Atual</h4>
            <div className="text-xs space-y-1">
              <div className="flex items-center gap-2">
                <User className="w-3 h-3" />
                <span>Usuário:</span>
                <Badge variant={user ? "default" : "secondary"} className="text-xs">
                  {user ? user.email : 'Não logado'}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Settings className="w-3 h-3" />
                <span>Role:</span>
                <Badge variant={userRole ? "default" : "secondary"} className="text-xs">
                  {userRole || 'Nenhuma'}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-3 h-3" />
                <span>Loading:</span>
                <Badge variant={loading ? "secondary" : "default"} className="text-xs">
                  {loading ? 'Sim' : 'Não'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Test Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Testes de Sistema</h4>
              <Button
                onClick={runAuthTests}
                disabled={testing}
                variant="outline"
                size="sm"
              >
                {testing ? (
                  <RefreshCw className="w-3 h-3 animate-spin" />
                ) : (
                  <RefreshCw className="w-3 h-3" />
                )}
                Testar
              </Button>
            </div>

            {testResults && (
              <div className="space-y-1">
                {Object.entries(testResults).map(([key, result]: [string, any]) => (
                  <div key={key} className="flex items-start gap-2 text-xs">
                    {getStatusIcon(result.status)}
                    <div className="flex-1">
                      <div className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                      <div className="text-muted-foreground">{result.message}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Ações Rápidas</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => signInAsGuest('gestor')}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                Login Gestor
              </Button>
              <Button
                onClick={() => signInAsGuest('medico')}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                Login Médico
              </Button>
              <Button
                onClick={() => signInAsGuest('paciente')}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                Login Paciente
              </Button>
              <Button
                onClick={() => supabase.auth.signOut()}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                Logout
              </Button>
            </div>
          </div>

          <Alert className="py-2">
            <Info className="h-3 w-3" />
            <AlertDescription className="text-xs">
              Use este painel para diagnosticar problemas de autenticação
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthDebugPanel;