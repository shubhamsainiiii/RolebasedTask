import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import Header from "../../components/Header";
import { FaEnvelope, FaUserShield, FaBuilding } from "react-icons/fa";

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

        // Adjust this if your backend wraps users inside `data.result` or similar
        setData(response.data); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <Header />
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">👥 Total Users</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item, index) => (
              item.role==="HR" || item.role==="trainer" ||item.role==="student" ? <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 p-6 cursor-pointer"
              >
                {/* Profile Image */}
                <div className="flex justify-center mb-4">
                  <img
                    src={
                      item.image
                        ? ""
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            item.name
                          )}&background=random`
                    }
                    alt=""
                    className="w-28 h-28 rounded-full object-cover border-4 border-blue-200 shadow-md"
                  />
                </div>

                {/* User Info */}
                <div className="text-center space-y-2">
                  <p className="text-xl font-bold text-gray-800">
                    👤 {item.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    <FaUserShield className="inline mr-1 text-green-500" />
                    Role: <span className="font-medium">{item.role}</span>
                  </p>
                  {item.client?.name && (
                    <p className="text-sm text-gray-600">
                      <FaBuilding className="inline mr-1 text-purple-500" />
                      Client: <span className="font-medium">{item.client.name}</span>
                    </p>
                  )}
                  <p className="text-sm text-gray-600">
                    <FaEnvelope className="inline mr-1 text-blue-500" />
                    {item.email}
                  </p>
                </div>
              </div>
              :""
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalUsers;
