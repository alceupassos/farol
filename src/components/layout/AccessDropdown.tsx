import { useState } from 'react';
import { ChevronDown, User, UserCheck, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProfileAccess } from '@/contexts/ProfileAccessContext';

const AccessDropdown = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { isFullAccessEnabled } = useProfileAccess();

  const accessOptions = [
    {
      id: 'gestor',
      label: 'Gestão Municipal',
      icon: Building2,
      description: 'Acesso para gestores públicos',
      color: 'text-primary'
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

  const handleAccessSelect = async (role: string) => {
    // Fazer logout antes de redirecionar para nova autenticação
    await signOut();
    navigate(`/auth?role=${role}`);
  };

  // Filtrar opções baseado no estado do ProfileAccess
  const filteredOptions = isFullAccessEnabled 
    ? accessOptions 
    : accessOptions.filter(option => option.id === 'gestor');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isFullAccessEnabled ? 'Acessar Sistema' : 'Acessar como Gestor'}
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
  );
};

export default AccessDropdown;