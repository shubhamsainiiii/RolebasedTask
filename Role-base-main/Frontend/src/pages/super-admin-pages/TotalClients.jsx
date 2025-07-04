import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { FaEnvelope, FaUsers, FaUserTie } from "react-icons/fa";

const backendurl = "http://localhost:2000";

const TotalClients = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendurl}/clients/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setData(response.data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response) {
          alert(error.response.data);
        } else {
          console.log("[Axios Error]:", error.message);
        }
      }
    };

    fetchData();
  });

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2]">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Total Clients</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data &&
              data.map((item, index) => (
                <Link
                  to={`/super-admin/specific-client/${item._id}`}
                  key={index}
                >
                  <div className="bg-white rounded-2xl shadow-sm transform transition-all duration-300 p-6 cursor-pointer group border-t-4 border-transparent hover:border-indigo-900 hover:translate-y-1">
                    {/* Circular Icon Avatar */}
                    <div className="flex justify-center mb-4">
                      <div className="bg-indigo-500 text-white rounded-full p-4 shadow-lg">
                        <FaUsers className="text-3xl" />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="text-center space-y-1">
                      <p className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        <FaEnvelope className="inline mr-2 text-gray-500" />
                        {item.email}
                      </p>
                      <p className="text-sm text-gray-600">
                        <FaUserTie className="inline mr-2 text-gray-500" />
                        Created by:{" "}
                        <span className="font-medium">
                          {item.superadmin_id?.name}
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalClients;

