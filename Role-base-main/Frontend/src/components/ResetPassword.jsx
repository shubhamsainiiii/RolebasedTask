// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useLocation, useNavigate } from "react-router-dom";

// const backendurl = "http://localhost:2000";

// const ResetPassword = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const token = localStorage.getItem("token");

//   // These are passed via navigation state
//   const { email: passedEmail, returnTo } = location.state || {};

//   const [formData, setFormData] = useState({
//     email: passedEmail || "",
//     otp: "",
//     newPassword: "",
//   });

//   useEffect(() => {
//     if (!passedEmail || !returnTo) {
//       toast.error("Invalid access to reset page.");
//       navigate("/users"); // fallback
//     }
//   }, [passedEmail, returnTo, navigate]);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleResetPassword = async (e) => {
//     e.preventDefault();

//     const { email, otp, newPassword } = formData;

//     if (!email || !otp || !newPassword) {
//       toast.error("All fields are required.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${backendurl}/users/reset`,
//         {
//           email,
//           otp,
//           newPassword,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.status === 200) {
//         toast.success("Password reset successful!");
//         navigate(returnTo);
//       } else {
//         toast.error(response.data.message || "Something went wrong.");
//       }
//     } catch (error) {
//       console.error("Reset error:", error);
//       const message =
//         error?.response?.data?.message || "Server error. Try again.";
//       toast.error(message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-200 to-blue-300 px-4">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
//           Reset Password for {formData.email}
//         </h2>

//         <form onSubmit={handleResetPassword} className="space-y-4">
//           <input
//             type="text"
//             name="otp"
//             value={formData.otp}
//             onChange={handleChange}
//             placeholder="Enter OTP"
//             className="w-full p-3 rounded border border-gray-300 focus:outline-none"
//             required
//           />

//           <input
//             type="password"
//             name="newPassword"
//             value={formData.newPassword}
//             onChange={handleChange}
//             placeholder="Enter new password"
//             className="w-full p-3 rounded border border-gray-300 focus:outline-none"
//             required
//           />

//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 transition"
//           >
//             Reset Password
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { FaKey, FaLock } from "react-icons/fa";

const backendurl = "http://localhost:2000";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const { email: passedEmail, returnTo } = location.state || {};

  const [formData, setFormData] = useState({
    email: passedEmail || "",
    otp: "",
    newPassword: "",
  });

  useEffect(() => {
    if (!passedEmail || !returnTo) {
      toast.error("Invalid access to reset page.");
      navigate("/users");
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
        { email, otp, newPassword },
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
      const message =
        error?.response?.data?.message || "Server error. Try again.";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] relative overflow-hidden">
      {/* Blurred Colorful Background Circles */}
      <div className="absolute w-96 h-96 bg-pink-500 rounded-full blur-3xl top-0 left-0 opacity-30 z-0" />
      <div className="absolute w-96 h-96 bg-blue-400 rounded-full blur-3xl bottom-0 right-0 opacity-30 z-0" />

      {/* Card Content */}
      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg p-8 rounded-xl shadow-2xl z-10 text-white">
        <h2 className="text-2xl font-bold text-center mb-6">
          Reset Password for{" "}
          <span className="text-yellow-300">{formData.email}</span>
        </h2>

        <form onSubmit={handleResetPassword} className="space-y-5">
          {/* OTP */}
          <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-full">
            <FaKey className="text-yellow-300" />
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              placeholder="Enter OTP"
              className="bg-transparent w-full outline-none text-white placeholder:text-gray-300"
              required
            />
          </div>

          {/* New Password */}
          <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-full">
            <FaLock className="text-yellow-300" />
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter New Password"
              className="bg-transparent w-full outline-none text-white placeholder:text-gray-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-semibold hover:from-yellow-300 hover:to-yellow-500 transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
