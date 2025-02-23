import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // For decoding the JWT token

const Menu = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Guest"); // Default to "Guest" if no user is logged in

  // Fetch user name from JWT token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name || "User"); // Set the user's name
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0c4b40] pt-20 pb-8"> {/* Adjusted padding-top for navbar */}
      <div className="max-w-7xl mx-auto flex gap-8">
        {/* Left Side (80% width) */}
        <div className="w-[80%] bg-yellow-400 rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-[#0c4b40] mb-6">Our Menu</h1>

          {/* Menu Items */}
          <div className="space-y-6">
            {/* Sushi Platter */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Sushi Platter</h2>
              <p className="text-gray-600">Assorted fresh sushi with wasabi and soy sauce</p>
              <p className="text-lg font-medium text-gray-800 mt-2">₹499</p>
            </div>

            {/* Sashimi Combo */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Sashimi Combo</h2>
              <p className="text-gray-600">Fresh slices of raw fish with ginger and soy sauce</p>
              <p className="text-lg font-medium text-gray-800 mt-2">₹699</p>
            </div>

            {/* Tempura Udon */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Tempura Udon</h2>
              <p className="text-gray-600">Udon noodles with tempura shrimp and vegetables</p>
              <p className="text-lg font-medium text-gray-800 mt-2">₹399</p>
            </div>
          </div>
        </div>

        {/* Right Side (20% width) */}
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
      </div>
    </div>
  );
};

export default Menu;