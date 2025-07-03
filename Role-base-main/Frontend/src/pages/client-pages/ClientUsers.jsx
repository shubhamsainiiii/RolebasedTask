import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';

const backendurl = "http://localhost:2000";

const ClientUsers = () => {
  const token = localStorage.getItem("token");
  const {user} = JSON.parse(localStorage.getItem("data"))
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
        navigate(`/reset-password`,{
      state: {
        email,
        returnTo: "/users", // 👈 or "/client" or any current dashboard route
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
    <div className="flex">
      <Sidebar />
      <div className="flex-1 h-[calc(100vh-10px)] overflow-y-auto pr-4">
        <Header />
        <div className="grid grid-cols-3 gap-10 p-6">
          {data.map((item, index) => (
           item.role!=="client" ?  <div
              key={index}
              className="w-80 h-auto border border-gray-200 rounded-2xl shadow-md bg-white p-5 hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <div className="flex justify-center">
                <img
                  src={
                    item.image
                      ? item.image
                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=random`
                  }
                  alt={item.name}
                  className="w-28 h-28 rounded-full object-cover border-4 border-blue-200 shadow-md"
                />
              </div>

              <div className="mt-5 space-y-2 text-center">
                <p className="text-xl font-bold text-gray-800">👤 {item.name}</p>
                <p className="text-sm text-gray-600">⭐ Role: <span className="font-semibold">{item.role}</span></p>
                <p className="text-sm text-gray-600">📧 Email: <span className="font-semibold">{item.email}</span></p>

                {item.superAdmin_id ? (
                  <p className="text-sm text-gray-600">🏢 Created By: <span className="font-semibold">{item.superAdmin_id.name}</span></p>
                ) : item.client ? (
                  <p className="text-sm text-gray-600">🏢 Created By: <span className="font-semibold">{item.client.name}</span></p>
                ) : null}

                { user.role==="admin" ?<div className="pt-3">
                    <button
                      onClick={() => handleResetPassword(item._id, item.email)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                    >
                      Change Password
                    </button>
                  </div>
                :""  
                }
              </div>
            </div>
            :""
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientUsers;
