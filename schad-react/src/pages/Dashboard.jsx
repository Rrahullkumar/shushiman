import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiEdit, FiTrash, FiPackage, FiClock, FiCheckCircle, FiXCircle, FiLogOut } from "react-icons/fi";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("menu");
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", description: "", price: "", category: "", image: "", available: true });
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("All");

  // Fetch menu items and orders from the backend
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
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Add new menu item
  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/menu", newItem);
      setMenuItems([...menuItems, response.data]);
      setShowAddItemModal(false);
      setNewItem({ name: "", description: "", price: "", category: "", image: "", available: true });
    } catch (error) {
      console.error("Error adding menu item:", error);
    }
  };

  // Delete menu item
  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/menu/${id}`);
      setMenuItems(menuItems.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  // Update order status
  const handleUpdateOrderStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}`, { status });
      fetchOrders(); // Refresh orders
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // Cancel order
  const handleCancelOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/${id}`);
      fetchOrders(); // Refresh orders
    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };

  // Logout owner
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/owner-login");
  };

  // Filter menu items by category
  const filteredMenuItems = selectedCategory === "All"
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  // Filter orders by status
  const filteredOrders = selectedOrderStatus === "All"
    ? orders
    : orders.filter(order => order.status === selectedOrderStatus);

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

          {/* Category Filter */}
          <div className="flex gap-4 mb-6 overflow-x-auto">
            {["All", "Sushi", "Drinks", "Desserts"].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full ${selectedCategory === cat ? "bg-yellow-400" : "bg-gray-100"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenuItems.map(item => (
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

      {/* Order Management */}
      {activeTab === "orders" && (
        <div className="bg-white rounded-xl p-6 shadow-lg animate-fadeIn">
          <h2 className="text-2xl font-bold text-[#0c4b40] mb-6">Recent Orders 🚚</h2>

          {/* Order Status Filter */}
          <div className="flex gap-4 mb-6 overflow-x-auto">
            {["All", "Pending", "Preparing", "Ready", "Delivered"].map(status => (
              <button
                key={status}
                onClick={() => setSelectedOrderStatus(status)}
                className={`px-4 py-2 rounded-full ${selectedOrderStatus === status ? "bg-yellow-400" : "bg-gray-100"}`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Order ID</th>
                  <th className="text-left py-3">Items</th>
                  <th className="text-left py-3">Status</th>
                  <th className="text-left py-3">Total</th>
                  <th className="text-left py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="py-4">#{order._id}</td>
                    <td>{order.items}</td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                        className="bg-transparent border rounded px-2 py-1"
                      >
                        <option value="pending">⏳ Pending</option>
                        <option value="preparing">👨🍳 Preparing</option>
                        <option value="ready">📦 Ready</option>
                        <option value="delivered">✅ Delivered</option>
                      </select>
                    </td>
                    <td>₹{order.total}</td>
                    <td>
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiXCircle className="inline mr-1" /> Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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