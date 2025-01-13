import { ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../Context/UserContext'; // Make sure this path is correct
import axios from 'axios';

interface UserProtectWrapperProps {
  children: ReactNode;
}

const UserProtectWrapper = ({ children }: UserProtectWrapperProps) => {
  const { user, loading } = useUser(); // Use the custom hook instead
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/auth', { state: { from: location.pathname } });
        return;
      }

      try {
        const response = await axios.get('http://localhost:4000/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.data.user) {
          throw new Error('User data not found');
        }
      } catch (err) {
        console.error('Authentication error:', err);
        localStorage.removeItem('token');
        navigate('/auth', { state: { from: location.pathname } });
      }
    };

    if (!user) {
      verifyUser();
    }
  }, [user, navigate, location.pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default UserProtectWrapper;