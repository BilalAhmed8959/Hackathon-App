import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBnalhn2ATGBbmYXh3gcIYLnyW8jnnFTwk",
  authDomain: "fir-class1-5ce5c.firebaseapp.com",
  projectId: "fir-class1-5ce5c",
  storageBucket: "fir-class1-5ce5c.firebasestorage.app",
  messagingSenderId: "729196246710",
  appId: "1:729196246710:web:223a5d03da3037ea485817",
  databaseURL:'https://fir-class1-5ce5c-default-rtdb.firebaseio.com/'
};

export const app = initializeApp(firebaseConfig);