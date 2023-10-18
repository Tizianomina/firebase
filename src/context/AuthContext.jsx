import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);

  // if (!context) throw new Error("No hay un provider")

  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función => Register.
  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  // Función => Login.
  const login = async (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  //Logout
  const logout = () => {
    signOut(auth);
  };

  // ### Login Google ###
  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  // onAuthStateChanged => Me permite saber si esta logueado o no.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signup, login, user, loading, logout, loginWithGoogle }}
    >
      {children}
    </AuthContext.Provider>
  );
}
