import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useProfileAccess } from '@/contexts/ProfileAccessContext';

const ProfileAccessSwitch = () => {
  const { isFullAccessEnabled, toggleProfileAccess } = useProfileAccess();

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="profile-access"
        checked={isFullAccessEnabled}
        onCheckedChange={toggleProfileAccess}
        className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-red-600"
      />
      <Label 
        htmlFor="profile-access" 
        className={`text-xs cursor-pointer hidden sm:block ${
          isFullAccessEnabled ? 'text-green-400' : 'text-red-400'
        }`}
      >
        {isFullAccessEnabled ? 'Todos os Perfis' : 'Apenas Gestor'}
      </Label>
      <span className="sr-only">
        {isFullAccessEnabled ? 'Desabilitar acesso completo' : 'Habilitar acesso completo'}
      </span>
    </div>
  );
};

export default ProfileAccessSwitch;