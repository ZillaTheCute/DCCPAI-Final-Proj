import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Remove the auth token and other localVariable from localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('owner');
      localStorage.removeItem('adminState');

      console.log('Logging Out!');
      console.log('Admin state: false');
      navigate('/');
      window.location.reload(true);

  }, [navigate]);

  return null; // This is not a page.
};

export default LogoutPage;