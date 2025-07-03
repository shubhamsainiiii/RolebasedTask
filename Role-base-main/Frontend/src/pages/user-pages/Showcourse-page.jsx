import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const backendurl = "http://localhost:2000";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${backendurl}/course/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        console.log(data.data);
        setCourses(data.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setMessage("❌ Failed to fetch courses.");
      }
    };

    fetchCourses();
  }, [token]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📚 All Courses</h2>

          {message && <p className="text-red-500 mb-4">{message}</p>}

          {courses.length === 0 ? (
            <p className="text-gray-600">No courses found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-semibold text-indigo-700">
                    📘 {course.name}
                  </h3>

                  <p className="text-sm text-gray-600 mt-2">
                    👤 Created By:{" "}
                    <span className="font-medium">
                      {course.user_id?.name || "N/A"}
                    </span>
                  </p>

                  <p className="text-sm text-gray-600">
                    🛡️ Role:{" "}
                    <span className="font-medium">
                      {course.user_id?.role || "N/A"}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCourses;
