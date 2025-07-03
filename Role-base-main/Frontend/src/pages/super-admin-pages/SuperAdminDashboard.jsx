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
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Header />

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link to="/super-admin/total-clients">
            <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer group">
              <div className="flex justify-center items-center mb-4">
                <div className="bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full p-5 shadow-lg">
                  <FaUsers className="text-white text-4xl" />
                </div>
              </div>
              <p className="text-center text-gray-700 text-lg font-medium">
                👤 Total Clients
              </p>
              <p className="text-center text-3xl font-bold text-amber-700 mt-2">
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
