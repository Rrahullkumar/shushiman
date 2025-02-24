import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Menu = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Guest");
  const [menuItems, setMenuItems] = useState([]);

  // Fetch user name from JWT token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name || decoded.email.split("@")[0] || "User");
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  // Fetch menu items
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/menu");
        setMenuItems(response.data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
        alert("Failed to fetch menu items.");
      }
    };
    fetchMenuItems();
  }, []);

  // Handle order now click
  const handleOrderNow = (item) => {
    alert(`Order placed for ${item.name}!`);
    // You can add logic to handle the order here
  };

  return (
    <div className="min-h-screen bg-[#0c4b40] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">Our Menu</h1>

        <div className="flex gap-6">
          {/* Menu Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[80%]">
            {menuItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 animate-fade-in"
              >
                {/* Display Image */}
                {item.image && (
                  <img
                    src={`http://localhost:5000${item.image}`}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                )}

                <h2 className="text-xl font-semibold text-gray-800 mb-3">{item.name}</h2>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-lg font-medium text-gray-800 mt-2">₹{item.price}</p>

                {/* Order Now Button */}
                <button
                  onClick={() => handleOrderNow(item)}
                  className="mt-4 w-full bg-[#0c4b40] text-white py-2 px-4 rounded-md hover:bg-[#0c4b40]/90 transition-colors duration-200 transform hover:scale-105 active:scale-95"
                >
                  Order Now
                </button>
              </div>
            ))}
          </div>

          {/* Right Sidebar */}
          <div className="w-[20%] bg-yellow-400 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#0c4b40] mb-4">Welcome, {userName}!</h2>
            <p className="text-gray-700">Thank you for visiting SushiMan. Enjoy your meal!</p>

            {/* Order Summary (Dynamic) */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-[#0c4b40] mb-2">Your Order</h3>
              <ul className="space-y-2">
                {menuItems.slice(0, 2).map((item) => (
                  <li key={item._id} className="text-gray-700">
                    {item.name} × 1
                  </li>
                ))}
              </ul>
              <p className="text-lg font-medium text-[#0c4b40] mt-4">
                Total: ₹{menuItems.slice(0, 2).reduce((acc, item) => acc + item.price, 0)}
              </p>
            </div>

            <button
              onClick={() => navigate("/")}
              className="mt-6 w-full bg-[#0c4b40] text-white font-medium py-2 px-4 rounded-lg hover:bg-[#0c4b40]/90 transition-colors duration-200"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;