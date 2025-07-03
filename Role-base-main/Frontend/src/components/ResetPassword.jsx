import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const backendurl = "http://localhost:2000";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  // These are passed via navigation state
  const { email: passedEmail, returnTo } = location.state || {};
  
  const [formData, setFormData] = useState({
    email: passedEmail || "",
    otp: "",
    newPassword: "",
  });

  useEffect(() => {
    if (!passedEmail || !returnTo) {
      toast.error("Invalid access to reset page.");
      navigate("/users"); // fallback
    }
  }, [passedEmail, returnTo, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const { email, otp, newPassword } = formData;

    if (!email || !otp || !newPassword) {
      toast.error("All fields are required.");
      return;
    }

    try {
    const response = await axios.post(
  `${backendurl}/users/reset`,
  {
    email,
    otp,
    newPassword,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }
);

      if (response.status === 200) {
        toast.success("Password reset successful!");
        navigate(returnTo);
      } else {
        toast.error(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Reset error:", error);
      const message =
        error?.response?.data?.message || "Server error. Try again.";
      toast.error(message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-200 to-blue-300 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Reset Password for {formData.email}
        </h2>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <input
            type="text"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            placeholder="Enter OTP"
            className="w-full p-3 rounded border border-gray-300 focus:outline-none"
            required
          />

          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Enter new password"
            className="w-full p-3 rounded border border-gray-300 focus:outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
