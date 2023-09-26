import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

function GuestGuard({ children }) {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return children;
}

export default GuestGuard;
