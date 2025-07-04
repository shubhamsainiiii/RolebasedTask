import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock } from "react-icons/fa";

const backendurl = "http://localhost:2000";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

    const { email, password } = formData;

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await axios.post(`${backendurl}/users/login`, {
        email,
        password,
      });

      const data = response.data;

      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("data", JSON.stringify(data));
        toast.success(data.message || "Login Successful");

        const role = data.user.role;
        if (role === "superadmin") {
          navigate("/super-admin");
        } else if (role === "client") {
          navigate("/client");
        } else {
          navigate("/users");
        }
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Server error, please try again later";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 relative overflow-hidden">
      {/* Background Lights */}
      <div className="absolute w-96 h-96 bg-pink-400 opacity-20 rounded-full blur-[150px] top-[-50px] left-[-50px]" />
      <div className="absolute w-96 h-96 bg-cyan-400 opacity-20 rounded-full blur-[150px] bottom-[-50px] right-[-50px]" />

      {/* Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-8 z-10 text-white">
        <h2 className="text-3xl font-bold text-center mb-6 tracking-wide">
          Welcome Back
        </h2>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          {/* Email */}
          <div className="flex items-center px-4 py-3 rounded-full bg-white/10 border border-white/20">
            <FaEnvelope className="text-blue-300 mr-3" />
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
          <div className="flex items-center px-4 py-3 rounded-full bg-white/10 border border-white/20">
            <FaLock className="text-blue-300 mr-3" />
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

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 font-medium hover:from-indigo-400 hover:to-purple-500 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-300 text-sm mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-300 hover:underline font-semibold"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
