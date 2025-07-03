import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaUsers, FaUserShield, FaPlus, FaUser, FaBook, FaLayerGroup } from 'react-icons/fa';

const Sidebar = () => {
  const data = JSON.parse(localStorage.getItem("data"));
  const role = data?.user?.role;

  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const linkClasses =
    "flex items-center gap-3 px-4 py-3 text-white hover:bg-white hover:text-amber-800 transition rounded-md";

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-gradient-to-b from-amber-800 to-yellow-700 min-h-screen p-4 transition-all duration-300`}
    >
      <div className="flex justify-end mb-6">
        <button
          onClick={toggleSidebar}
          className="text-white text-2xl focus:outline-none"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <ul className="space-y-4">
        {/* Super Admin Links */}
        {role === "superadmin" && (
          <>
            <Link to="/super-admin" className={linkClasses}>
              <FaUserShield />
              {isOpen && <span>Admin Dashboard</span>}
            </Link>
            <Link to="/super-admin/total-clients" className={linkClasses}>
              <FaUsers />
              {isOpen && <span>Total Clients</span>}
            </Link>
            <Link to="/super-admin/total-users" className={linkClasses}>
              <FaUsers />
              {isOpen && <span>Total Users</span>}
            </Link>
            <Link to="/super-admin/create-client" className={linkClasses}>
              <FaPlus />
              {isOpen && <span>Create Client</span>}
            </Link>
          </>
        )}

        {/* Client Links */}
        {role === "client" && (
          <>
            <Link to="/client" className={linkClasses}>
              <FaUser />
              {isOpen && <span>Client Dashboard</span>}
            </Link>
            <Link to="/client/users" className={linkClasses}>
              <FaUsers />
              {isOpen && <span>Total Users</span>}
            </Link>
            <Link to="/client/create-users" className={linkClasses}>
              <FaPlus />
              {isOpen && <span>Create User</span>}
            </Link>
          </>
        )}

        {/* Admin / Sub-admin / HR / Trainer Sidebar */}
        {["admin", "sub-admin", "HR"].includes(role) && (
          <>
            <Link to="/users" className={linkClasses}>
              <FaUser />
              {isOpen && <span>Users</span>}
            </Link>
            <Link to="/client/users" className={linkClasses}>
              <FaUsers />
              {isOpen && <span>Total Users</span>}
            </Link>
            <Link to="/courses" className={linkClasses}>
              <FaPlus />
              {isOpen && <span>Create Course</span>}
            </Link>
            <Link to="/batches" className={linkClasses}>
              <FaPlus />
              {isOpen && <span>Create Batch</span>}
            </Link>
            <Link to="/show-courses" className={linkClasses}>
              <FaBook />
              {isOpen && <span>Show Courses</span>}
            </Link>
            <Link to="/show-batch" className={linkClasses}>
              <FaLayerGroup />
              {isOpen && <span>Show Batches</span>}
            </Link>
          </>
        )}

          {role === "trainer" && (
          <>
            <Link to="/users" className={linkClasses}>
              <FaUser />
              {isOpen && <span>Users</span>}
            </Link>
            <Link to="/client/users" className={linkClasses}>
              <FaUsers />
              {isOpen && <span>Total Users</span>}
            </Link>
           
            <Link to="/show-courses" className={linkClasses}>
              <FaBook />
              {isOpen && <span>Show Courses</span>}
            </Link>
            <Link to="/show-batch" className={linkClasses}>
              <FaLayerGroup />
              {isOpen && <span>Show Batches</span>}
            </Link>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
