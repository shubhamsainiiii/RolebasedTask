import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authorization token not found. Please log in again.");
      navigate("/login"); // Optional: redirect to login page
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
      console.log(response.status,"dfghjkl")
      if (response.status === 201) {
        alert("Client created successfully!");
        navigate("/super-admin/total-clients");
      }
    } catch (error) {
      console.error("Error creating client:", error);

      // Handle token expiration error
      if (error.response?.data?.message === "jwt expired") {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      alert(error.response?.data?.message || "Client creation failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-amber-800">
          Client Signup
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-6 border border-gray-300 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-amber-800 text-white p-2 rounded hover:bg-amber-700 transition duration-200"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default ClientSignup;
