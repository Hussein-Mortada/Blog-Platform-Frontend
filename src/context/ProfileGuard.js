import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

function ProfileGuard({ children }) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProfileGuard;
