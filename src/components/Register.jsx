import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Alert } from "./Alert";

export const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState();

  const {signup} = useAuth();
  const navigate = useNavigate();


  const handleChange = ({target: {name, value}}) => {

    setUser({
      ...user,
      [name]:value
    })

  }
  
  // ###################################

  
  const handleSubmit = async (e) => {
  
    e.preventDefault();
    // console.log(user)
    setError('')
    try {
      await signup(user.email, user.password);
      navigate('/');
    } catch (error) {
      setError(error.message)
      // console.log(error.code)
      // if (error.code == 'auth/missing-password') {
      //   setError('Contraseña faltante.')
      // }
    }
  }



  return (
    <div> 
      {error && <Alert message={error}/>}
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="ingrese el email"
          className="text-black"
          onChange={handleChange}
        />

        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="text-black"
          onChange={handleChange}
        />

        <button>Register</button>
      </form>
    </div>
  );
};
