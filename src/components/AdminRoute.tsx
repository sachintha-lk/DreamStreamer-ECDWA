import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/Auth/AuthContext';
import { useEffect } from 'react';

const AdminRoute = ({ isAdminRoute }: { isAdminRoute?: boolean }) => {
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    console.log("admin route: user : ", user);
    if (user === null) {
      return; // Wait until the user state is resolved
    
    }
  }, [user]);

  if (isAdmin === null) {
    return <div>Loading...</div>;
  }

  if (!user || (isAdminRoute && !isAdmin)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;


