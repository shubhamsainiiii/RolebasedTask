import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { FaBuilding, FaEnvelope, FaUserTie } from "react-icons/fa";

const backendurl = "http://localhost:2000";

const TotalClients = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendurl}/clients/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const result = response.data;
        setData(result.result);
        setUserData(result.data);
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
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">👥 Total Clients</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data &&
              data.map((item, index) => (
                <Link
                  to={`/super-admin/specific-client/${item._id}`}
                  key={index}
                >
                  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer group">
                    <div className="flex justify-center mb-4">
                      <img
                        className="w-24 h-24 rounded-full shadow-md border-2 border-indigo-400"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy8unA88y453WxwRtI5brdcCA6_tMFnMx6uQ&s"
                        alt="client"
                      />
                    </div>
                    <div className="space-y-2 text-center">
                      <p className="text-lg font-semibold text-gray-700">
                        <FaBuilding className="inline mr-2 text-indigo-500" />
                        {item.name}
                      </p>
                      <p className="text-gray-600">
                        <FaEnvelope className="inline mr-2 text-green-500" />
                        {item.email}
                      </p>
                      <p className="text-gray-600">
                        <FaUserTie className="inline mr-2 text-purple-500" />
                        Created by: <span className="font-medium">{item.superadmin_id.name}</span>
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
