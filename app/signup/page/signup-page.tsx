'use client'

import { useState, useEffect } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ThinkpadBackground = () => {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-amber-500 opacity-10 rounded-lg shadow-lg"
              style={{
                width: `${100 + i * 5}px`,
                height: `${100 + i * 5}px`,
                top: `${i * 7}%`,
                left: `${i * 5}%`,
                animation: `float ${20 + i * 2}s linear infinite`,
                animationDelay: `${i * 1.5}s`,
                transform: `rotate(${i * 15}deg)`,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900 opacity-90" />
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />
      </div>
    );
  };

const SignupPage = () => {
    const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
    const router = useRouter();
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log(formData);
    };
  
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <ThinkpadBackground />
        <div className="relative z-10 w-full max-w-md p-8 space-y-6 bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-2xl shadow-2xl border border-amber-700">
          <h2 className="text-3xl font-bold text-center text-amber-400">Sign Up</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex items-center space-x-2 border border-amber-600 rounded-lg p-3">
              <FaUser className="text-amber-400" />
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-white"
                required
              />
            </div>
            <div className="flex items-center space-x-2 border border-amber-600 rounded-lg p-3">
              <FaEnvelope className="text-amber-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-white"
                required
              />
            </div>
            <div className="flex items-center space-x-2 border border-amber-600 rounded-lg p-3">
              <FaLock className="text-amber-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 transition-all duration-200 py-3 rounded-lg font-semibold transform hover:-translate-y-1"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  };
  

export default SignupPage;