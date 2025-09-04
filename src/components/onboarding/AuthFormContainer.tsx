
import { useState } from 'react';
import AuthLogin from './AuthLogin';
import AuthRegister from './AuthRegister';
import AuthSidebar from './AuthSidebar';

interface AuthFormContainerProps {
  onComplete: () => void;
}

const AuthFormContainer = ({ onComplete }: AuthFormContainerProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      onComplete();
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setLoading(false);
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
