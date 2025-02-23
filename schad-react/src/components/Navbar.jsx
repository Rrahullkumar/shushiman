import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiSearch, FiShoppingCart, FiUser, FiLogOut } from "react-icons/fi";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

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

  // // Logout function
  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/");
  // };

  return (
    <header className="fixed top-0 left-0 w-full bg-[#0c4b40] py-4 px-6 z-50">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Brand Name */}
        <div>
          <h4 className="text-white text-2xl font-bold">SushiMan</h4>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 text-white font-medium">
          <li className="hover:text-yellow-400 cursor-pointer" onClick={() => navigate("/")}>Home</li>
          <li className="hover:text-yellow-400 cursor-pointer" onClick={() => navigate("/menu")}>Menu</li>
          <li className="hover:text-yellow-400 cursor-pointer" onClick={() => navigate("/about-us")}>About</li>
          <li className="hover:text-yellow-400 cursor-pointer" onClick={() => navigate("/services")}>Services</li>
          <li className="hover:text-yellow-400 cursor-pointer" onClick={() => navigate("/contact")}>Contact</li>
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
                  onClick={() => navigate("/customer-login")}
                >
                  Customer
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  onClick={() => navigate("/owner-login")}
                >
                  Owner
                </button>
                {/* <button
                  className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-200 flex items-center"
                  onClick={handleLogout}
                >
                  <FiLogOut className="mr-2" /> Logout
                </button> */}
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
