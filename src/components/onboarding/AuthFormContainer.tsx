
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AuthLogin from './AuthLogin';
import AuthRegister from './AuthRegister';
import AuthSidebar from './AuthSidebar';

interface AuthFormContainerProps {
  onComplete: () => void;
}

const AuthFormContainer = ({ onComplete }: AuthFormContainerProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const { signIn, signUp, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      let result;
      if (isLogin) {
        result = await signIn(formData.email, formData.password);
      } else {
        result = await signUp(formData.email, formData.password, 'paciente', {
          full_name: formData.name
        });
      }
      
      if (result.error) {
        setError(result.error.message || 'Erro de autenticação');
      } else {
        onComplete();
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setError('Erro inesperado');
    }
  };

  const toggleView = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <AuthSidebar />
      
      <div className="md:w-1/2 flex flex-col justify-center p-6 md:p-10 lg:p-16 bg-gradient-to-b from-background to-background/95">
        <div className="w-full max-w-md mx-auto">
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm">
              {error}
            </div>
          )}
          
          {isLogin ? (
            <AuthLogin 
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              loading={loading}
              toggleView={toggleView}
            />
          ) : (
            <AuthRegister
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              loading={loading}
              toggleView={toggleView}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthFormContainer;
