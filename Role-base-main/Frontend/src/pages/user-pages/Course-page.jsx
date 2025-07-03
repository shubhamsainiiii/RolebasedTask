import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const backendurl = "http://localhost:2000";

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setMessage("⚠️ Please enter a course name.");
      return;
    }

    try {
      const response = await axios.post(
        `${backendurl}/course/create`,
        { name:title},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("✅ Course added successfully!");
      setTitle("");
    } catch (error) {
      console.error("Error adding course:", error);
      setMessage("❌ Failed to add course.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📚 Add Course</h2>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-md p-6 w-full max-w-lg space-y-4"
          >
            <input
              type="text"
              name="title"
              placeholder="Course Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
            >
              Add Course
            </button>
            {message && <p className="text-sm text-red-500">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
