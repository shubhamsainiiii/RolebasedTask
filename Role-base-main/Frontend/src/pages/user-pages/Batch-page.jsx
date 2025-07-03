import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const backendurl = "http://localhost:2000";

const AddBatch = () => {
  const [name, setName] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  // Fetch all available courses on mount
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
      }
    };

    fetchCourses();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !selectedCourseId) {
      setMessage("⚠️ Please enter a batch name and select a course.");
      return;
    }

    try {
      const response = await axios.post(
        `${backendurl}/batch/create`,
        {
          name,
          course: selectedCourseId, // Adjust if your backend expects a different key
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("✅ Batch added successfully!");
      setName("");
      setSelectedCourseId("");
    } catch (error) {
      console.error("Error adding batch:", error);
      setMessage("❌ Failed to add batch.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">👥 Add Batch</h2>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-md p-6 w-full max-w-lg space-y-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Batch Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
            />

            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
            >
              <option value="">🔽 Select a Course</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title || course.name}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
            >
              Add Batch
            </button>

            {message && <p className="text-sm text-red-500">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBatch;
