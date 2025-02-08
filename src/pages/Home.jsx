import React from 'react';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase/firebaseConfig';

const auth = getAuth(app);

const Home = () => {
  const navigate = useNavigate(); 

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful");
        navigate('/singup'); 
      })
      .catch((error) => {
        console.error("Error during sign-out:", error);
        
      });
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
};

export default Home;
