import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaUserShield } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const Header = () => {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("data"));
  const name = data?.user?.name || "User";
  const role = data?.user?.role?.toUpperCase() || "USER";
  const clientName = data?.user?.client?.name || "Client";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("data");
    navigate("/");
  };

  return (
    <header className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white shadow-md backdrop-blur-md border-b border-white/10 z-50">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Profile Circle */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white text-2xl shadow-lg">
          <FaUser />
        </div>

        {/* Name and Dashboard Info */}
        <div>
          <div className="text-xl font-semibold">Hello, {name}</div>
          <div className="flex items-center gap-2 text-blue-300 font-medium text-sm">
            <MdDashboard className="text-base" />
            {role === "SUPERADMIN"
              ? "SuperAdmin Dashboard"
              : `${clientName} Dashboard`}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Role Badge */}
        <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold shadow-md text-sm">
          <FaUserShield />
          {role}
        </span>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white font-medium rounded-xl shadow-md text-sm cursor-pointer"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
