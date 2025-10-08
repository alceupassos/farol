import { useMemo, useState, useEffect } from 'react';
import { ChevronDown, User, UserCheck, Building2, Hospital, Loader2, TestTube, FileText, Ambulance, Stethoscope } from 'lucide-react';
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
import { totpCookie } from '@/utils/totpCookie';
import { useTranslation } from 'react-i18next';

const AccessDropdown = () => {
  const navigate = useNavigate();
  const { switchGuestRole } = useAuth();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [totpCode, setTotpCode] = useState('');
  const [totpError, setTotpError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isTotpAuthenticated, setIsTotpAuthenticated] = useState(false);

  // Verificar cookie TOTP ao montar componente
  useEffect(() => {
    const isValid = totpCookie.isValid();
    setIsTotpAuthenticated(isValid);
    
    if (isValid) {
      console.log('✅ TOTP Cookie válido encontrado - autenticação ativa');
    } else {
      console.log('❌ TOTP Cookie não encontrado ou expirado');
    }
  }, []);

  const accessOptions = useMemo(
    () => [
      {
        id: 'gestor',
        label: t('accessDropdown.options.gestor.label'),
        icon: Building2,
        description: t('accessDropdown.options.gestor.description'),
        color: 'text-primary'
      },
      {
        id: 'hospital',
        label: t('accessDropdown.options.hospital.label'),
        icon: Hospital,
        description: 'Transcrição IA: -35% glosas | +R$ 1,2M/mês | +14,9M/ano',
        color: 'text-blue-500'
      },
      {
        id: 'aph',
        label: t('accessDropdown.options.aph.label'),
        icon: Ambulance,
        description: t('accessDropdown.options.aph.description'),
        color: 'text-red-500'
      },
      {
        id: 'oss',
        label: t('accessDropdown.options.oss.label'),
        icon: FileText,
        description: t('accessDropdown.options.oss.description'),
        color: 'text-purple-500'
      },
      {
        id: 'laboratorio',
        label: t('accessDropdown.options.laboratory.label'),
        icon: TestTube,
        description: t('accessDropdown.options.laboratory.description'),
        color: 'text-emerald-400'
      },
      {
        id: 'medico',
        label: 'Profissional de Saúde',
        icon: Stethoscope,
        description: '72% IA-preenchido | -36% glosas | 85% D-0',
        color: 'text-teal-500'
      },
      {
        id: 'paciente',
        label: t('accessDropdown.options.patient.label'),
        icon: User,
        description: t('accessDropdown.options.patient.description'),
        color: 'text-accent'
      }
    ],
    [t]
  );

  const handleAccessSelect = async (role: string) => {
    console.log('AccessDropdown: Iniciando seleção de acesso para papel:', role);
    
    // Verificar se já tem cookie TOTP válido
    if (isTotpAuthenticated && totpCookie.isValid()) {
      console.log('✅ TOTP já autenticado via cookie - pulando verificação');
      
      // Atualizar papel e redirecionar diretamente
      await switchGuestRole(role);
      
      setTimeout(() => {
        redirectAfterRole(role);
      }, 150);
      
      return;
    }
    
    console.log('AccessDropdown: iniciando verificação TOTP para papel:', role);
    
    // Forçar o fechamento do menu dropdown
    const dropdownTrigger = document.querySelector('[data-radix-collection-item]');
    if (dropdownTrigger) {
      (dropdownTrigger as HTMLElement).click();
    }
    
    // Atualizar o estado e abrir o modal
    setSelectedRole(role);
    setTotpCode('');
    setTotpError('');
    
    // Pequeno atraso para garantir que o dropdown foi fechado
    setTimeout(() => {
      setIsModalOpen(true);
    }, 100);
  };

  const handleModalClose = (open: boolean) => {
    if (!open) {
      // Reset all states first
      setSelectedRole(null);
      setTotpCode('');
      setTotpError('');
      setIsVerifying(false);
      
      // Add a small delay before closing to ensure state is reset
      setTimeout(() => {
        setIsModalOpen(false);
      }, 100);
    } else {
      setIsModalOpen(true);
    }
  };

  const redirectAfterRole = (role: string) => {
    console.log('AccessDropdown: Iniciando redirecionamento para papel:', role);
    
    if (role === 'gestor') {
      console.log('AccessDropdown: Redirecting to prefeitura dashboard');
      navigate('/prefeitura-dashboard');
    } else if (role === 'hospital') {
      console.log('AccessDropdown: Redirecting to hospital dashboard');
      navigate('/dashboard');
    } else if (role === 'aph') {
      console.log('AccessDropdown: Redirecting to APH dashboard');
      navigate('/aph-dashboard');
    } else if (role === 'oss') {
      console.log('AccessDropdown: OSS role selected');
      console.log('AccessDropdown: Redirecting to /oss-dashboard');
      navigate('/oss-dashboard');
    } else if (role === 'laboratorio') {
      console.log('AccessDropdown: Redirecting to laboratory hub');
      navigate('/laboratorios/visao-geral');
    } else if (role === 'medico') {
      console.log('AccessDropdown: Redirecting to transcricao atendimento');
      navigate('/transcricao-atendimento');
    } else if (role === 'paciente') {
      console.log('AccessDropdown: Redirecting to patient wallet dashboard');
      navigate('/patient/dashboard');
    } else {
      console.log('AccessDropdown: Redirecting to default dashboard');
      navigate('/dashboard');
    }
    
    console.log('AccessDropdown: Redirecionamento concluído para papel:', role);
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
        setTotpError(t('accessDropdown.errors.codeLength'));
        setIsVerifying(false);
        return;
      }

      // Simular validação TOTP (substitua por sua lógica real)
      const isValid = await SimpleTOTP.verify(sanitizedCode, 'JBSWY3DPEHPK3PXP', 1);

      if (isValid) {
        console.log('AccessDropdown: TOTP verification succeeded for role:', selectedRole);
        
        // Definir cookie TOTP válido por 24h
        totpCookie.set();
        setIsTotpAuthenticated(true);
        console.log('🍪 Cookie TOTP definido - válido por 24 horas');
        
        // Atualizar o papel antes do redirecionamento
        await switchGuestRole(selectedRole);
        
        // Fechar o modal e limpar o estado
        handleModalClose(false);
        
        // Pequeno atraso para garantir que o estado foi atualizado
        setTimeout(() => {
          console.log('AccessDropdown: Redirecionando para papel:', selectedRole);
          redirectAfterRole(selectedRole);
        }, 150);
      } else {
        console.warn('AccessDropdown: Invalid TOTP code provided');
        setTotpError(t('accessDropdown.errors.invalid'));
      }
    } catch (error) {
      console.error('AccessDropdown: Error verifying TOTP code', error);
      setTotpError(t('accessDropdown.errors.generic'));
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
            {t('accessDropdown.trigger')}
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
                    <div className="font-medium text-sm text-foreground">{option.label}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{option.description}</div>
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
            <DialogTitle>{t('accessDropdown.modalTitle')}</DialogTitle>
            <DialogDescription>
              {t('accessDropdown.modalDescription')}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground" htmlFor="totp-code">
                {t('accessDropdown.codeLabel')}
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
              {t('common.cancel')}
            </Button>
            <Button
              type="button"
              onClick={handleVerifyTotp}
              disabled={totpCode.length !== 6 || isVerifying}
            >
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('accessDropdown.actions.validating')}
                </>
              ) : (
                t('accessDropdown.actions.confirm')
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AccessDropdown;
