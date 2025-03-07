'use client'

import Link from "next/link";
import { FaBookOpen, FaPenNib, FaBars } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-4 sm:px-8 py-4 bg-gray-800 bg-opacity-90 shadow-lg fixed top-0 left-0 w-full z-10">
        <div className="flex items-center">
          <FaBookOpen className="text-amber-400 text-xl mr-2" />
          <h1 className="text-2xl sm:text-3xl font-bold text-amber-400">ThinkPad</h1>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link href="/login" className="hover:text-amber-400 transition">Login</Link>
          <Link href="/signup" className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded-lg transition shadow-md">Sign Up</Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <FaBars className="h-6 w-6" />
        </button>
      </nav>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-gray-800 p-4 shadow-lg z-10 flex flex-col space-y-4">
          <Link href="/login" className="hover:text-amber-400 transition p-2">Login</Link>
          <Link href="/signup" className="bg-amber-600 hover:bg-amber-700 text-white p-2 rounded-lg transition shadow-md text-center">Sign Up</Link>
        </div>
      )}

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen text-center px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5 }}
        >
          <FaBookOpen className="text-5xl sm:text-7xl text-amber-400 mb-6" />
        </motion.div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">Capture Your Thoughts</h2>
        <p className="mt-4 text-base sm:text-lg text-gray-300 max-w-xl mb-5">
          ThinkPad is your personal digital notebook. Jot down your daily thoughts, keep track of important notes, and organize your ideas in one place.
        </p>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          <Link href="/signup" className="mt-6 bg-amber-600 hover:bg-amber-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition text-base sm:text-lg shadow-md">
            Get Started
          </Link>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 text-center bg-gray-800">
        <motion.h3 
          initial={{ opacity: 0, y: -10 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }} 
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-amber-400"
        >
          About ThinkPad
        </motion.h3>
        <p className="mt-6 text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
          ThinkPad is designed for those who love to write, reflect, and store important notes. Whether you're journaling your daily experiences or saving quick reminders, our platform helps you stay organized with ease.
        </p>
        <div className="flex flex-col sm:flex-row justify-center mt-10 gap-8 sm:gap-12">
          <div className="text-center">
            <FaPenNib className="text-4xl sm:text-5xl text-amber-400 mb-4 mx-auto" />
            <h4 className="text-xl font-semibold mb-2">Simple Writing</h4>
            <p className="text-gray-300">Clean interface that lets your thoughts flow</p>
          </div>
          <div className="text-center">
            <FaBookOpen className="text-4xl sm:text-5xl text-amber-400 mb-4 mx-auto" />
            <h4 className="text-xl font-semibold mb-2">Easy Organization</h4>
            <p className="text-gray-300">Categorize and find your notes quickly</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 text-center bg-gray-900">
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">Ready to start?</h3>
        <Link href="/signup" className="bg-amber-600 hover:bg-amber-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition shadow-md">
          Sign Up Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 sm:px-8 text-center bg-gray-900 text-gray-400">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} ThinkPad. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/about" className="hover:text-amber-400 transition">About</Link>
            <Link href="/contact" className="hover:text-amber-400 transition">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;