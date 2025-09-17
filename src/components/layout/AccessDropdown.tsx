import { useState } from 'react';
import { ChevronDown, User, UserCheck, Building2, Hospital } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const AccessDropdown = () => {
  const navigate = useNavigate();
  const { switchGuestRole } = useAuth();

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
    console.log('AccessDropdown: Selecting role:', role);
    
    // Primeiro trocar o role
    switchGuestRole(role);
    
    // Depois fazer redirecionamento manual
    setTimeout(() => {
      if (role === 'gestor') {
        console.log('AccessDropdown: Redirecting to prefeitura dashboard');
        navigate('/prefeitura-dashboard');
      } else if (role === 'hospital') {
        console.log('AccessDropdown: Redirecting to hospital dashboard');
        navigate('/dashboard');
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
    }, 100); // Pequeno delay para garantir que o role foi atualizado
  };

  // Sempre mostrar todas as opções
  const filteredOptions = accessOptions;

  return (
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
  );
};

export default AccessDropdown;