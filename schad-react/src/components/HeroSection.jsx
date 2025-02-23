import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { motion } from "framer-motion";
import LeafImage from "../assets/sushi-2.png";
import SushiCartoon from "../assets/sushi-cartoon.png";

function HeroSection() {
    return (
        <section className="relative bg-[#0c4b40] text-white h-screen w-full flex flex-col lg:flex-row items-center justify-center px-6 md:px-12 lg:px-24 overflow-hidden">
            {/* Left Side Content */}
            <motion.div 
                className="lg:w-1/2 text-center lg:text-left"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Taste-Bud <br /> <span className="text-yellow-400">Captivating Sushi</span>
                </h1>
                <p className="text-gray-200 text-lg mb-6">
                    Immerse yourself in the essence of Japan with our authentic Japanese cuisine, crafted with traditional techniques and premium ingredients for an unforgettable dining experience.
                </p>
                <div className="flex justify-center lg:justify-start gap-4">
                    <motion.button 
                        className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        View Menu 🍣
                    </motion.button>
                    <motion.button 
                        className="border border-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-white hover:text-black transition"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FiShoppingCart className="text-xl" /> Order Now
                    </motion.button>
                </div>
            </motion.div>

            {/* Right Side Image */}
            <motion.div 
                className="lg:w-1/2 flex justify-center relative"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <motion.img
                    src={SushiCartoon}
                    alt="Sushi Platter"
                    className="w-[80%] lg:w-[90%] max-w-lg drop-shadow-lg"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                />
            </motion.div>

            {/* Floating Elements for Decoration */}
            <motion.img
                src={LeafImage}
                alt="Leaf Decoration"
                className="absolute top-20 left-5 w-14 opacity-70"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
                src={LeafImage}
                alt="Sushi Roll"
                className="absolute bottom-10 right-5 w-16 opacity-80"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
        </section>
    );
}

export default HeroSection;