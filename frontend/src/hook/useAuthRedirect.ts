import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const idToken = localStorage.getItem('IdToken');
    console.log("🚀 ~ useEffect ~ idToken:", idToken)
    
    // Check if the IdToken exists
    if (idToken) {
      // Redirect to /links if IdToken is present
      navigate('/links');
    }
  }, [navigate]);
};

export default useAuthRedirect;
