
import { Shield } from 'lucide-react';

const BlockchainVerification = () => {
  return (
    <div className="glass-card rounded-xl p-5 mt-6 animate-scale-in [animation-delay:100ms]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Verificação Blockchain</h3>
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
          <Shield size={12} className="mr-1" />
          Verificado
        </span>
      </div>
      
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Seu perfil médico está armazenado de forma segura no blockchain, garantindo que suas informações não possam ser adulteradas e estejam sempre acessíveis para você.
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-800">
        <div className="space-y-2 font-mono text-xs text-gray-700 dark:text-gray-300">
          <div className="flex items-center">
            <span className="text-gray-500 mr-2">Hash:</span>
            <span>0x8f23e3a96f5b5ac8712b9ab9c1c98e...</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-500 mr-2">Última Atualização:</span>
            <span>2023-06-10 14:32:45 UTC</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-500 mr-2">Assinatura:</span>
            <span>válida (RSA-256)</span>
          </div>
        </div>
      </div>
      
      <button className="w-full mt-4 text-sm text-primary font-medium hover:underline">
        Ver Verificação Detalhada
      </button>
    </div>
  );
};

export default BlockchainVerification;
