import { Outlet, Navigate } from 'react-router-dom';

const useAuth = () => {
  const token = localStorage.getItem('token');
  return token;
};

export const ProtectedRoutes = () => {
  const isAuth = useAuth();

  return isAuth ? <Outlet /> : <Navigate to="/" />;
};
