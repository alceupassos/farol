
import { motion } from 'framer-motion';
import { Shield, FileText } from 'lucide-react';

const AuthSidebar = () => {
  return (
    <div className="md:w-1/2 relative overflow-hidden hidden md:block">
      <div className="absolute inset-0 medical-gradient opacity-90"></div>
      <img 
        src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80" 
        alt="Medical professionals"
        className="object-cover h-full w-full"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-10">
        <div className="max-w-md text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex flex-col items-center mb-6">
              <img 
                src="/lovable-uploads/f328f86f-9e20-428c-b571-91f861610d33.png"
                alt="MedChain Logo"
                className="w-32 mb-3"
              />
              <h1 className="text-4xl font-display font-semibold">MedChain</h1>
              <p className="text-xl mt-2">Sua saúde, sua chave, nosso cofre</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="glass-card backdrop-blur-md bg-white/10 p-6 rounded-xl text-left border border-white/20 shadow-lg">
              <div className="flex items-start">
                <div className="rounded-full bg-white/20 p-3 mr-4">
                  <Shield size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Segurança Blockchain</h3>
                  <p className="text-sm text-white/90">Seus dados são criptografados e acessíveis apenas com sua permissão</p>
                </div>
              </div>
            </div>
            
            <div className="glass-card backdrop-blur-md bg-white/10 p-6 rounded-xl text-left border border-white/20 shadow-lg">
              <div className="flex items-start">
                <div className="rounded-full bg-white/20 p-3 mr-4">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Controle Completo</h3>
                  <p className="text-sm text-white/90">Gerencie todos os seus registros médicos em um único lugar seguro</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthSidebar;
