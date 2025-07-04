import React from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { FaEnvelope, FaUserShield, FaBuilding, FaUser } from "react-icons/fa";

const UserDashboard = () => {
  const { user } = JSON.parse(localStorage.getItem("data"));

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#e0eafc] to-[#cfdef3]">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <Header />
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Your Profile</h2>

          <div className="max-w-md mx-auto">
            <div className="relative bg-white/60 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200 p-8 transition-transform transform hover:-translate-y-1 duration-300">

              {/* Glowing Avatar */}
              <div className="flex justify-center mb-6">
                <div className="bg-indigo-500 text-white rounded-full p-5 shadow-lg border-4 border-white ring-2 ring-indigo-300">
                  <FaUser className="text-4xl" />
                </div>
              </div>

              {/* User Info */}
              <div className="text-center space-y-3">
                <h3 className="text-xl font-semibold text-gray-800 tracking-wide">{user.name}</h3>

                <p className="text-sm text-gray-600">
                  <FaUserShield className="inline-block mr-2 text-gray-500" />
                  Role: <span className="font-medium">{user.role}</span>
                </p>

                {user.client?.name && (
                  <p className="text-sm text-gray-600">
                    <FaBuilding className="inline-block mr-2 text-gray-500" />
                    Client: <span className="font-medium">{user.client.name}</span>
                  </p>
                )}

                <p className="text-sm text-gray-600">
                  <FaEnvelope className="inline-block mr-2 text-gray-500" />
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
