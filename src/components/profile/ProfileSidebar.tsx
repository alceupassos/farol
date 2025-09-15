
import { Shield } from 'lucide-react';
import AppButton from '@/components/ui/AppButton';

interface ProfileSidebarProps {
  name: string;
  age: string;
  gender: string;
  lastUpdate: string;
  bloodType: string;
  allergies: number;
  activeMedications: number;
}

const ProfileSidebar = ({
  name,
  age,
  gender,
  lastUpdate,
  bloodType,
  allergies,
  activeMedications
}: ProfileSidebarProps) => {
  return (
    <div className="space-y-6">
      <div className="glass-card rounded-xl p-5 animate-slide-up">
        <div className="flex flex-col items-center text-center mb-4">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-3 border-2 border-primary/20">
            <span className="text-2xl font-medium text-primary">
              {name.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </span>
          </div>
          <h3 className="text-lg font-medium text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{age}, {gender}</p>
        </div>
        
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            <Shield size={12} className="mr-1" />
            Perfil Verificado
          </span>
        </div>
        
        <div className="text-sm">
          <div className="flex justify-between py-2 border-t border-border">
            <span className="text-muted-foreground">Última Atualização</span>
            <span className="font-medium text-foreground">{lastUpdate}</span>
          </div>
          <div className="flex justify-between py-2 border-t border-border">
            <span className="text-muted-foreground">Tipo Sanguíneo</span>
            <span className="font-medium text-foreground">{bloodType}</span>
          </div>
          <div className="flex justify-between py-2 border-t border-border">
            <span className="text-muted-foreground">Alergias</span>
            <span className="font-medium text-foreground">{allergies}</span>
          </div>
          <div className="flex justify-between py-2 border-t border-b border-border">
            <span className="text-muted-foreground">Medicamentos Ativos</span>
            <span className="font-medium text-foreground">{activeMedications}</span>
          </div>
        </div>
        
        <div className="mt-4">
          <AppButton variant="outline" fullWidth>
            Baixar Perfil
          </AppButton>
        </div>
      </div>
      
      <PrivacyStatus />
    </div>
  );
};

const PrivacyStatus = () => {
  return (
    <div className="glass-card rounded-xl p-5 animate-slide-up [animation-delay:100ms]">
      <div className="flex items-center mb-4">
        <Shield size={18} className="text-medical mr-2" />
        <h3 className="text-base font-medium">Status de Privacidade</h3>
      </div>
      
        <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-foreground">Compartilhamento de Perfil</span>
          <span className="px-2 py-0.5 rounded bg-success/10 text-success border border-success/20 text-xs">Ativo</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-foreground">Acesso de Emergência</span>
          <span className="px-2 py-0.5 rounded bg-success/10 text-success border border-success/20 text-xs">Habilitado</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-foreground">Criptografia de Dados</span>
          <span className="px-2 py-0.5 rounded bg-success/10 text-success border border-success/20 text-xs">Habilitada</span>
        </div>
        <div className="pt-2 border-t border-border">
          <button className="text-primary text-sm font-medium hover:underline">
            Gerenciar Configurações de Privacidade
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
