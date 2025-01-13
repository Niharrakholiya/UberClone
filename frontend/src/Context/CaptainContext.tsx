import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Vehicle {
  color: string;
  plate: string;
  capacity: number;
  vehicleType: 'car' | 'motorcycle' | 'auto';
  location?: {
    lat: number;
    long: number;
  };
}

interface Captain {
  id: string;
  fullname: {
    firstname: string;
    lastname: string;
  };
  email: string;
  status: 'active' | 'inactive';
  vehicle: Vehicle;
  socketId?: string;
}

interface CaptainContextProps {
  captain: Captain | null;
  loading: boolean;
  error: string | null;
  setCaptain: (captain: Captain | null) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    vehicle: Vehicle
  ) => Promise<void>;
  logout: () => void;
}

const CaptainContext = createContext<CaptainContextProps | undefined>(undefined);

interface CaptainProviderProps {
  children: ReactNode;
}

export const CaptainProvider: React.FC<CaptainProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [captain, setCaptain] = useState<Captain | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:4000/captains/profile', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setCaptain(response.data.captain);
        } catch (err) {
            console.error('Authentication error:', err);
          localStorage.removeItem('token');
          setCaptain(null);
        }
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<{ token: string; captain: Captain }>(
        'http://localhost:4000/captains/login',
        { email, password }
      );
      const { token, captain } = response.data;
      setCaptain(captain);
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      navigate('/captain-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    vehicle: Vehicle
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      if (vehicle.capacity < 1) {
        throw new Error('Vehicle capacity must be at least 1');
      }
      
      if (!['car', 'motorcycle', 'auto'].includes(vehicle.vehicleType)) {
        throw new Error('Invalid vehicle type');
      }

      const response = await axios.post<{ token: string; captain: Captain }>(
        'http://localhost:4000/captains/register',
        {
          fullname: { firstname, lastname },
          email,
          password,
          vehicle: {
            ...vehicle,
            location: { lat: 0, long: 0 }
          },
          status: 'inactive'
        }
      );
      
      const { token, captain } = response.data;
      setCaptain(captain);
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      navigate('/captain-dashboard');
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
    setCaptain(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/');
  };

  return (
    <CaptainContext.Provider
      value={{
        captain,
        loading,
        error,
        setCaptain,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </CaptainContext.Provider>
  );
};

export const useCaptain = () => {
  const context = useContext(CaptainContext);
  if (context === undefined) {
    throw new Error('useCaptain must be used within a CaptainProvider');
  }
  return context;
};

export default CaptainContext;