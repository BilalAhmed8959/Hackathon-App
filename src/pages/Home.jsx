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
  const [likedPosts, setLikedPosts] = useState(0); // Track liked posts by post ID
  const navigate = useNavigate();
  const cloudinaryRef = useRef(null);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
    fetchPosts();

    cloudinaryRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: "tumhara-cloudinary-cloud-name",
        uploadPreset: "tumhara-upload-preset"
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setImageUrl(result.info.secure_url);
        }
      }
    );

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
    };
    const docRef = await addDoc(collection(firestore, 'posts'), newPost);
    setPosts([{ id: docRef.id, ...newPost }, ...posts]);
    setPostText('');
    setImageUrl(null);
  };

  

  const addComment = async (postId) => {
    if (!commentText) return;

    const newComment = {
      username: userData?.name || "Guest",
      text: commentText,
    };

    const postRef = doc(firestore, 'posts', postId);
    await updateDoc(postRef, {
      comments: arrayUnion(newComment),
    });

    setCommentText('');
    setShowCommentInput(null);
    fetchPosts(); // Refresh posts after adding a comment
  };
  const likePost = ()=>{
    setLikedPosts(+1)
  }

  return (
    <div className='flex min-h-screen bg-gradient-to-br from-gray-100 to-gray-300'>
      <Sidebar />
      <div className='flex flex-col w-[650px] items-center justify-center mt-6'>
        <div className='w-[600px] bg-white shadow-2xl rounded-3xl p-6 border border-gray-200'>
          <input
            type='text'
            placeholder='Write a post...'
            value={postText}
            onChange={e => setPostText(e.target.value)}
            className='w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <div className='flex gap-3 mt-4'>
            <button
              onClick={() => cloudinaryRef.current.open()}
              className='bg-blue-600 text-white px-5 py-2 rounded-xl shadow-lg hover:bg-blue-700 transition-all'>
              Upload Image
            </button>
            <button onClick={createPost} className='bg-green-500 text-white px-5 py-2 rounded-xl shadow-lg hover:bg-green-600 transition-all'>
              Post
            </button>
          </div>
          {imageUrl && (
            <img src={imageUrl} alt="Uploaded Preview" className="w-full h-40 object-cover rounded-xl mt-3" />
          )}
        </div>

        {posts.map(post => (
          <div key={post.id} className='w-[600px] bg-white shadow-lg mt-6 p-6 rounded-3xl border border-gray-300'>
            <span className='text-gray-900 font-semibold text-lg'>{post.username}</span>
            <p className='mt-3 text-gray-700'>{post.text}</p>
            {post.image && <img src={post.image} alt='Post' className='w-full h-52 object-cover rounded-xl mt-3' />}
            <div className='flex gap-6 pt-5 text-gray-600 text-lg'>
              <button onClick={likePost}
                className='flex items-center space-x-2 hover:text-blue-600 transition-all'>
                <AiFillLike size={24} />{likedPosts}
              </button>
              <button onClick={() => setShowCommentInput(post.id)} className='hover:text-gray-800 transition-all'>
                <FaComment size={24} />
              </button>
              <FaRegShareSquare size={24} className='hover:text-gray-800 transition-all' />
            </div>

            {showCommentInput === post.id && (
              <div className='mt-4'>
                <input
                  type='text'
                  placeholder='Write a comment...'
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  className='border p-3 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400'
                />
                <button onClick={() => addComment(post.id)} className='bg-blue-500 text-white px-5 py-2 mt-3 rounded-xl hover:bg-blue-600 transition-all'>Comment</button>
              </div>
            )}

            {post.comments && post.comments.map((comment, index) => (
              <div key={index} className='mt-3 text-sm text-gray-700 bg-gray-200 p-3 rounded-xl'>
                <b>{comment.username}:</b> {comment.text}
              </div>
            ))}
          </div>
        ))}
      </div>

      <button onClick={logoutUser} className='fixed top-20 right-5 bg-red-600 text-white px-5 py-2 rounded-xl shadow-xl hover:bg-red-700 transition-all'>Logout</button>
    </div>
    
  );
};

export default Home;
