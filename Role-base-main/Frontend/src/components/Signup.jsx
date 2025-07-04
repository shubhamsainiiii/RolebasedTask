import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

const backendurl = "http://localhost:2000";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await axios.post(`${backendurl}/regex/create`, {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        toast.success(response.data.message || "Signup Successful");
        navigate("/");
      } else {
        toast.error(response.data.message || "Signup failed");
      }
    } catch (error) {
      const message =
        error?.response?.data?.message || "Signup error, try again later";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0c29] px-4 relative overflow-hidden">
      {/* Animated Glow Blobs */}
      <div className="absolute w-[500px] h-[500px] bg-purple-500 opacity-20 rounded-full blur-[150px] top-[-80px] left-[-80px] animate-pulse"></div>
      <div className="absolute w-[500px] h-[500px] bg-pink-400 opacity-20 rounded-full blur-[150px] bottom-[-80px] right-[-80px] animate-pulse"></div>

      {/* Card */}
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.1)] rounded-2xl p-10 z-10 text-white relative overflow-hidden group transition-all duration-500">
        <div className="absolute top-0 left-0 w-full h-full rounded-2xl group-hover:rotate-2 transition-all duration-500 blur-[100px] opacity-10 bg-gradient-to-br from-purple-500 to-indigo-500"></div>

        <h2 className="text-3xl font-bold text-center mb-8 tracking-wide z-10 relative">
          Create Your Account
        </h2>

        <form onSubmit={onSubmitHandler} className="space-y-6 relative z-10">
          {/* Name */}
          <div className="flex items-center px-5 py-3 rounded-full bg-white/10 border border-white/20 focus-within:ring-2 focus-within:ring-purple-500">
            <FaUser className="text-purple-300 mr-3" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="bg-transparent w-full text-white outline-none placeholder:text-gray-300"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center px-5 py-3 rounded-full bg-white/10 border border-white/20 focus-within:ring-2 focus-within:ring-purple-500">
            <FaEnvelope className="text-purple-300 mr-3" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="bg-transparent w-full text-white outline-none placeholder:text-gray-300"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center px-5 py-3 rounded-full bg-white/10 border border-white/20 focus-within:ring-2 focus-within:ring-purple-500">
            <FaLock className="text-purple-300 mr-3" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="bg-transparent w-full text-white outline-none placeholder:text-gray-300"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 transition font-semibold text-white shadow-lg"
          >
            Signup
          </button>
        </form>

        <p className="text-center text-gray-300 text-sm mt-6 relative z-10">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-purple-300 hover:underline font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
