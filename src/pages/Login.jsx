import { useState } from 'react';
import { app } from '../firebase/firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

const auth = getAuth(app);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); 

  const signinUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log("User signed in:", res.user);
        navigate('/home')
        // navigate('/', { state: { user: nameValue } }); 
      })
      .catch((err) => console.error("Error signing in:", err.message));
  };

  return (
    <div className='flex justify-center items-start pt-20'>
    <div className='w-[350px]  h-96 flex flex-col  items-center  rounded-lg shadow-md border border-gray-400'>
      <h1 className='pt-10 text-3xl font-bold font-medium'>Sign in</h1>
             <input className='mt-16  rounded-b-sm p-1 shadow-md'
        type="email" 
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input className='mt-2 rounded-b-sm p-1 shadow-md'
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className='w-24 h-12 rounded-2xl flex justify-center items-center mt-6 bg-blue-600 hover:bg-blue-800  '>
      <button onClick={signinUser}>Sign in</button> 
      </div>
      <p>Don't have an account ? <Link className='text-green-800 font-bold' to={'/singup'}>Register</Link> </p>
    </div>
  </div>
  );
};

export default Login;
