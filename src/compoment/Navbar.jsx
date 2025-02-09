import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="flex items-center justify-between bg-white p-4 shadow-md relative">
      <div className="text-xl font-semibold text-gray-800">Scrolllink</div>

      <div className="hidden md:block flex-grow mx-4">
        <input
          type="text"
          placeholder="Search something here..."
          className="w-96 ml-60 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
      </div>

      <div className="flex items-center space-x-2">
        {userData ? (
          <>
            <span className="text-gray-700 font-medium">{userData.name}</span>
            <img
              src={userData.image || "https://res.cloudinary.com/dqyzpuc70/image/upload/v1739091523/oe4fmcvoqqzousj1gaqm.png"}
              alt="User"
              className="w-10 h-10 rounded-full border"
            />
          </>
        ) : (
          <Link to="/login" className="text-gray-500 hover:text-gray-700">Login</Link>
        )}

        <button onClick={toggleMobileMenu} className="md:hidden ml-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-md rounded-lg p-4 md:hidden">
          <div className="space-y-2">
            <Link to="/" className="block text-gray-700 hover:text-gray-500">Home</Link>
            <Link to="/login" className="block text-gray-700 hover:text-gray-500">Signin</Link>
            <Link to="/signup" className="block text-gray-700 hover:text-gray-500">Signup</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
