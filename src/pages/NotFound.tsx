import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
      "Referrer:", document.referrer
    );

    // Auto-redirect countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="text-center space-y-6 p-8 bg-card rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="text-xl text-muted-foreground">Oops! Página não encontrada</p>
        <p className="text-sm text-muted-foreground">
          Rota tentada: <code className="bg-muted px-2 py-1 rounded">{location.pathname}</code>
        </p>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Redirecionando automaticamente em {countdown} segundos...
          </p>
          <button 
            onClick={() => navigate('/')}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
