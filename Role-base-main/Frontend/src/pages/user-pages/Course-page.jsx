import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { FaBookOpen, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backendurl = "http://localhost:2000";

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.warn("Please enter a course name.");
      return;
    }

    try {
      await axios.post(
        `${backendurl}/course/create`,
        { name: title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Course added successfully!");
      setTitle("");
    } catch (error) {
      console.error("Error adding course:", error);
      toast.error("Failed to add course.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2]">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <Header />
        <div className="p-6">
          <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-md border-t-4 border-indigo-800 transition hover:shadow-lg">
            <div className="flex items-center gap-3 border-b border-gray-200 p-6">
              <FaBookOpen className="text-indigo-800 text-2xl" />
              <h2 className="text-xl font-semibold text-gray-800">
                Add New Course
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Input Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Name
                </label>
                <div className="flex items-center border border-gray-300 rounded px-3 py-2 bg-white">
                  <FaPlus className="text-gray-500 mr-2" />
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter course name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full outline-none text-gray-800"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-right">
                <button
                  type="submit"
                  className="bg-indigo-700 hover:bg-indigo-800 cursor-pointer text-white font-semibold px-6 py-2 rounded transition-all duration-500"
                >
                  Add Course
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
