// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "../../components/Sidebar";
// import Header from "../../components/Header";

// const backendurl = "http://localhost:2000";

// const AllCourses = () => {
//   const [courses, setCourses] = useState([]);
//   const [message, setMessage] = useState("");
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await axios.get(`${backendurl}/course/get`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = response.data;
//         console.log(data.data);
//         setCourses(data.data);
//       } catch (error) {
//         console.error("Error fetching courses:", error);
//         setMessage("❌ Failed to fetch courses.");
//       }
//     };

//     fetchCourses();
//   }, [token]);

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <div className="flex-1">
//         <Header />
//         <div className="p-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">📚 All Courses</h2>

//           {message && <p className="text-red-500 mb-4">{message}</p>}

//           {courses.length === 0 ? (
//             <p className="text-gray-600">No courses found.</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//               {courses.map((course, index) => (
//                 <div
//                   key={index}
//                   className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition"
//                 >
//                   <h3 className="text-lg font-semibold text-indigo-700">
//                     📘 {course.name}
//                   </h3>

//                   <p className="text-sm text-gray-600 mt-2">
//                     👤 Created By:{" "}
//                     <span className="font-medium">
//                       {course.user_id?.name || "N/A"}
//                     </span>
//                   </p>

//                   <p className="text-sm text-gray-600">
//                     🛡️ Role:{" "}
//                     <span className="font-medium">
//                       {course.user_id?.role || "N/A"}
//                     </span>
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllCourses;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { FaBook, FaUser, FaUserShield } from "react-icons/fa";

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

        setCourses(response.data.data || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setMessage("❌ Failed to fetch courses.");
      }
    };

    fetchCourses();
  }, [token]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2]">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <Header />
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">All Courses</h2>

          {message && (
            <p className="text-sm text-center text-red-600 font-medium mb-4">
              {message}
            </p>
          )}

          {courses.length === 0 ? (
            <p className="text-gray-600">No courses found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-sm transform transition-all duration-300 p-6 cursor-pointer group border-t-4 border-transparent hover:border-indigo-900 hover:translate-y-1"
                >
                  {/* Icon Avatar */}
                  <div className="flex justify-center mb-4">
                    <div className="bg-indigo-500 text-white rounded-full p-4 shadow-lg">
                      <FaBook className="text-3xl" />
                    </div>
                  </div>

                  {/* Course Info */}
                  <div className="text-center space-y-2">
                    <h3 className="text-lg font-bold text-gray-800">{course.name}</h3>

                    <p className="text-sm text-gray-600">
                      <FaUser className="inline mr-2 text-gray-500" />
                      Created By:{" "}
                      <span className="font-medium">
                        {course.user_id?.name || "N/A"}
                      </span>
                    </p>

                    <p className="text-sm text-gray-600">
                      <FaUserShield className="inline mr-2 text-gray-500" />
                      Role:{" "}
                      <span className="font-medium">
                        {course.user_id?.role || "N/A"}
                      </span>
                    </p>
                  </div>
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
