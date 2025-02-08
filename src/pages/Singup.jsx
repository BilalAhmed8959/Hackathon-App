import { useState } from 'react';
import { app } from '../firebase/firebaseConfig';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const auth = getAuth(app);

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // ✅ Correct useNavigate()

  const signupUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log('User created:', res.user);
        navigate('/login'); // ✅ Corrected 'navigate' function
      })
      .catch((err) => console.error('Signup Error:', err.message));
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <input type="text" placeholder="Enter name" />
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signupUser}>Signup</button> 
    </div>
  );
};

export default Signup;
