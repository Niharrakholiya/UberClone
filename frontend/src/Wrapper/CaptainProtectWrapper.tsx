import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCaptain } from '../Context/CaptainContext';
import axios from 'axios';

interface CaptainProtectWrapperProps {
  children: ReactNode;
}

const CaptainProtectWrapper = ({ children }: CaptainProtectWrapperProps) => {
  const navigate = useNavigate();
  const { captain, setCaptain, loading } = useCaptain();
  
  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/auth');
        return;
      }

      try {
        const response = await axios.get('http://localhost:4000/captains/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.data.captain) {
          setCaptain(response.data.captain);
        } else {
          throw new Error('No captain data found');
        }
      } catch (err) {
        console.error('Authentication error:', err);
        localStorage.removeItem('token');
        navigate('/auth');
      }
    };

    if (!captain) {
      verifyAuth();
    }
  }, [captain, setCaptain, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!captain) {
    return null;
  }

  return <>{children}</>;
};

export default CaptainProtectWrapper;