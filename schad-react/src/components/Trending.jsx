import React from "react";
import { motion } from "framer-motion";
import sushiImg from "../assets/sushi-1.png";
import drinkImg from "../assets/sushi-4.png";

// Custom SVG Icons
const SushiIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#0c4b40" strokeWidth="2">
    <path d="M12 2L15 6L12 10L9 6L12 2Z" />
    <path d="M5 14L8 18L5 22L2 18L5 14Z" />
    <path d="M19 14L22 18L19 22L16 18L19 14Z" />
  </svg>
);

const TeaIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#0c4b40" strokeWidth="2">
    <path d="M17 8h1a4 4 0 110 8h-1M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z" />
    <path d="M6 3v3M10 3v3M14 3v3" />
  </svg>
);

const titleVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const leftEntry = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const rightEntry = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const listItemVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const TrendingSection = () => {
  return (
    <section className="bg-[#f9e8d8] py-20 px-8 md:px-20">
      <motion.div
        className="text-center mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ margin: "-100px", once: false }}
        variants={titleVariant}
      >
        <h1 className="text-5xl font-bold text-[#2a2a2a] mb-4">
          What's <span className="text-[#0c4b40]">Trending</span>
        </h1>
        <div className="w-24 h-1 bg-[#0c4b40] mx-auto rounded-full" />
      </motion.div>

      <div className="max-w-6xl mx-auto">
        {/* Japanese Sushi Section */}
        <motion.div
          className="flex flex-col md:flex-row items-center gap-12 mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: "-100px", once: false }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.img
            src={sushiImg}
            alt="Japanese Sushi"
            className="w-72 h-72 object-contain rounded-lg shadow-xl hover:rotate-2 transition-transform duration-300"
            variants={leftEntry}
          />
          <motion.div
            className="text-center md:text-left max-w-md"
            variants={rightEntry}
          >
            <h2 className="text-4xl font-bold text-[#2a2a2a] mb-6">Japanese Sushi</h2>
            <p className="text-[#4a4a4a] mb-6 text-lg">
              Feel the taste of the most delicious Sushi here.
            </p>
            <ul className="grid grid-cols-2 gap-4 text-[#2a2a2a]">
              {['Make Sushi', 'Uramaki Sushi', 'Temaki Sushi', 'Oshizushi', 'Nigiri Sushi', 'Inari Sushi'].map((item, index) => (
                <motion.li
                  key={item}
                  className="flex items-center gap-3 bg-white/30 p-2 rounded-lg backdrop-blur-sm shadow-sm"
                  variants={listItemVariant}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="p-1 bg-[#f9e8d8] rounded-full">
                    <SushiIcon />
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Japanese Drinks Section */}
        <motion.div
          className="flex flex-col md:flex-row-reverse items-center gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: "-100px", once: false }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.img
            src={drinkImg}
            alt="Japanese Drinks"
            className="w-72 h-72 object-contain rounded-lg shadow-xl hover:-rotate-2 transition-transform duration-300"
            variants={rightEntry}
          />
          <motion.div
            className="text-center md:text-right max-w-md"
            variants={leftEntry}
          >
            <h2 className="text-4xl font-bold text-[#2a2a2a] mb-6">Japanese Drinks</h2>
            <p className="text-[#4a4a4a] mb-6 text-lg">
              Feel the taste of the most delicious Japanese drinks here.
            </p>
            <ul className="grid grid-cols-2 gap-4 text-[#2a2a2a]">
              {['Oruncha', 'Aojiru', 'Kombu-cha', 'Sakura Tea', 'Ofukucha', 'Mugicha'].map((item) => (
                <motion.li
                  key={item}
                  className="flex items-center gap-3 bg-white/30 p-2 rounded-lg backdrop-blur-sm shadow-sm justify-end md:justify-start"
                  variants={listItemVariant}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item}
                  <span className="p-1 bg-[#f9e8d8] rounded-full">
                    <TeaIcon />
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements
      <div className="absolute left-0 right-0 -mt-32 opacity-10 pointer-events-none">
        <svg viewBox="0 0 500 200" className="w-full">
          <path 
            fill="#0c4b40" 
            d="M0 120 Q 125 50 250 120 T 500 120 L500 200 L0 200 Z"
          />
        </svg>
      </div> */}
    </section>
  );
};

export default TrendingSection;