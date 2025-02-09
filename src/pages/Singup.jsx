import { useState } from 'react';
import { app } from '../firebase/firebaseConfig';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { MdAddPhotoAlternate } from "react-icons/md";


const auth = getAuth(app);

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [imagei, setImagei]= useState()
  const navigate = useNavigate(); 

  const signupUser = () => {
    if (!email || !password || !nameValue) {
      alert("Please fill all fields!");  
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log('User created:', res.user);
        sendData();  
        navigate('/login'); 
      })
      .catch((err) => console.error('Signup Error:', err.message));
  };

  const sendData = () => {
    const data = { name: nameValue ,imagei };
    localStorage.setItem("userData", JSON.stringify(data));
    console.log("Data stored in localStorage:", data);
  };

  // Cloudinary widget setup
  var myWidget = cloudinary.createUploadWidget({
    cloudName: 'dqyzpuc70', 
    uploadPreset: 'expetizo-hackathon'
  }, (error, result) => { 
    if (!error && result && result.event === "success") { 
      console.log('Done! Here is the image info: ', result.info);
      setImagei(result.info.url) 
    }
  });

  return (
    <div className='flex justify-center items-start pt-20'>
      <div className='w-[350px] h-96 flex flex-col items-center rounded-lg shadow-md border border-gray-400'>
        <h1 className='pt-10 text-3xl font-bold font-medium'>Sign Up</h1>
        <input 
          className='mt-16 rounded-b-sm p-1 shadow-md' 
          type="text" 
          placeholder="Enter name"
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
        />
        <input 
          className='mt-2 rounded-b-sm p-1 shadow-md'
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          className='rounded-b-sm p-1 shadow-md mt-2'  
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => myWidget.open()}><MdAddPhotoAlternate className='text-3xl mt-2 ' />
        </button>
        <div className='w-24 h-12 rounded-2xl flex justify-center items-center mt-6 bg-blue-600 hover:bg-blue-800'>
          <button  onClick={signupUser}>Signup</button>
        </div>  
      </div>
    </div>
  );
};

export default Signup;
