import { useState } from 'react';
import { ChevronDown, User, UserCheck, Building2, Hospital, Loader2, TestTube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { SimpleTOTP } from '@/utils/simpleTOTP';

const AccessDropdown = () => {
  const navigate = useNavigate();
  const { switchGuestRole } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [totpCode, setTotpCode] = useState('');
  const [totpError, setTotpError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const accessOptions = [
    {
      id: 'gestor',
      label: 'Gestão Municipal',
      icon: Building2,
      description: 'Acesso para gestores públicos',
      color: 'text-primary'
    },
    {
      id: 'hospital',
      label: 'Hospital',
      icon: Hospital,
      description: 'Acesso para gestão hospitalar',
      color: 'text-blue-500'
    },
    {
      id: 'laboratorio',
      label: 'Laboratórios',
      icon: TestTube,
      description: 'Hub para gestores de análises clínicas e genômica',
      color: 'text-emerald-400'
    },
    {
      id: 'medico',
      label: 'Profissional de Saúde',
      icon: UserCheck,
      description: 'Acesso para médicos e enfermeiros',
      color: 'text-secondary'
    },
    {
      id: 'paciente',
      label: 'Paciente',
      icon: User,
      description: 'Acesso para cidadãos',
      color: 'text-accent'
    }
  ];

  const handleAccessSelect = (role: string) => {
    console.log('AccessDropdown: initiating TOTP verification for role:', role);
    setSelectedRole(role);
    setTotpCode('');
    setTotpError('');
    setIsModalOpen(true);
  };

  const handleModalClose = (open: boolean) => {
    if (!open) {
      setIsModalOpen(false);
      setSelectedRole(null);
      setTotpCode('');
      setTotpError('');
      setIsVerifying(false);
    } else {
      setIsModalOpen(true);
    }
  };

  const redirectAfterRole = (role: string) => {
    if (role === 'gestor') {
      console.log('AccessDropdown: Redirecting to prefeitura dashboard');
      navigate('/prefeitura-dashboard');
    } else if (role === 'hospital') {
      console.log('AccessDropdown: Redirecting to hospital dashboard');
      navigate('/dashboard');
    } else if (role === 'laboratorio') {
      console.log('AccessDropdown: Redirecting to laboratory hub');
      navigate('/laboratorios/visao-geral');
    } else if (role === 'medico') {
      console.log('AccessDropdown: Redirecting to medical profile');
      navigate('/profile');
    } else if (role === 'paciente') {
      console.log('AccessDropdown: Redirecting to patient profile');
      navigate('/profile');
    } else {
      console.log('AccessDropdown: Redirecting to default dashboard');
      navigate('/dashboard');
    }
  };

  const handleVerifyTotp = async () => {
    if (!selectedRole) {
      console.warn('AccessDropdown: No role selected for TOTP verification');
      return;
    }

    setIsVerifying(true);
    setTotpError('');

    try {
      const sanitizedCode = totpCode.replace(/\D/g, '').slice(0, 6);
      setTotpCode(sanitizedCode);

      if (sanitizedCode.length !== 6) {
        setTotpError('Informe os 6 dígitos do código.');
        return;
      }

      const isValid = await SimpleTOTP.verify(sanitizedCode, 'JBSWY3DPEHPK3PXP', 1);

      if (isValid) {
        console.log('AccessDropdown: TOTP verification succeeded');
        const roleToApply = selectedRole;
        switchGuestRole(roleToApply);
        handleModalClose(false);
        setTimeout(() => redirectAfterRole(roleToApply), 100);
      } else {
        console.warn('AccessDropdown: Invalid TOTP code provided');
        setTotpError('Código inválido. Tente novamente.');
      }
    } catch (error) {
      console.error('AccessDropdown: Error verifying TOTP code', error);
      setTotpError('Erro ao validar o código. Tente novamente em instantes.');
    } finally {
      setIsVerifying(false);
    }
  };

  // Sempre mostrar todas as opções
  const filteredOptions = accessOptions;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Acessar Sistema
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-72 p-2" align="end">
          {filteredOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <DropdownMenuItem
                key={option.id}
                className="p-4 cursor-pointer hover:bg-muted/50 rounded-lg transition-colors"
                onClick={() => handleAccessSelect(option.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full bg-muted ${option.color}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{option.label}</div>
                    <div className="text-xs text-muted-foreground">{option.description}</div>
                  </div>
                </div>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirme seu acesso</DialogTitle>
            <DialogDescription>
              Insira o código TOTP gerado pelo seu autenticador para continuar.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground" htmlFor="totp-code">
                Código de 6 dígitos
              </label>
              <Input
                id="totp-code"
                inputMode="numeric"
                pattern="\d*"
                maxLength={6}
                placeholder="000000"
                value={totpCode}
                onChange={(event) => {
                  const value = event.target.value.replace(/\D/g, '').slice(0, 6);
                  setTotpCode(value);
                  if (totpError) {
                    setTotpError('');
                  }
                }}
                autoFocus
                className="text-center text-2xl tracking-widest"
              />
            </div>

            {totpError && (
              <p className="text-sm text-destructive">{totpError}</p>
            )}
          </div>

          <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleModalClose(false)}
              disabled={isVerifying}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleVerifyTotp}
              disabled={totpCode.length !== 6 || isVerifying}
            >
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Validando...
                </>
              ) : (
                'Confirmar acesso'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AccessDropdown;
