import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/Auth/AuthContext';
import { useState, useEffect } from 'react';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    if (!loading) {
      setIsAuthChecked(true);
    }
  }, [loading]);

  if (!isAuthChecked) {
    return <div>Loading...</div>; // or a spinner component
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
