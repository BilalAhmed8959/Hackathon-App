import React, { useEffect, useState } from 'react';

const Card = ({ title, additionalInfo }) => {
  const [userData, setUserData] = useState({ name: '', imageUrl: '' });

  useEffect(() => {
    // Fetch data from localStorage
    const storedData = JSON.parse(localStorage.getItem('userData'));
    const storedImageUrl = localStorage.getItem('uploadedImageUrl');

    if (storedData && storedImageUrl) {
      setUserData({
        name: storedData.name,
        imageUrl: storedImageUrl,
      });
    }
  }, []);

  return (
    <div className="w-80 h-96 shadow-lg rounded-2xl p-4 bg-white flex flex-col items-center">
      <h2 className="font-semibold text-xl mb-4">{userData.name}</h2>
      {userData.imageUrl && (
        <img src={userData.imageUrl} alt="User" className="w-32 h-32 rounded-full mb-4" />
      )}
      <div className="text-gray-600">{title}</div>
      <div className="mt-4 text-sm text-gray-500">{additionalInfo}</div>
    </div>
  );
};

export default Card;
