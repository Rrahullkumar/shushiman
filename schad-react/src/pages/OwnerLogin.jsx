import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OwnerLogin = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      console.log("Owner Registration:", name, email, password, restaurantName);
      // TODO: Send API request for owner registration
    } else {
      console.log("Owner Login Attempted:", email, password);
      // TODO: Send API request for owner login
      navigate("/dashboard"); // Redirect after login (ensure Dashboard page exists)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0c4b40]">
      <div className="flex w-[60%] bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Image Section */}
        <div
          className={`w-1/2 transform transition-transform duration-500 ease-in-out ${
            isRegistering ? "translate-x-full" : "translate-x-0"
          }`}
        >
          <img
            src="https://cdn.pixabay.com/photo/2017/10/28/23/21/sushi-2898470_1280.png" // Replace with your image URL
            alt="Owner Login/Register"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div
          className={`w-1/2 p-8 bg-gray-400 transform transition-transform duration-500 ease-in-out ${
            isRegistering ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isRegistering ? "Owner Signup" : "Owner Login"}
          </h2>
          <form onSubmit={handleSubmit}>
            {isRegistering && (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-2 border rounded mb-4"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Restaurant Name"
                  className="w-full p-2 border rounded mb-4"
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                  required
                />
              </>
            )}
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition-colors duration-300"
            >
              {isRegistering ? "Sign Up" : "Login"}
            </button>
          </form>
          <p
            className="text-blue-700 mt-4 text-center cursor-pointer hover:underline"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OwnerLogin;
