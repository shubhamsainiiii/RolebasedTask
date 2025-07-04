import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const backendurl = "http://localhost:2000";

const CreateUser = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const { name, email, password, role } = formData;

    if (!name || !email || !password || !role) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        `${backendurl}/users/create`,
        { name, email, password, role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message || "User Created Successfully");
        navigate("/client");
      } else {
        toast.error(response.data.message || "User Creation Failed");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error occurred, try again later"
      );
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-white  px-4 sm:px-0">
          <div className="w-full max-w-md bg-gradient-to-br from-[#1c1b3a] via-[#2c2b6c] to-[#1e1c3c] backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold text-white text-center mb-6">
              Create New User
            </h2>

            <form onSubmit={onSubmitHandler} className="space-y-4">
              {/* Name */}
              <div className="flex items-center gap-3 w-full px-5 py-3 rounded-full bg-white/10 border border-white/20">
                <img src={assets.person_icon} alt="name" />
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
              <div className="flex items-center gap-3 w-full px-5 py-3 rounded-full bg-white/10 border border-white/20">
                <img src={assets.mail_icon} alt="email" />
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
              <div className="flex items-center gap-3 w-full px-5 py-3 rounded-full bg-white/10 border border-white/20">
                <img src={assets.lock_icon} alt="password" />
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

              {/* Role */}
              <div className="flex items-center gap-3 w-full px-5 py-3 rounded-full bg-white/10 border border-white/20">
                <img src={assets.person_icon} alt="role" />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="bg-transparent outline-none w-full text-white placeholder:text-gray-300"
                  required
                >
                  <option value="" disabled hidden>
                    Select Role
                  </option>
                  <option value="admin" className="text-black">Admin</option>
                  <option value="sub-admin" className="text-black">Sub-Admin</option>
                  <option value="HR" className="text-black">HR</option>
                  <option value="trainer" className="text-black">Trainer</option>
                  <option value="student" className="text-black">Student</option>
                </select>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold hover:opacity-90 transition"
              >
                Create User
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
