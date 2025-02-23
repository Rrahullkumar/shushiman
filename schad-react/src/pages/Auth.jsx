import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = ({ type }) => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = type === "login" ? "/api/auth/login" : "/api/auth/register";
            const response = await axios.post(url, formData);
            localStorage.setItem("token", response.data.token);
            navigate("/menu");
        } catch (error) {
            console.error("Authentication Error:", error.response.data);
            alert(error.response.data.message);
        }
    };

    return (
        <div className="auth-container">
            <h2>{type === "login" ? "Login" : "Signup"}</h2>
            <form onSubmit={handleSubmit}>
                {type === "signup" && <input type="text" name="name" placeholder="Name" onChange={handleChange} required />}
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">{type === "login" ? "Login" : "Signup"}</button>
            </form>
        </div>
    );
};

export default Auth;
