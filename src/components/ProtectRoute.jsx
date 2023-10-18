
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// // Voy a englobar a cualquier componente que quiero que este protegido sin haber sido autenticado antes.
// // Acceden los usauarios autenticados.
export const ProtectRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  // Compruebo que el usuario exista, si no lo redirijo al login.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si existe, muestro el contenido protegido.
  return <>{children}</>;
};
