import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiEdit, FiTrash, FiPackage, FiClock, FiLogOut } from "react-icons/fi";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("menu");
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", description: "", price: "", category: "", image: null, available: true });
  const [loading, setLoading] = useState(false);


  // Fetch menu items and orders
  useEffect(() => {
    fetchMenuItems();
    fetchOrders();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/menu");
      setMenuItems(response.data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
      alert("Failed to fetch menu items. Check the console for details.");
    }
  };

  // Add new menu item with image handling
  const handleAddItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append("name", newItem.name);
      formData.append("description", newItem.description);
      formData.append("price", newItem.price);
      formData.append("category", newItem.category);
      formData.append("available", newItem.available);
      if (newItem.image) {
        formData.append("image", newItem.image);
      }

      const response = await axios.post("http://localhost:5000/api/menu", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setMenuItems([...menuItems, response.data]);
      setShowAddItemModal(false);
      setNewItem({ 
        name: "", 
        description: "", 
        price: "", 
        category: "", 
        image: null, 
        available: true 
      });
      alert("Item added successfully!");
    } catch (error) {
      console.error("Error adding menu item:", error);
      alert(`Failed to add item: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      alert("Failed to fetch orders. Check the console for details.");
    }
  };

  // // Add new menu item
  // const handleAddItem = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post("http://localhost:5000/api/menu", newItem);
  //     setMenuItems([...menuItems, response.data]);
  //     setShowAddItemModal(false);
  //     setNewItem({ name: "", description: "", price: "", category: "", image: "", available: true });
  //   } catch (error) {
  //     console.error("Error adding menu item:", error);
  //     alert("Failed to add menu item. Check the console for details.");
  //   }
  // };

  // Delete menu item
  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/menu/${id}`);
      setMenuItems(menuItems.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  // Logout owner
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/owner-login");
  };

  return (
    <div className="min-h-screen bg-[#0c4b40] p-6">
      {/* Header */}
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">Owner Dashboard 🎌</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            <FiLogOut className="inline mr-2" /> Logout
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("menu")}
            className={`px-6 py-2 rounded-full ${activeTab === "menu" ? "bg-yellow-400 text-[#0c4b40]" : "bg-gray-100"}`}
          >
            <FiPackage className="inline mr-2" /> Menu Management
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-2 rounded-full ${activeTab === "orders" ? "bg-yellow-400 text-[#0c4b40]" : "bg-gray-100"}`}
          >
            <FiClock className="inline mr-2" /> Order Management
          </button>
        </div>
      </header>

      {/* Menu Management */}
      {activeTab === "menu" && (
        <div className="bg-white rounded-xl p-6 shadow-lg animate-fadeIn">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#0c4b40]">Sushi Menu 🍣</h2>
            <button
              onClick={() => setShowAddItemModal(true)}
              className="bg-[#0c4b40] text-yellow-400 px-4 py-2 rounded-lg hover:scale-105 transition-transform"
            >
              <FiPlus className="inline mr-2" /> Add New Item
            </button>
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map(item => (
              <div key={item._id} className="border rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="h-40 bg-gray-100 rounded-lg mb-4"></div>
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-gray-600 mb-2">₹{item.price}</p>
                <div className="flex justify-between items-center">
                  <span className={`px-2 py-1 rounded-full ${item.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {item.available ? "In Stock" : "Out of Stock"}
                  </span>
                  <div className="flex gap-2">
                    <button className="text-[#0c4b40] hover:text-yellow-600">
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {showAddItemModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">🍱 Add New Menu Item</h3>
            <form onSubmit={handleAddItem}>
              <input
                type="text"
                placeholder="Item Name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="w-full mb-3 p-2 border rounded"
                required
              />
              <textarea
                placeholder="Description"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                className="w-full mb-3 p-2 border rounded"
                required
              />
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="number"
                  placeholder="Price"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                  className="p-2 border rounded"
                  required
                />
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="p-2 border rounded"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Sushi">Sushi</option>
                  <option value="Drinks">Drinks</option>
                  <option value="Desserts">Desserts</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Upload Image</label>
                <input
                  type="file"
                  onChange={(e) => setNewItem({ ...newItem, image: e.target.files[0] })}
                  className="w-full"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddItemModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0c4b40] text-yellow-400 rounded hover:bg-[#0c4b40]/90"
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;