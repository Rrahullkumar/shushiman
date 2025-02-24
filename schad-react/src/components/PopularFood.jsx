import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import sushiImg from "../assets/sushi-12.png";
import ramenImg from "../assets/sushi-11.png";
import udonImg from "../assets/sushi-10.png";
import sampleBg1 from "../assets/bg.png";
import sampleBg2 from "../assets/sushi-2.png";
import { FiShoppingCart } from "react-icons/fi";

const foodItems = [
  { id: 1, name: "Chezu Sushi", price: "₹399", rating: "4.9", img: sushiImg },
  { id: 2, name: "Original Sushi", price: "₹349", rating: "5.0", img: ramenImg },
  { id: 3, name: "Ramen Legendo", price: "₹299", rating: "4.7", img: udonImg },
];

const PopularFood = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [key, setKey] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setKey((prev) => prev + 1);
        }
      },
      { threshold: 0.5 }
    );

    const section = document.getElementById("popular-food-section");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section
      id="popular-food-section"
      className="relative w-full h-screen bg-gradient-to-br bg-[#0c4b40] to-[#1a7f6e] flex flex-col items-center justify-center overflow-hidden"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
        Popular Food / <span className="text-yellow-400">人気</span>
      </h2>

      {/* Background Decorative Images */}
      <motion.img
        src={sampleBg1}
        alt="Decor 1"
        className="absolute top-10 left-10 w-40 opacity-20 rotate-12"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 0.2 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.img
        src={sampleBg2}
        alt="Decor 2"
        className="absolute bottom-10 right-10 w-52 opacity-20 rotate-[-15deg]"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 0.2 }}
        transition={{ duration: 1, delay: 0.7 }}
      />

      <div key={key} className="flex gap-12 w-full justify-center items-center relative">
        {foodItems.map((food, index) => (
          <motion.div
            key={food.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: index * 0.3 }}
            whileHover={{ scale: 1.02, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
            className="relative bg-[#f9e8d8] p-8 rounded-3xl shadow-lg w-96 h-96 flex flex-col items-center cursor-pointer transition-all duration-300"
          >
            <motion.img
              src={food.img}
              alt={food.name}
              className="w-52 h-52 object-cover drop-shadow-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            />
            <h3 className="text-2xl font-bold text-gray-800 mt-4">{food.name}</h3>
            <p className="text-yellow-500 font-semibold mt-1">⭐ {food.rating}</p>
            <div className="flex items-center justify-between w-full mt-6 px-4">
              <p className="text-2xl font-bold text-gray-900">{food.price}</p>
              <motion.button
                onClick={() => navigate("/customer-login")} // Navigate to CustomerLogin on click
                className="flex items-center gap-2 bg-yellow-400 px-5 py-3 rounded-full font-semibold hover:bg-yellow-500 transition-all shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiShoppingCart /> Order Now
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PopularFood;
