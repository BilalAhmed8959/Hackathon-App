import React from "react";
import { Home as HomeIcon, Grid, ShoppingBag, Users, Bookmark, MessageSquare, Settings } from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { name: "Feed", icon: <HomeIcon />, active: true },
    { name: "Explore", icon: <Grid />, active: false },
    { name: "Marketplace", icon: <ShoppingBag />, active: false },
    { name: "Groups", icon: <Users />, active: false },
    { name: "My favorites", icon: <Bookmark />, active: false },
    { name: "Messages", icon: <MessageSquare />, active: false },
    { name: "Settings", icon: <Settings />, active: false },
  ];

  const contacts = [
    { name: '', img: "https://res.cloudinary.com/dqyzpuc70/image/upload/v1739091523/oe4fmcvoqqzousj1gaqm.png",  },
    { name: '', img: "https://res.cloudinary.com/dqyzpuc70/image/upload/v1739091523/oe4fmcvoqqzousj1gaqm.png" },
    { name: '', img: "https://res.cloudinary.com/dqyzpuc70/image/upload/v1739091523/oe4fmcvoqqzousj1gaqm.png" },
    { name: '', img: "https://res.cloudinary.com/dqyzpuc70/image/upload/v1739091523/oe4fmcvoqqzousj1gaqm.png" },
    { name: '', img: "https://res.cloudinary.com/dqyzpuc70/image/upload/v1739091523/oe4fmcvoqqzousj1gaqm.png" },
    { name: '', img: "https://res.cloudinary.com/dqyzpuc70/image/upload/v1739091523/oe4fmcvoqqzousj1gaqm.png" },
  ];

  return (
    <div className="w-64 bg-white h-screen p-6 shadow-md">
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

      <div className="border-t my-6"></div>

      <h3 className="text-gray-500 font-semibold mb-4">My Contacts</h3>
      <div className="space-y-4">
        {contacts.map((contact, index) => (
          <div key={index} className="flex items-center space-x-3">
            <img src={contact.img} alt={contact.name} className="w-10 h-10 rounded-full" />
            <div>
              <p className="text-gray-800 font-medium">{contact.name}</p>
              <p className="text-gray-500 text-sm">{contact.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
