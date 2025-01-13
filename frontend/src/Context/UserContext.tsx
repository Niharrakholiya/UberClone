import React, { createContext, useState, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: string;
  fullname: {
    firstname: string;
    lastname: string;
  };
  email: string;
  password:string
  socketId?: string;
}

interface UserContextProps {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  signup: (firstname: string, lastname: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (
    email: string, 
    password: string, 
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<{ token: string; user: User }>(
        'http://localhost:4000/users/login',
        { email, password }
      );
      const { token, user } = response.data;
      setUser(user);
      
      // Handle token storage based on rememberMe preference

        localStorage.setItem('token', token);
      
      
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
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
      // Validate input based on schema requirements
      if (firstname.length < 3) {
        throw new Error('First name must be at least 3 characters long');
      }
      
      if (lastname && lastname.length < 3) {
        throw new Error('Last name must be at least 3 characters long');
      }

      if (email.length < 5) {
        throw new Error('Email must be at least 5 characters long');
      }

      const response = await axios.post<{ token: string; user: User }>(
        'http://localhost:4000/users/register',
        {
          fullname: {
            firstname,
            lastname
          },
          email,
          password
        }
      );
      
      const { token, user } = response.data;
      console.log(user);
      console.log(token);
      setUser(user);
      localStorage.setItem('token', token);
      window.location.href = '/dashboard';
    } catch (err) {
      if (err.response?.data?.errors) {
        setError(err.response.data.errors.map((e: { msg: string }) => e.msg).join(', '));
      } else {
        setError(err.message || 'Something went wrong. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    window.location.href = '/';
  };

  // Check for existing token on mount
  
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

export default UserContext;