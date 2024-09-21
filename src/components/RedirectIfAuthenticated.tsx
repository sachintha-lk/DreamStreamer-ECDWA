import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust the path to your AuthContext

const RedirectIfAuthenticated = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default RedirectIfAuthenticated;
