import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosInstance } from 'axios';
import { UserData } from '../types';

const API_URL = 'http://localhost:5043';

const CURRENT_USER_KEY = 'currentUser';
const TOKEN_KEY = 'token';

type LoginResponse = {
  user: UserData;
  token: string;
};

interface ApiContextType {
  login: (email: string, password: string) => Promise<void>;
  register: (user: UserData) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean;
  currentUser: UserData | null;
}

const AuthContext = createContext<ApiContextType & { apiClient: AxiosInstance }>(null!);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const navigate = useNavigate();

  const apiClient = axios.create({ 
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : null
    },
  });

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const data = response.data as LoginResponse;
      localStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      setCurrentUser(data.user);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(data.user));
      navigate('/products');
    } catch (error) {
      throw new Error('Failed to log in');
    }
  };

  const register = async (userData: UserData) => {
    try {
      const response = await apiClient.post('/auth/register', userData);
      if (response.status !== 201) {
        throw new Error('Failed to register');
      }
      login(userData.email, userData.password);
    } catch (error) {
      throw new Error('Failed to register');
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
    setToken(null);
    setCurrentUser(null);
    navigate('/login');
  }

  const isAuthenticated = () => !!token;

  useEffect(() => {
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user data from local storage');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ login, register, logout, isAuthenticated, apiClient, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
