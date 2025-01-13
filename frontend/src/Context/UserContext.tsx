import React, { createContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  fullname: {
    firstname: string;
    lastname: string;
  };
  email: string;
  password: string;
  socketId?: string;
}

interface UserContextProps {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (firstname: string, lastname: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for existing token and user session on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:4000/users/profile', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUser(response.data.user);
        } catch (err) {
            console.error('Authentication error:', err);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<{ token: string; user: User }>(
        'http://localhost:4000/users/login',
        { email, password }
      );
      
      const { token, user } = response.data;
      setUser(user);
      localStorage.setItem('token', token);
      
      // Configure axios defaults for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      navigate('/user-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err; // Rethrow to handle in the component if needed
    } finally {
      setLoading(false);
    }
  };

  const signup = async (
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      // Input validation
      if (firstname.length < 3) throw new Error('First name must be at least 3 characters long');
      if (lastname.length < 3) throw new Error('Last name must be at least 3 characters long');
      if (email.length < 5) throw new Error('Email must be at least 5 characters long');
      
      const response = await axios.post<{ token: string; user: User }>(
        'http://localhost:4000/users/register',
        {
          fullname: { firstname, lastname },
          email,
          password
        }
      );
      
      const { token, user } = response.data;
      setUser(user);
      localStorage.setItem('token', token);
      
      // Configure axios defaults for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      navigate('/user-dashboard');
    } catch (err) {
      const errorMessage = err.response?.data?.errors
        ? err.response.data.errors.map((e: { msg: string }) => e.msg).join(', ')
        : err.message || 'Registration failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/');
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using the context
export const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;