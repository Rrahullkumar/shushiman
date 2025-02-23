import React from "react";
import { motion } from "framer-motion";
import sushiImg from "../assets/sushi-g1.png";

const AboutUs = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const floatingAnimation = {
        float: {
            y: [-10, 10, -10],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    };

    return (
        <section className="py-20 px-8 md:px-20 bg-[#0c4b40] relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Text Content Above Image */}
                <motion.div
                    className="text-center mb-20"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                >
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold mb-6 text-[#f9e8d8]"
                        variants={fadeInUp}
                        transition={{ duration: 0.8 }}
                    >
                        Masterful <span className="text-yellow-400"> Craftsmanship </span> in Every Bite
                    </motion.h2>

                    <motion.div
                        className="w-24 h-1 bg-[#f9e8d8] mb-8 rounded-full mx-auto"
                        variants={fadeInUp}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    />

                    <motion.p
                        className="text-lg mb-8 leading-relaxed text-[#f9e8d8]/90 max-w-2xl mx-auto"
                        variants={fadeInUp}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        For over two decades, our master chefs have perfected the art of sushi-making,
                        blending traditional techniques with modern innovation. Each piece is a
                        testament to our commitment to culinary excellence.
                    </motion.p>
                </motion.div>

                {/* Hero Image Section */}
                <motion.div
                    className="relative w-full"
                    variants={imageVariants}
                    transition={{ duration: 0.8, type: "spring" }}
                >
                    <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
                        <motion.img
                            src={sushiImg}
                            alt="Sushi"
                            className="w-full h-[500px] md:h-[600px] object-cover cursor-pointer"
                            initial={{ scale: 1.1 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c4b40]/80 via-transparent to-[#0c4b40]/80" />

                        {/* Floating Elements */}
                        <motion.div
                            className="absolute top-1/4 left-1/4 w-24 h-24 bg-[#f9e8d8]/10 rounded-full blur-lg"
                            variants={floatingAnimation}
                            animate="float"
                        />
                        <motion.div
                            className="absolute bottom-20 right-20 w-16 h-16 bg-[#f9e8d8]/10 rounded-full blur-lg"
                            variants={floatingAnimation}
                            animate="float"
                            transition={{ delay: 2 }}
                        />
                    </div>
                </motion.div>

                {/* Stats Section Below Image */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
                    variants={staggerContainer}
                >
                    {[
                        { title: "Fresh Ingredients", value: "100% Daily" },
                        { title: "Master Chefs", value: "15+ Experts" },
                        { title: "Traditional Recipes", value: "50+ Years" },
                        { title: "Happy Customers", value: "100k+" },
                    ].map((item, index) => (
                        <motion.div
                            key={item.title}
                            className="p-6 bg-[#f9e8d8]/5 rounded-2xl backdrop-blur-sm border border-[#f9e8d8]/10 text-center"
                            variants={fadeInUp}
                            transition={{ delay: 0.2 + index * 0.1 }}
                        >
                            <div className="text-3xl font-bold text-[#f9e8d8] mb-2">
                                {item.value}
                            </div>
                            <div className="text-sm text-[#f9e8d8]/80">{item.title}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Button - Fixed Cursor */}
                <motion.div
                    className="text-center mt-20"
                    variants={fadeInUp}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <motion.button
                        whileHover={{
                            scale: 1.05,
                            transition: { type: "spring", stiffness: 300 }
                        }}
                        className="px-8 py-4 bg-[#f9e8d8] text-[#0c4b40] rounded-xl font-bold hover:bg-opacity-90 transition-all duration-300 shadow-lg flex items-center gap-2 mx-auto group cursor-pointer"
                        style={{
                            cursor: 'pointer',
                            WebkitTapHighlightColor: 'transparent'
                        }}
                    >
                        Explore Our Journey
                        <span className="inline-block group-hover:translate-x-2 transition-transform duration-300">
                            →
                        </span>
                    </motion.button>
                </motion.div>
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pattern-dots pattern-[#f9e8d8] pattern-size-4 pattern-opacity-20" />
        </section>
    );
};

export default AboutUs;