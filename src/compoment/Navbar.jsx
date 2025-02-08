import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
   const location = useLocation(); // Corrected 'loction' to 'location'
    const { user } = location.state || {}; // Extract user safely

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="bg-blue-500 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-semibold">
          <p>{user}</p>
        </div>

        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          <Link to="/login" className="text-white hover:text-gray-300">Signin</Link>
          <Link to="/singup" className="text-white hover:text-gray-300">Signup</Link>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
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
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-500">
          <div className="space-y-4">
            <Link to="/" className="block text-white text-center py-2">Home</Link>
            <Link to="/login" className="block text-white text-center py-2">Signin</Link>
            <Link to="/singup" className="block text-white text-center py-2">Signup</Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
