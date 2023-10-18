import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Home = () => {
  const { user, logout, loading } = useAuth();
  console.log(user)

  const navigate = useNavigate();

  if (loading) {
    return <h1>Loading...</h1>; // Muestra un mensaje de carga mientras se carga el estado de autenticación.
  }

  if (!user) {
    return <h1>User not authenticated</h1>; // O puedes redirigir al usuario a la página de inicio de sesión.
  }

  console.log(user);

  const handlelogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>Welcome {user.displayName|| user.email}</h1>
      <button onClick={handlelogout}>Logout</button>
    </div>
  );
};