import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiMenu, FiX,
  FiUsers, FiUserPlus, FiUser, FiLayers,
  FiShield, FiBookOpen
} from 'react-icons/fi';

const Sidebar = () => {
  const data = JSON.parse(localStorage.getItem("data"));
  const role = data?.user?.role;

  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const linkClasses = "flex items-center gap-3 px-4 py-3 hover:bg-white/20 text-white rounded-lg transition-all duration-200";

  return (
    <div className={` min-h-screen transition-all duration-300 ${isOpen ? "w-64" : "w-20"} bg-gradient-to-b from-gray-900 via-indigo-900 to-purple-900 p-4 shadow-lg`}>
      {/* Sidebar Header with Toggle */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-white font-bold text-lg flex items-center gap-2">
          {isOpen && <span>Dashboard</span>}
        </div>
        <button
          onClick={toggleSidebar}
          className="text-white text-2xl focus:outline-none"
        >
          {isOpen ? <FiX size={22} /> : <FiMenu size={22} className='mr-3' />}
        </button>
      </div>

      <ul className="space-y-3">
        {/* Super Admin */}
        {role === "superadmin" && (
          <>
            <Link to="/super-admin" className={linkClasses}>
              <FiShield /> {isOpen && <span>Admin Dashboard</span>}
            </Link>
            <Link to="/super-admin/total-clients" className={linkClasses}>
              <FiUsers /> {isOpen && <span>Total Clients</span>}
            </Link>
            <Link to="/super-admin/total-users" className={linkClasses}>
              <FiUsers /> {isOpen && <span>Total Users</span>}
            </Link>
            <Link to="/super-admin/create-client" className={linkClasses}>
              <FiUserPlus /> {isOpen && <span>Create Client</span>}
            </Link>
          </>
        )}

        {/* Client */}
        {role === "client" && (
          <>
            <Link to="/client" className={linkClasses}>
              <FiUser /> {isOpen && <span>Client Dashboard</span>}
            </Link>
            <Link to="/client/users" className={linkClasses}>
              <FiUsers /> {isOpen && <span>Total Users</span>}
            </Link>
            <Link to="/client/create-users" className={linkClasses}>
              <FiUserPlus /> {isOpen && <span>Create User</span>}
            </Link>
          </>
        )}

        {/* Admin / Sub-admin / HR */}
        {["admin", "sub-admin", "HR"].includes(role) && (
          <>
            <Link to="/users" className={linkClasses}>
              <FiUser /> {isOpen && <span>Users</span>}
            </Link>
            <Link to="/client/users" className={linkClasses}>
              <FiUsers /> {isOpen && <span>Total Users</span>}
            </Link>
            {(role === "admin" || role === "sub-admin") && (
              <Link to="/client/create-users" className={linkClasses}>
                <FiUserPlus /> {isOpen && <span>Create User</span>}
              </Link>
            )}
            <Link to="/courses" className={linkClasses}>
              <FiUserPlus /> {isOpen && <span>Create Course</span>}
            </Link>
            <Link to="/batches" className={linkClasses}>
              <FiUserPlus /> {isOpen && <span>Create Batch</span>}
            </Link>
            <Link to="/show-courses" className={linkClasses}>
              <FiBookOpen /> {isOpen && <span>Show Courses</span>}
            </Link>
            <Link to="/show-batch" className={linkClasses}>
              <FiLayers /> {isOpen && <span>Show Batches</span>}
            </Link>
          </>
        )}

        {/* Trainer */}
        {role === "trainer" && (
          <>
            <Link to="/users" className={linkClasses}>
              <FiUser /> {isOpen && <span>Users</span>}
            </Link>
            <Link to="/client/users" className={linkClasses}>
              <FiUsers /> {isOpen && <span>Total Users</span>}
            </Link>
            <Link to="/show-courses" className={linkClasses}>
              <FiBookOpen /> {isOpen && <span>Show Courses</span>}
            </Link>
            <Link to="/show-batch" className={linkClasses}>
              <FiLayers /> {isOpen && <span>Show Batches</span>}
            </Link>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
