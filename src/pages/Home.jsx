import React, { useEffect, useState, useRef } from 'react';
import Sidebar from '../compoment/Sidebar';
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { app } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { AiFillLike } from "react-icons/ai";
import { FaComment, FaRegShareSquare } from "react-icons/fa";

const auth = getAuth(app);
const firestore = getFirestore(app);

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState([]);
  const [showCommentInput, setShowCommentInput] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [likedPosts, setLikedPosts] = useState(new Set());
  const navigate = useNavigate();
  const cloudinaryRef = useRef(null);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
    fetchPosts();
  }, []);

  const logoutUser = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("userData");
      navigate('/');
    }).catch(error => console.error("Error during sign-out:", error));
  };

  const fetchPosts = async () => {
    const querySnapshot = await getDocs(collection(firestore, 'posts'));
    const postsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPosts(postsArray);
  };

  const createPost = async () => {
    if (!postText && !imageUrl) return;
    const newPost = {
      username: userData?.name || "Guest",
      text: postText,
      image: imageUrl,
      comments: [],
      likes: [],
    };
    const docRef = await addDoc(collection(firestore, 'posts'), newPost);
    setPosts([{ id: docRef.id, ...newPost }, ...posts]);
    setPostText('');
    setImageUrl(null);
  };

  const addComment = async (postId) => {
    if (!commentText) return;
    const postRef = doc(firestore, 'posts', postId);
    await updateDoc(postRef, { comments: arrayUnion({ username: userData?.name || "Guest", text: commentText }) });
    setPosts(posts.map(post => post.id === postId ? { ...post, comments: [...post.comments, { username: userData?.name || "Guest", text: commentText }] } : post));
    setCommentText('');
    setShowCommentInput(null);
  };

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <Sidebar />
      <div className='flex flex-col w-full items-center mt-6'>
        <div className='w-[600px] bg-white shadow-lg rounded-xl p-4'>
          <input type='text' placeholder='Write a post...' value={postText} onChange={e => setPostText(e.target.value)} className='w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
          <div className='flex gap-3 mt-3'>
            <button onClick={() => cloudinaryRef.current.open()} className='bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all'>Upload Image</button>
            <button onClick={createPost} className='bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all'>Post</button>
          </div>
        </div>

        {posts.map(post => (
          <div key={post.id} className='w-[600px] bg-white shadow-lg mt-6 p-4 rounded-2xl'>
            <span className='text-gray-700 font-medium'>{post.username}</span>
            <p className='mt-2'>{post.text}</p>
            {post.image && <img src={post.image} alt='Post' className='w-full h-60 object-cover rounded-lg mt-2' />}

            <div className='flex gap-10 pt-5 text-gray-600'>
              <button className='flex items-center space-x-1 hover:text-blue-600 transition-all' onClick={() => setLikedPosts(new Set(likedPosts).add(post.id))}>
                <AiFillLike size={24} />
                <span>{post.likes?.length || 0}</span>
              </button>
              <button onClick={() => setShowCommentInput(post.id)} className='hover:text-gray-800 transition-all'>
                <FaComment size={24} />
              </button>
              <FaRegShareSquare size={24} className='hover:text-gray-800 transition-all' />
            </div>

            {showCommentInput === post.id && (
              <div className='mt-4'>
                <input type='text' placeholder='Write a comment...' value={commentText} onChange={e => setCommentText(e.target.value)} className='border p-2 w-full rounded-md' />
                <button onClick={() => addComment(post.id)} className='bg-blue-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-blue-600 transition-all'>Comment</button>
              </div>
            )}

            {post.comments && post.comments.map((comment, index) => (
              <div key={index} className='mt-2 text-sm text-gray-600 bg-gray-200 p-2 rounded-lg'>
                <b>{comment.username}:</b> {comment.text}
              </div>
            ))}
          </div>
        ))}
      </div>

      <button onClick={logoutUser} className='fixed top-5 right-5 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-700 transition-all'>Logout</button>
    </div>
  );
};

export default Home;