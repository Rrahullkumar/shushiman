import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
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

  return (
    <footer className="bg-[#0c4b40] text-[#f9e8d8] py-12 px-8 md:px-20">
      <div className="border-t border-[#f9e8d8]/20 my-8" />
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* About Section */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-2xl font-bold mb-6">About Us</h3>
            <p className="text-[#f9e8d8]/80 leading-relaxed">
              For over two decades, we've been crafting authentic Japanese culinary experiences with passion and precision. Our journey began in the heart of Tokyo, bringing traditional flavors to the modern world.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-2xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Menu', 'About', 'Gallery', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-[#f9e8d8]/80 hover:text-[#f9e8d8] transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-2xl font-bold mb-6">Newsletter</h3>
            <p className="text-[#f9e8d8]/80 mb-4">
              Subscribe to our newsletter to get the latest updates and exclusive offers.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-lg bg-[#f9e8d8]/10 text-[#f9e8d8] placeholder-[#f9e8d8]/50 focus:outline-none focus:ring-2 focus:ring-[#f9e8d8]"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-[#f9e8d8] text-[#0c4b40] rounded-lg font-bold hover:bg-opacity-90 transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
            <ul className="space-y-3 text-[#f9e8d8]/80">
              <li>123 Sushi Street, Tokyo</li>
              <li>Email: info@sushiman.com</li>
              <li>Phone: +91 123 456 789</li>
            </ul>
            <div className="flex gap-4 mt-6">
              {/* Facebook Icon */}
              <a
                href="https://facebook.com"
                className="text-[#f9e8d8] hover:text-[#f9e8d8]/80 transition-colors duration-300"
                aria-label="Facebook"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
              {/* Twitter Icon */}
              <a
                href="https://twitter.com"
                className="text-[#f9e8d8] hover:text-[#f9e8d8]/80 transition-colors duration-300"
                aria-label="Twitter"
              >
                <FaTwitter className="w-6 h-6" />
              </a>
              {/* Instagram Icon */}
              <a
                href="https://instagram.com"
                className="text-[#f9e8d8] hover:text-[#f9e8d8]/80 transition-colors duration-300"
                aria-label="Instagram"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-[#f9e8d8]/20 my-8" />

        {/* Copyright */}
        <motion.div
          className="text-center text-[#f9e8d8]/80"
          variants={fadeInUp}
        >
          <p>
            &copy; {new Date().getFullYear()} SushiMan. Owner Rahul. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;