
import AuthFormContainer from './AuthFormContainer';

interface AuthFormProps {
  onComplete: () => void;
}

const AuthForm = ({ onComplete }: AuthFormProps) => {
  return <AuthFormContainer onComplete={onComplete} />;
};

export default AuthForm;
