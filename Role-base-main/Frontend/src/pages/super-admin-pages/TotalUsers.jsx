import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import Header from "../../components/Header";
import { FaEnvelope, FaUserShield, FaBuilding, FaUser } from "react-icons/fa";

const backendurl = "http://localhost:2000";

const TotalUsers = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const response = await axios.get(`${backendurl}/users`, {
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
  }, [token]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2]">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <Header />
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Total Users</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.map((item, index) =>
              item.role === "HR" || item.role === "trainer" || item.role === "student" ? (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm transform transition-all duration-300 p-4 cursor-pointer group border-t-4 border-transparent hover:border-indigo-900 hover:translate-y-1"
                >
                  {/* Icon Avatar */}
                  <div className="flex justify-center mb-3">
                    <div className="bg-indigo-500 text-white rounded-full p-3 shadow-md">
                      <FaUser className="text-2xl" />
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="text-center space-y-1">
                    <p className="text-base font-semibold text-gray-800">{item.name}</p>

                    <p className="text-sm text-gray-600">
                      <FaUserShield className="inline mr-1 text-gray-500" />
                      Role: <span className="font-medium">{item.role}</span>
                    </p>

                    {item.client?.name && (
                      <p className="text-sm text-gray-600">
                        <FaBuilding className="inline mr-1 text-gray-500" />
                        Client: <span className="font-medium">{item.client.name}</span>
                      </p>
                    )}

                    <p className="text-sm text-gray-600">
                      <FaEnvelope className="inline mr-1 text-gray-500" />
                      {item.email}
                    </p>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalUsers;
