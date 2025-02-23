import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // For decoding the JWT token
import axios from "axios";

const Menu = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Guest"); // Default to "Guest" if no user is logged in
  const [menuItems, setMenuItems] = useState([]);

  // Fetch user name from JWT token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded);
        setUserName(decoded.name || decoded.email.split("@")[0] || "User");
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/menu");
        setMenuItems(response.data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
        alert("Failed to fetch menu items. Check the console for details.");
      }
    };
    fetchMenuItems();
  }, []);

  return (
    <div className="min-h-screen bg-[#0c4b40] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">Our Menu</h1>

        {/* Container with Left (Menu Items) & Right (User Info) */}
        <div className="flex gap-6">
          
          {/* Menu Items (80% Width) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[80%]">
            {menuItems.map((item) => (
              <div key={item._id} className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">{item.name}</h2>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-lg font-medium text-gray-800 mt-2">₹{item.price}</p>
              </div>
            ))}
          </div>

          {/* Right Side (20% Width) */}
          <div className="w-[20%] bg-yellow-400 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#0c4b40] mb-4">Welcome, {userName}!</h2>
            <p className="text-gray-700">Thank you for visiting SushiMan. Enjoy your meal!</p>

            {/* Order Summary */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-[#0c4b40] mb-2">Your Order</h3>
              <ul className="space-y-2">
                <li className="text-gray-700">Sushi Platter × 1</li>
                <li className="text-gray-700">Sashimi Combo × 1</li>
              </ul>
              <p className="text-lg font-medium text-[#0c4b40] mt-4">Total: ₹1198</p>
            </div>

            {/* Back to Home Button */}
            <button
              onClick={() => navigate("/")}
              className="mt-6 w-full bg-[#0c4b40] text-white font-medium py-2 px-4 rounded-lg hover:bg-[#0c4b40]/90 transition-colors duration-200"
            >
              Back to Home
            </button>
          </div>

        </div> {/* Closing Flex Container */}
      </div>
    </div>
  );
};

export default Menu;
