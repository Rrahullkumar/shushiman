import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        axios.get("/api/menu", { headers: { Authorization: token } })
            .then((response) => setMenu(response.data))
            .catch(() => navigate("/login"));
    }, [navigate]);

    return (
        <div>
            <h2>Menu</h2>
            {menu.map(item => (
                <div key={item._id}>
                    <h3>{item.name} - ${item.price}</h3>
                    <button>Add to Cart</button>
                </div>
            ))}
        </div>
    );
};

export default Menu;
