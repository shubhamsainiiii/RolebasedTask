import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("data"));
  const name = data?.user?.name;
  const role = data?.user?.role;
  const clientName = data?.user?.client?.name;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("data");
    navigate("/");
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-md p-4 flex justify-between items-center px-8">
      <div className="flex items-center gap-4">
        <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-purple-600 font-bold shadow">
          {name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-lg font-semibold">
            Hello, {name} |{" "}
            {role === "superadmin" ? (
              <>
                Welcome to <span className="font-bold text-yellow-300">Super-Admin</span> Dashboard
              </>
            ) : role === "client" ? (
              <>
                Welcome to <span className="font-bold text-yellow-300">{clientName}</span> Dashboard
              </>
            ) : (
              <>
                Welcome to <span className="font-bold text-yellow-300">{clientName}</span> Dashboard
              </>
            )}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="bg-white text-purple-600 px-3 py-1 rounded-full text-sm font-semibold shadow">
          Role: {role}
        </span>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 transition px-4 py-1 rounded-md font-medium text-white"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
