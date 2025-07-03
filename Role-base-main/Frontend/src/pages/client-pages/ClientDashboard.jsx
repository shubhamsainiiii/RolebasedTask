import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaUserFriends } from 'react-icons/fa';

const backendurl = "http://localhost:2000";

const ClientDashboard = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

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

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link to="/client/users">
            <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer group">
              <div className="flex justify-center items-center mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full p-5 shadow-lg">
                  <FaUserFriends className="text-white text-4xl" />
                </div>
              </div>
              <p className="text-center text-gray-700 text-lg font-medium">
                👥 Total Users
              </p>
              <p className="text-center text-3xl font-bold text-indigo-600 mt-2">
                {data.length}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
