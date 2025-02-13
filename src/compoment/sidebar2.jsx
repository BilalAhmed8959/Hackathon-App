import React, { useState } from "react";
import img1 from "../assets/zoom-pic-of-peacock-walls-imgs.jpg";
import img5 from "../assets/2020-07-20-OBESITYEDHUB-Index_1170x780.webp";
import img3 from "../assets/images.jpeg";
import img4 from "../assets/images (1).jpeg";

const Sidebar2 = () => {
  const users = [
    { id: 2, name: "Ahmed Raza", date: "02-22-204", img: img5 },
    { id: 3, name: "Sara Khan", date: "01-10-204", img: img3 },
    { id: 1, name: "Ali Khan", date: "04-13-204", img: img1 },
    { id: 4, name: "Usman Tariq", date: "12-25-203", img: img4 },
  ];

  const [friendStatus, setFriendStatus] = useState({});

  const addFriend = (userId) => {
    setFriendStatus((prevStatus) => ({
      ...prevStatus,
      [userId]: "Request Sent",
    }));
  };

  return (
    <div className="w-60 h-96 bg-white rounded-2xl mt-8 shadow-lg overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      {users.map((user) => (
        <div key={user.id} className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img className="w-12 h-12 rounded-full" src={user.img} alt={user.name} />
            <div>
              <p className="font-bold">{user.name}</p>
              <p className="font-light text-sm text-gray-500">{user.date}</p>
            </div>
          </div>
          <button
            onClick={() => addFriend(user.id)}
            className="border border-black w-full h-10 rounded-lg bg-green-500 text-white mt-3 hover:bg-green-600 transition"
            disabled={friendStatus[user.id] === "Request Sent"}
          >
            {friendStatus[user.id] || "Add Friend"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Sidebar2;
