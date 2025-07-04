import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import axios from 'axios';
import { FaUserTie, FaUserGraduate } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const backendurl = "http://localhost:2000";

const ClientDashboard = () => {
  const [staffCount, setStaffCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
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

        const users = response.data || [];

        const staffRoles = ["admin", "sub-admin", "HR", "trainer"];
        const staff = users.filter(user => staffRoles.includes(user.role));
        const students = users.filter(user => user.role === "student");

        setStaffCount(staff.length);
        setStudentCount(students.length);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  });

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
          <Link to='/client/users'>
            <div className="bg-white rounded-3xl p-6 shadow-sm shadow-gray-400 flex flex-col gap-6 justify-center items-center transition-all duration-300">
              <h2 className="text-2xl font-semibold text-gray-800">User Overview</h2>
              <div className="w-full flex justify-around items-center gap-4">

                {/* Staff Info */}
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-full p-4 mb-2">
                    <FaUserTie className="text-white text-3xl" />
                  </div>
                  <p className="text-gray-700 font-medium">Total Staff</p>
                  <p className="text-2xl font-bold text-purple-700">{staffCount}</p>
                </div>

                {/* Divider */}
                <div className="w-px h-20 bg-gray-300" />

                {/* Student Info */}
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full p-4 mb-2">
                    <FaUserGraduate className="text-white text-3xl" />
                  </div>
                  <p className="text-gray-700 font-medium">Total Students</p>
                  <p className="text-2xl font-bold text-cyan-700">{studentCount}</p>
                </div>

              </div>
            </div>
          </Link>
        </div>
      </div>
    </div >
  );
};

export default ClientDashboard;
