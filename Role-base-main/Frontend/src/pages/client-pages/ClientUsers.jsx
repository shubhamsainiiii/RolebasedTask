import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const backendurl = "http://localhost:2000";

const ClientUsers = () => {
  const token = localStorage.getItem("token");
  const { user } = JSON.parse(localStorage.getItem("data"));
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendurl}/users/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleResetPassword = async (userId, email) => {
    try {
      const response = await axios.post(
        `${backendurl}/users/otp/${userId}`,
        { userId, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("OTP sent to email.");
        navigate(`/reset-password`, {
          state: {
            email,
            returnTo: "/users",
          },
        });
      } else {
        alert("Failed to send OTP.");
      }
    } catch (error) {
      console.error("Failed to send OTP:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      <Sidebar />
      <div className="flex-1 overflow-y-auto pr-4">
        <Header />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
          {data.map((item, index) =>
            item.role !== "client" ? (
              <div
                key={index}
                className="bg-white/60 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-6 hover:shadow-2xl transition duration-300"
              >
                <div className="flex justify-center mb-4">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-indigo-400 shadow-md"
                    />
                  ) : (
                    <FaUserCircle className="text-indigo-500 text-6xl" />
                  )}
                </div>

                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Role:</span> {item.role}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Email:</span> {item.email}
                  </p>

                  {item.superAdmin_id ? (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Created By:</span> {item.superAdmin_id.name}
                    </p>
                  ) : item.client ? (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Created By:</span> {item.client.name}
                    </p>
                  ) : null}

                  {user.role === "admin" && (
                    <button
                      onClick={() => handleResetPassword(item._id, item.email)}
                      className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-md font-medium transition duration-200"
                    >
                      Change Password
                    </button>
                  )}
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientUsers;
