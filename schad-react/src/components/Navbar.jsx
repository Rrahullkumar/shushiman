import React, { useState, useEffect, useRef } from "react";
import { FiMenu, FiX, FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Ref for the dropdown

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown when an option is clicked
  const handleOptionClick = (path) => {
    navigate(path);
    setUserDropdown(false); // Close dropdown after navigation
  };

  // Navigate to the home page
  const handleHomeClick = () => {
    navigate("/");
  };

  // Navigate to the About Us page
  const handleAboutClick = () => {
    navigate("/about-us");
  };

  // Navigate to the Contact page
  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-[#0c4b40] py-4 px-6 z-50">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <div>
          <h4 className="text-white text-2xl font-bold">SushiMan</h4>
        </div>

        <ul className="hidden md:flex space-x-8 text-white font-medium">
          <li
            className="hover:text-yellow-400 cursor-pointer"
            onClick={handleHomeClick} // Navigate to home page
          >
            Home
          </li>
          <li
            className="hover:text-yellow-400 cursor-pointer"
            onClick={handleAboutClick} // Navigate to About Us page
          >
            About
          </li>
          <li className="hover:text-yellow-400 cursor-pointer">Menu</li>
          <li className="hover:text-yellow-400 cursor-pointer">Services</li>
          <li
            className="hover:text-yellow-400 cursor-pointer"
            onClick={handleContactClick} // Navigate to Contact page
          >
            Contact
          </li>
        </ul>

        {/* Icons Section */}
        <div className="hidden md:flex space-x-6 text-white text-xl">
          <FiSearch className="cursor-pointer hover:text-yellow-400 transition-all" />
          <FiShoppingCart className="cursor-pointer hover:text-yellow-400 transition-all" />

          {/* User Icon with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <FiUser
              className="cursor-pointer hover:text-yellow-400 transition-all"
              onClick={() => setUserDropdown(!userDropdown)}
            />
            {userDropdown && (
              <div className="absolute right-0 mt-2 bg-white text-black py-2 w-40 rounded shadow-lg">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  onClick={() => handleOptionClick("/customer-login")}
                >
                  Customer
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  onClick={() => handleOptionClick("/owner-login")}
                >
                  Owner
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white text-2xl cursor-pointer hover:text-yellow-400"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>
    </header>
  );
}

export default Navbar;