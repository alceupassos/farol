
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';
import AppButton from '../ui/AppButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AuthRegisterProps {
  formData: {
    name: string;
    email: string;
    password: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  toggleView: () => void;
}

const AuthRegister = ({ formData, handleChange, handleSubmit, loading, toggleView }: AuthRegisterProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="flex items-center mb-2 md:hidden">
        <img 
          src="/lovable-uploads/f328f86f-9e20-428c-b571-91f861610d33.png"
          alt="MedChain Logo"
          className="w-10 h-10 mr-2"
        />
        <h1 className="text-2xl font-display font-semibold">MedChain</h1>
      </div>
      
      <h2 className="text-2xl md:text-3xl font-display font-semibold mb-2 text-gradient-medical">
        Crie sua conta
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Entre para o MedChain e gerencie seus dados médicos com segurança.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Nome Completo
          </Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
              <User size={18} />
            </span>
            <Input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Digite seu nome completo"
              className="pl-10 bg-background dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-primary"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email
          </Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
              <Mail size={18} />
            </span>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Digite seu email"
              className="pl-10 bg-background dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-primary"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            Senha
          </Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
              <Lock size={18} />
            </span>
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Crie uma senha forte"
              className="pl-10 pr-12 bg-background dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-primary"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        
        <AppButton
          type="submit"
          fullWidth
          isLoading={loading}
          loadingText="Criando conta..."
          icon={<ArrowRight size={16} />}
          iconPosition="right"
          className="mt-8"
        >
          Criar Conta
        </AppButton>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Já tem uma conta?{" "}
          <button
            type="button"
            onClick={toggleView}
            className="text-primary hover:underline font-medium"
          >
            Entrar
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default AuthRegister;
