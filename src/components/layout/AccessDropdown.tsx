import { useMemo, useState, useEffect } from 'react';
import { ChevronDown, User, UserCheck, Building2, Hospital, Loader2, TestTube, FileText, Ambulance, Package, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface AccessOption {
  id: string;
  role: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  color: string;
  path: string;
}

export const AccessDropdown = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setRole, userRole, verifyTOTP } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<AccessOption | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totpCode, setTotpCode] = useState('');
  const [totpError, setTotpError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const accessOptions = useMemo<AccessOption[]>(
    () => [
      {
        id: 'gestor',
        role: 'gestor',
        label: t('accessDropdown.options.gestor.label', 'Gestor'),
        icon: Building2,
        description: t('accessDropdown.options.gestor.description', 'Acesso ao painel de gestão'),
        color: 'text-primary',
        path: '/prefeitura-dashboard'
      },
      {
        id: 'hospital',
        role: 'hospital',
        label: t('accessDropdown.options.hospital.label', 'Hospital'),
        icon: Hospital,
        description: t('accessDropdown.options.hospital.description', 'Acesso ao painel do hospital'),
        color: 'text-blue-500',
        path: '/dashboard'
      },
      {
        id: 'oss',
        role: 'oss',
        label: t('accessDropdown.options.oss.label', 'OSS'),
        icon: FileText,
        description: t('accessDropdown.options.oss.description', 'Acesso ao painel OSS'),
        color: 'text-purple-500',
        path: '/oss-dashboard'
      },
      {
        id: 'controleOpme',
        role: 'controleOpme',
        label: t('accessDropdown.options.controleOpme.label', 'Controle de OPME'),
        icon: Package,
        description: t('accessDropdown.options.controleOpme.description', 'Gestão de Ortóteses, Próteses e Materiais Especiais'),
        color: 'text-amber-500',
        path: '/oss-controle-opme?section=overview'
      },
      {
        id: 'aph',
        role: 'aph',
        label: t('accessDropdown.options.aph.label', 'APH'),
        icon: Ambulance,
        description: t('accessDropdown.options.aph.description', 'Atendimento Pré-Hospitalar'),
        color: 'text-red-500',
        path: '/aph-dashboard'
      },
      {
        id: 'laboratorio',
        role: 'laboratorio',
        label: t('accessDropdown.options.laboratory.label', 'Laboratório'),
        icon: TestTube,
        description: t('accessDropdown.options.laboratory.description', 'Acesso ao laboratório'),
        color: 'text-emerald-400',
        path: '/laboratorios/visao-geral'
      },
      {
        id: 'medico',
        role: 'medico',
        label: t('accessDropdown.options.doctor.label', 'Médico'),
        icon: UserCheck,
        description: t('accessDropdown.options.doctor.description', 'Acesso ao painel médico'),
        color: 'text-secondary',
        path: '/patients'
      },
      {
        id: 'paciente',
        role: 'paciente',
        label: t('accessDropdown.options.patient.label', 'Paciente'),
        icon: User,
        description: t('accessDropdown.options.patient.description', 'Acesso ao painel do paciente'),
        color: 'text-accent',
        path: '/profile'
      }
    ],
    [t]
  );

  const handleSelect = (option: AccessOption) => {
    setSelectedOption(option);
    setTotpCode('');
    setTotpError('');
    setIsOpen(false);
    setIsModalOpen(true);
  };

  const handleVerifyTotp = async () => {
    if (!selectedOption) {
      setTotpError(t('accessDropdown.errors.generic', 'Erro ao validar o código. Tente novamente em instantes.'));
      return;
    }

    if (totpCode.length !== 6) {
      setTotpError(t('accessDropdown.errors.codeLength', 'Informe os 6 dígitos do código.'));
      return;
    }

    try {
      setIsVerifying(true);
      const result = await verifyTOTP('admin@saudepublica.com', totpCode);

      if (!result.success) {
        setTotpError(t('accessDropdown.errors.invalid', 'Código inválido. Tente novamente.'));
        return;
      }

      setIsModalOpen(false);
      setIsLoading(true);
      setRole(selectedOption.role);
      setSelectedOption(selectedOption);
      navigate(selectedOption.path);
      setTimeout(() => {
        setIsLoading(false);
        setTotpCode('');
      }, 350);
    } catch (error) {
      console.error('Erro ao validar TOTP no AccessDropdown:', error);
      setTotpError(t('accessDropdown.errors.generic', 'Erro ao validar o código. Tente novamente em instantes.'));
    } finally {
      setIsVerifying(false);
    }
  };

  const handleModalClose = () => {
    if (isVerifying) return;
    setIsModalOpen(false);
    setTotpCode('');
    setTotpError('');
  };

  useEffect(() => {
    if (!userRole) {
      return;
    }

    const matchedOption = accessOptions.find((option) => option.role === userRole);

    if (matchedOption && matchedOption.id !== selectedOption?.id) {
      setSelectedOption(matchedOption);
    }
  }, [userRole, accessOptions, selectedOption?.id]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            {selectedOption?.icon ? (
              <selectedOption.icon className="w-4 h-4" />
            ) : (
              <User className="w-4 h-4" />
            )}
            <span>{selectedOption?.label || 'Selecionar Acesso'}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
          </>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 w-64 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {accessOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelect(option)}
                className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
              >
                <option.icon className={`w-5 h-5 mr-3 ${option.color}`} />
                <div>
                  <div className="font-medium">{option.label}</div>
                  <div className="text-xs text-gray-500">{option.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              {t('accessDropdown.modalTitle', 'Confirme seu acesso')}
            </DialogTitle>
            <DialogDescription>
              {t('accessDropdown.modalDescription', 'Insira o código TOTP gerado pelo seu autenticador para continuar.')}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground" htmlFor="totp-code">
                {t('accessDropdown.codeLabel', 'Código de 6 dígitos')}
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
                  if (totpError) setTotpError('');
                }}
                autoFocus
                className="text-center text-2xl tracking-widest"
              />
            </div>

            {totpError && <p className="text-sm text-destructive">{totpError}</p>}
          </div>

          <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleModalClose}
              disabled={isVerifying}
            >
              {t('accessDropdown.actions.cancel', 'Cancelar')}
            </Button>
            <Button
              type="button"
              onClick={handleVerifyTotp}
              disabled={totpCode.length !== 6 || isVerifying}
            >
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('accessDropdown.actions.validating', 'Validando...')}
                </>
              ) : (
                t('accessDropdown.actions.confirm', 'Confirmar acesso')
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AccessDropdown;
