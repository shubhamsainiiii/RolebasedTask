import React from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { FaEnvelope, FaUserShield, FaBuilding } from "react-icons/fa";

const UserDashboard = () => {
  const { user } = JSON.parse(localStorage.getItem("data"));

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <Header />
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">👤 Your Profile</h2>
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-transform duration-300 p-6 cursor-pointer">
              {/* Profile Image */}
              <div className="flex justify-center mb-4">
                <img
                    src={
                      user.image
                        ? ""
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            user.name
                          )}&background=random`
                    }
                    alt=""
                    className="w-28 h-28 rounded-full object-cover border-4 border-blue-200 shadow-md"
                  />
              </div>

              {/* User Info */}
              <div className="text-center space-y-2">
                <p className="text-xl font-bold text-gray-800">👤 {user.name}</p>

                <p className="text-sm text-gray-600">
                  <FaUserShield className="inline mr-1 text-green-500" />
                  Role: <span className="font-medium">{user.role}</span>
                </p>

                {user.client?.name && (
                  <p className="text-sm text-gray-600">
                    <FaBuilding className="inline mr-1 text-purple-500" />
                    Client: <span className="font-medium">{user.client.name}</span>
                  </p>
                )}

                <p className="text-sm text-gray-600">
                  <FaEnvelope className="inline mr-1 text-blue-500" />
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
