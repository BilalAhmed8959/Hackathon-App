import { useState } from 'react';
import { app } from '../firebase/firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const auth = getAuth(app);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameValue, setNameValue] = useState('');

  const navigate = useNavigate(); 

  const signinUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log("User signed in:", res.user);
        navigate('/', { state: { user: nameValue } }); // ✅ Send name after login
      })
      .catch((err) => console.error("Error signing in:", err.message));
  };

  return (
    <div>
      <div>
        <h1>Sign in</h1>
        <input
          type="text"
          placeholder="Enter name"
          value={nameValue} 
          onChange={(e) => setNameValue(e.target.value)}
        />
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
        <button onClick={signinUser}>Sign in</button> {/* ✅ Only one function call */}
      </div>
    </div>
  );
};

export default Login;
