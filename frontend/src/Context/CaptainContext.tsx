import React, { createContext, useState, ReactNode } from 'react';
import axios from 'axios';

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
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
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
  const [captain, setCaptain] = useState<Captain | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (
    email: string, 
    password: string, 
    rememberMe: boolean = false
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<{ token: string; captain: Captain }>(
        'http://localhost:4000/captains/login',
        { email, password }
      );
      const { token, captain } = response.data;
      setCaptain(captain);
      
      if (rememberMe) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }
      
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
    password: string,
    vehicle: Vehicle
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      // Validate vehicle information
      if (vehicle.capacity < 1) {
        throw new Error('Vehicle capacity must be at least 1');
      }
      
      if (!['car', 'motorcycle', 'auto'].includes(vehicle.vehicleType)) {
        throw new Error('Invalid vehicle type');
      }

      const response = await axios.post<{ token: string; captain: Captain }>(
        'http://localhost:4000/captains/register',
        {
          fullname: {
            firstname,
            lastname,
          },
          email,
          password,
          vehicle: {
            ...vehicle,
            location: {
              lat: 0,  // Default values, can be updated later
              long: 0
            }
          },
          status: 'inactive' // Default status for new captains
        }
      );
      
      const { token, captain } = response.data;
      setCaptain(captain);
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
    setCaptain(null);
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    window.location.href = '/';
  };

  // Check for existing token on mount
  React.useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      // Set up axios interceptor for authentication
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Fetch captain profile
      const fetchProfile = async () => {
        try {
          const response = await axios.get<{ captain: Captain }>(
            'http://localhost:4000/captains/profile'
          );
          setCaptain(response.data.captain);
        } catch (err) {
          // If token is invalid, clear it
          console.log(err.response?.data);
          logout();
        }
      };
      
      fetchProfile();
    }
  }, []);

  return (
    <CaptainContext.Provider
      value={{
        captain,
        loading,
        error,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </CaptainContext.Provider>
  );
};

export default CaptainContext;