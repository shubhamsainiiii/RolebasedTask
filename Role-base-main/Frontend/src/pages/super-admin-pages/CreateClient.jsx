import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

const backendurl = "http://localhost:2000";

const ClientSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authorization token not found. Please log in again.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        `${backendurl}/clients/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Client created successfully!");
        navigate("/super-admin/total-clients");
      }
    } catch (error) {
      if (error.response?.data?.message === "jwt expired") {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      toast.error(error.response?.data?.message || "Client creation failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1443] via-[#1e1b50] to-[#0f0e2b] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-xl w-full max-w-md text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Client Signup</h2>

        {/* Name */}
        <div className="flex items-center gap-3 w-full px-5 py-3 mb-4 rounded-full bg-white/10 border border-white/20">
          <FaUser className="text-blue-300" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="bg-transparent outline-none w-full text-white placeholder:text-gray-300"
            required
          />
        </div>

        {/* Email */}
        <div className="flex items-center gap-3 w-full px-5 py-3 mb-4 rounded-full bg-white/10 border border-white/20">
          <FaEnvelope className="text-blue-300" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="bg-transparent outline-none w-full text-white placeholder:text-gray-300"
            required
          />
        </div>

        {/* Password */}
        <div className="flex items-center gap-3 w-full px-5 py-3 mb-6 rounded-full bg-white/10 border border-white/20">
          <FaLock className="text-blue-300" />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="bg-transparent outline-none w-full text-white placeholder:text-gray-300"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:opacity-90 transition-all duration-300 cursor-pointer"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default ClientSignup;
