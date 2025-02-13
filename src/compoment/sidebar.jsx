import React, {  useState } from "react";
import { HomeIcon, Grid, ShoppingBag, Users, Bookmark, MessageSquare, Settings } from "lucide-react";
import img1 from "../assets/zoom-pic-of-peacock-walls-imgs.jpg";


const Sidebar = () => {

  const users = [
      { id: 1, name: "Ali Khan", date: "04-13-204", img: img1 },
    ];
      const [friendStatus, setFriendStatus] = useState({});
    

  const menuItems = [
    { name: "Feed", icon: <HomeIcon />, active: true },
    { name: "Explore", icon: <Grid />, active: false },
    { name: "Marketplace", icon: <ShoppingBag />, active: false },
    { name: "Groups", icon: <Users />, active: false },
    { name: "My favorites", icon: <Bookmark />, active: false },
    { name: "Messages", icon: <MessageSquare />, active: false },
    { name: "Settings", icon: <Settings />, active: false },
  ];

  const addFriend = (userId) => {
    setFriendStatus((prevStatus) => ({
      ...prevStatus,
      [userId]: "Request Sent",
    }));
  };

  const cancelFriendRequest = (userId) => {
    setFriendStatus((prevStatus) => {
      const newStatus = { ...prevStatus };
      delete newStatus[userId]; 
      return newStatus;
    });
  };

  const confirmFriendRequest = (userId) => {
    setFriendStatus((prevStatus) => ({
      ...prevStatus,
      [userId]: "Request Confirmed",
    }));

    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };
  
 return (
    <div className="w-64 bg-white h-auto p-6 shadow-md">
      <nav className="space-y-4">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 text-lg font-medium cursor-pointer p-2 rounded-lg ${
              item.active ? "text-pink-500 bg-pink-100" : "text-gray-700"
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </div>
        ))}
      </nav>
      <div className="mt-10">
      {users.map((user) => (
        <div key={user.id} className="pt-10 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img className="w-12 h-12 rounded-full" src={user.img || img1} alt={user.name} />
            <div>
              <p className="font-bold">{user.name}</p>
              <p className="font-light text-sm text-gray-500">{user.date}</p>
            </div>
          </div>

          {friendStatus[user.id] !== "Request Sent" ? (
            <button
              onClick={() => addFriend(user.id)}
              className="border border-black w-full h-10 rounded-lg bg-green-500 text-white mt-3 hover:bg-green-600 transition"
            >
              freand
            </button>
          ) : (
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => cancelFriendRequest(user.id)}
                className="border border-black w-full h-10 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmFriendRequest(user.id)}
                className="border border-black w-full h-10 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
              >
                Confirm
              </button>
            </div>
          )}
        </div>
      ))}
    </div> 
    </div>
  );
};

export default Sidebar;
