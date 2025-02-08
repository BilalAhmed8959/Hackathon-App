import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';



const Logout = () => {
    const navigate = useNavigate(); 
    
    const auth = getAuth();
    signOut(auth).then(() => {
        navigate('/singup')
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
      
  return (
    <div>Logout</div>
  )
}

export default Logout