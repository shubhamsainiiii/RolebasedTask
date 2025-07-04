import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';

const backendurl = "http://localhost:2000";

const SuperAdminDashboard = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

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
      }
    };

    fetchData();
  });

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2]">
      <Sidebar />
      <div className="flex-1">
        <Header />

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link to="/super-admin/total-clients">
            <div className="bg-white rounded-2xl shadow-sm transform transition-all duration-300 p-6 cursor-pointer group border-t-4 border-transparent hover:border-indigo-900 hover:translate-y-1">
              <div className="flex justify-center items-center mb-4">
                <div className="bg-indigo-500 text-white rounded-full p-4 shadow-lg">
                  <FaUsers className="text-3xl" />
                </div>
              </div>
              <h3 className="text-center text-gray-800 text-xl font-semibold">
                Total Clients
              </h3>
              <p className="text-center text-4xl font-bold text-gray-800 mt-2">
                {data.length}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;

