import React from 'react';
import AuthForm from './AuthForm';
import { useAuth } from '../../context/AuthContext';
import { UserData } from '../../types';

export const Login = () => {
  const { login } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, user: UserData) => {
    event.preventDefault();
    await login(user.email, user.password);
  };

  return <AuthForm mode="login" onSubmit={handleSubmit} />;
};
