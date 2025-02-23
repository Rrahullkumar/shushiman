import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Category Data
const categories = [
  { id: 1, name: "Sashimi Sushi", items: "40+ Sushi Available", color: "from-yellow-400 to-yellow-500", icon: "🍣" },
  { id: 2, name: "Maki Rolls Sushi", items: "29+ Sushi Available", color: "from-green-500 to-green-600", icon: "🍙" },
  { id: 3, name: "Nigiri Sushi", items: "20+ Sushi Available", color: "from-orange-500 to-orange-600", icon: "🍤" },
  { id: 4, name: "Inari Sushi", items: "20+ Items Available", color: "from-blue-500 to-blue-600", icon: "🍥" },
  { id: 5, name: "Specialty Rolls", items: "99+ Sushi Available", color: "from-red-500 to-red-600", icon: "🥢" },
];

// Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.2, type: "spring", stiffness: 100, damping: 10 },
  }),
};

function CategoryCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: false, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 px-6 md:px-12 lg:px-24 bg-[#f5e8d8] text-center">
      {/* Title Animation */}
      <motion.h2 
        className="text-4xl md:text-5xl font-bold text-[#0c4b40] mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Explore Our <br />
        <span className="text-yellow-500">Exquisite Sushi Delights</span>
      </motion.h2>

      {/* Animated Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            className={`relative bg-gradient-to-br ${category.color} text-white py-6 px-6 rounded-2xl shadow-2xl flex flex-col items-center 
              backdrop-blur-lg bg-opacity-80 border border-white/20 transition-all duration-300`}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={index}
            whileHover={{ scale: 1.08, rotate: [0, -2, 2, -2, 2, 0], transition: { duration: 0.4 } }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated Icon */}
            <motion.span 
              className="text-5xl drop-shadow-md"
              initial={{ opacity: 0, y: -10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {category.icon}
            </motion.span>

            {/* Title Animation */}
            <motion.h3 
              className="text-xl font-bold tracking-wide mt-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {category.name}
            </motion.h3>

            {/* Items Count Animation */}
            <motion.p 
              className="text-sm opacity-90 mt-1"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.4 }}
            >
              {category.items}
            </motion.p>

            {/* Floating Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-white opacity-5 blur-2xl rounded-full"
              animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.button>
        ))}
      </div>
    </section>
  );
}

export default CategoryCards;
