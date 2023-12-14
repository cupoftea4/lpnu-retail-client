import AuthForm from './AuthForm';
import { useAuth } from '../../context/AuthContext';
import { UserData } from '../../types';

export const Register = () => {
  const { register } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, user: UserData) => {
    event.preventDefault();
    await register(user);
  };

  return <AuthForm mode="register" onSubmit={handleSubmit} />;
};
