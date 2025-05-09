import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const RotaPrivada = ({ children }) => {
  const { logado } = useAuth();

  return logado ? children : <Navigate to="/home" replace />;
};

export default RotaPrivada;