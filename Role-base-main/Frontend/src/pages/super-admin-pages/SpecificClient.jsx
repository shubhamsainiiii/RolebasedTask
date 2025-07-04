import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { useParams } from 'react-router-dom';
import {
  FaUserCircle,
  FaUserTag,
  FaEnvelope,
  FaUserShield
} from 'react-icons/fa';

const backendurl = "http://localhost:2000";

const SpecificClient = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [clientName, setClientName] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendurl}/users/getclient/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setData(response.data);

        // If at least one user has a client object, set the name
        if (response.data.length > 0 && response.data[0].client) {
          setClientName(response.data[0].client.name);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, token]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 h-[calc(100vh-10px)] overflow-y-auto pr-6">
        <Header />

        {/* Heading with client name */}
        <div className="mt-6 mb-4 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Users of <span className="text-gray-900">{clientName}</span>
          </h2>
        </div>
        <div className="px-6 sm:px-8 lg:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data &&
              data
                .filter((item) => item.role !== "client")
                .map((item, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 p-5"
                  >
                    <div className="flex justify-center mb-4 text-indigo-500">
                      <FaUserCircle size={48} />
                    </div>

                    <div className="text-center space-y-1">
                      <p className="text-lg font-bold text-gray-800">{item.name}</p>

                      <p className="text-sm text-gray-600 flex justify-center items-center gap-2">
                        <FaUserTag className="text-gray-500" /> Role:
                        <span className="font-medium text-indigo-600">{item.role}</span>
                      </p>

                      {item.client && (
                        <p className="text-sm text-gray-600 flex justify-center items-center gap-2">
                          <FaUserShield className="text-gray-500" /> Client:
                          <span className="font-medium">{item.client.name}</span>
                        </p>
                      )}

                      <p className="text-sm text-gray-600 flex justify-center items-center gap-2">
                        <FaEnvelope className="text-gray-500" /> {item.email}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SpecificClient;