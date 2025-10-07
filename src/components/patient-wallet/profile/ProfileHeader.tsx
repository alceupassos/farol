
import { Share2, Lock } from 'lucide-react';
import AppButton from '@/components/ui/AppButton';

const ProfileHeader = () => {
  return (
    <div className="mb-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-semibold">Perfil Médico</h1>
          <p className="text-gray-500 mt-1">Gerencie suas informações médicas pessoais</p>
        </div>
        <div className="flex space-x-3">
          <AppButton
            variant="outline"
            icon={<Share2 size={16} />}
            iconPosition="left"
          >
            Compartilhar Perfil
          </AppButton>
          <AppButton
            icon={<Lock size={16} />}
            iconPosition="left"
          >
            Gerenciar Acesso
          </AppButton>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
