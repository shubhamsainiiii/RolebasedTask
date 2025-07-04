import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { FaChalkboardTeacher, FaPlusCircle, FaBook } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backendurl = "http://localhost:2000";

const AddBatch = () => {
  const [name, setName] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${backendurl}/course/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data.data || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Failed to load courses.");
      }
    };

    fetchCourses();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !selectedCourseId) {
      toast.warn("Please enter a batch name and select a course.");
      return;
    }

    try {
      await axios.post(
        `${backendurl}/batch/create`,
        {
          name,
          course: selectedCourseId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Batch added successfully!");
      setName("");
      setSelectedCourseId("");
    } catch (error) {
      console.error("Error adding batch:", error);
      toast.error("Failed to add batch.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2]">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <Header />

        <div className="p-6">
          <div className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl border-t-4 border-indigo-800 hover:shadow-xl transition">
            <div className="flex items-center gap-3 border-b border-gray-200 p-6">
              <FaChalkboardTeacher className="text-indigo-800 text-3xl" />
              <h2 className="text-xl font-semibold text-gray-800">
                Add New Batch
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Batch Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Batch Name
                </label>
                <div className="flex items-center border border-gray-300 rounded px-3 py-2 bg-white">
                  <FaPlusCircle className="text-gray-500 mr-2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter batch name"
                    className="w-full outline-none text-gray-800"
                  />
                </div>
              </div>

              {/* Course Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Course
                </label>
                <div className="flex items-center border border-gray-300 rounded px-3 py-2 bg-white">
                  <FaBook className="text-gray-500 mr-2" />
                  <select
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                    className="w-full outline-none bg-white text-gray-800"
                  >
                    <option value="">Select a course</option>
                    {courses.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.title || course.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-right">
                <button
                  type="submit"
                  className="bg-indigo-700 hover:bg-indigo-800 text-white font-semibold px-6 py-2 rounded cursor-pointer transition-all duration-500"
                >
                  Add Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBatch;
