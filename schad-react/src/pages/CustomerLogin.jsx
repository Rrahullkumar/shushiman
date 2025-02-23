import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerLogin = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  // Modified handleSubmit function
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const url = isRegistering ? "/api/auth/register" : "/api/auth/login";
    const body = isRegistering 
      ? { name, email, password, role: "customer" }
      : { email, password };

    const response = await fetch(`http://localhost:5000${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Request failed");
    }

    localStorage.setItem("token", responseData.token);
    navigate("/menu");

  } catch (error) {
    console.error("Auth error:", error);
    alert(error.message);
  }
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0c4b40]">
      <div className="flex w-[60%] bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Image Section */}
        <div
          className={`w-1/2 transform transition-transform duration-500 ease-in-out ${isRegistering ? "translate-x-full" : "translate-x-0"
            }`}
        >
          <img
            src="https://cdn.pixabay.com/photo/2021/07/21/12/49/shop-6482987_1280.png"
            alt="Login/Register"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div
          className={`w-1/2 p-8 bg-yellow-400 transform transition-transform duration-500 ease-in-out ${isRegistering ? "-translate-x-full" : "translate-x-0"
            }`}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isRegistering ? "Customer Signup" : "Customer Login"}
          </h2>
          <form onSubmit={handleSubmit}>
            {isRegistering && (
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-2 border rounded mb-4"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
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
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-300"
            >
              {isRegistering ? "Sign Up" : "Login"}
            </button>
          </form>
          <p
            className="text-blue-500 mt-4 text-center cursor-pointer hover:underline"
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

export default CustomerLogin;