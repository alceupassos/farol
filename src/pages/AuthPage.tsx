import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Users, 
  Stethoscope, 
  Heart, 
  Building, 
  LogIn, 
  UserPlus,
  ArrowLeft,
  Shield,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    municipality: '',
    crm: '',
    specialty: ''
  });
  
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const userTypes = [
    {
      id: 'gestor',
      title: 'Gestor/Prefeitura',
      description: 'Secretários de saúde, prefeitos e gestores municipais',
      icon: <Building className="w-6 h-6" />,
      color: 'bg-primary/10 text-primary border-primary/20'
    },
    {
      id: 'medico',
      title: 'Médico/Profissional',
      description: 'Médicos, enfermeiros e profissionais de saúde',
      icon: <Stethoscope className="w-6 h-6" />,
      color: 'bg-secondary/10 text-secondary border-secondary/20'
    },
    {
      id: 'paciente',
      title: 'Paciente',
      description: 'Cidadãos e usuários do sistema de saúde',
      icon: <Heart className="w-6 h-6" />,
      color: 'bg-accent/10 text-accent border-accent/20'
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      toast.error('Selecione o tipo de usuário');
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast.error('Email ou senha incorretos');
          } else {
            toast.error('Erro no login: ' + error.message);
          }
        } else {
          toast.success('Login realizado com sucesso!');
          navigate('/dashboard');
        }
      } else {
        const additionalData = {
          full_name: formData.fullName,
          municipality: selectedRole === 'gestor' ? formData.municipality : '',
          crm: selectedRole === 'medico' ? formData.crm : '',
          specialty: selectedRole === 'medico' ? formData.specialty : ''
        };

        const { error } = await signUp(formData.email, formData.password, selectedRole, additionalData);
        if (error) {
          if (error.message.includes('already registered')) {
            toast.error('Este email já está cadastrado');
          } else {
            toast.error('Erro no cadastro: ' + error.message);
          }
        } else {
          toast.success('Cadastro realizado com sucesso! Verifique seu email.');
          setIsLogin(true);
        }
      }
    } catch (error) {
      toast.error('Erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const renderAdditionalFields = () => {
    if (isLogin) return null;

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Nome Completo *</Label>
          <Input
            id="fullName"
            type="text"
            placeholder="Seu nome completo"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            required
          />
        </div>

        {selectedRole === 'gestor' && (
          <div className="space-y-2">
            <Label htmlFor="municipality">Município</Label>
            <Input
              id="municipality"
              type="text"
              placeholder="Nome do município"
              value={formData.municipality}
              onChange={(e) => handleInputChange('municipality', e.target.value)}
            />
          </div>
        )}

        {selectedRole === 'medico' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="crm">CRM</Label>
              <Input
                id="crm"
                type="text"
                placeholder="Número do CRM"
                value={formData.crm}
                onChange={(e) => handleInputChange('crm', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialty">Especialidade</Label>
              <Select onValueChange={(value) => handleInputChange('specialty', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione sua especialidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clinico-geral">Clínico Geral</SelectItem>
                  <SelectItem value="cardiologia">Cardiologia</SelectItem>
                  <SelectItem value="pediatria">Pediatria</SelectItem>
                  <SelectItem value="ginecologia">Ginecologia</SelectItem>
                  <SelectItem value="ortopedia">Ortopedia</SelectItem>
                  <SelectItem value="dermatologia">Dermatologia</SelectItem>
                  <SelectItem value="enfermagem">Enfermagem</SelectItem>
                  <SelectItem value="farmacia">Farmácia</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Button 
            variant="ghost" 
            className="mb-4"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Início
          </Button>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Saúde Pública</h1>
          </div>
          
          <p className="text-lg text-muted-foreground">
            Acesso seguro para gestores, profissionais e cidadãos
          </p>
        </div>

        {/* User Type Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center">Selecione seu tipo de usuário</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {userTypes.map((type) => (
              <Card
                key={type.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedRole === type.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedRole(type.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center ${type.color}`}>
                    {type.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{type.title}</h3>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                  {selectedRole === type.id && (
                    <Badge className="mt-3">Selecionado</Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Login/Signup Form */}
        {selectedRole && (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                {isLogin ? 'Entrar' : 'Cadastrar'}
              </CardTitle>
              <CardDescription>
                {isLogin ? 'Faça login em sua conta' : 'Crie sua conta no sistema'}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha *</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Sua senha"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                  />
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirme sua senha"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      required
                    />
                  </div>
                )}

                {renderAdditionalFields()}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Processando...' : (isLogin ? 'Entrar' : 'Cadastrar')}
                </Button>

                <div className="text-center">
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça login'}
                  </Button>
                </div>
              </form>

              {!isLogin && (
                <Alert className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Para testes, você pode desabilitar a confirmação de email nas configurações do Supabase.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AuthPage;