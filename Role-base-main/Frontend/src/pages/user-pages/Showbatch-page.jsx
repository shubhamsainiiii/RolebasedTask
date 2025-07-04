// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "../../components/Sidebar";
// import Header from "../../components/Header";

// const backendurl = "http://localhost:2000";

// const AllBatches = () => {
//     const [batches, setBatches] = useState([]);
//     const [message, setMessage] = useState("");
//     const token = localStorage.getItem("token");

//     useEffect(() => {
//         const fetchBatches = async () => {
//             try {
//                 const response = await axios.get(`${backendurl}/batch/get`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 const data = response.data
//                 console.log(data.data)
//                 setBatches(data.data); // Make sure this matches your backend structure
//             } catch (error) {
//                 console.error("Error fetching batches:", error);
//                 setMessage("❌ Failed to fetch batches.");
//             }
//         };

//         fetchBatches();
//     }, [token]);

//     return (
//         <div className="flex min-h-screen bg-gray-100">
//             <Sidebar />
//             <div className="flex-1">
//                 <Header />
//                 <div className="p-6">
//                     <h2 className="text-2xl font-bold text-gray-800 mb-4">📋 All Batches</h2>

//                     {message && <p className="text-red-500 mb-4">{message}</p>}

//                     {batches.length === 0 ? (
//                         <p className="text-gray-600">No batches found.</p>
//                     ) : (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                             {batches.map((batch, index) => (
//                                 <div
//                                     key={index}
//                                     className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition"
//                                 >
//                                     <h3 className="text-lg font-semibold text-indigo-700">
//                                         🏷️ {batch.name}
//                                     </h3>
//                                     <p className="text-sm text-gray-600 mt-2">
//                                         📘 course: <span className="font-medium">
//                                             {batch.course.name || "N/A"}
//                                         </span>
//                                     </p>
//                                     <p className="text-sm text-gray-600 mt-2">
//                                         👤 Created By: <span className="font-medium">
//                                             {batch.user_id.name || "N/A"}
//                                         </span>
//                                     </p>

//                                     <p className="text-sm text-gray-600">
//                                         🛡️ Role: <span className="font-medium">
//                                             {batch.user_id?.role || "N/A"}
//                                         </span>
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AllBatches;


import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {
    FaChalkboardTeacher,
    FaBook,
    FaUserShield,
    FaUser,
} from "react-icons/fa";

const backendurl = "http://localhost:2000";

const AllBatches = () => {
    const [batches, setBatches] = useState([]);
    const [message, setMessage] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchBatches = async () => {
            try {
                const response = await axios.get(`${backendurl}/batch/get`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = response.data;
                setBatches(data.data || []);
            } catch (error) {
                console.error("Error fetching batches:", error);
                setMessage("Failed to fetch batches.");
            }
        };

        fetchBatches();
    }, [token]);

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2]">
            <Sidebar />
            <div className="flex-1 overflow-y-auto">
                <Header />
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        All Batches
                    </h2>

                    {message && (
                        <p className="text-sm text-red-600 font-medium mb-4">{message}</p>
                    )}

                    {batches.length === 0 ? (
                        <p className="text-gray-600">No batches found.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {batches.map((batch, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl shadow-sm transform transition-all duration-300 p-6 cursor-pointer group border-t-4 border-transparent hover:border-indigo-900 hover:translate-y-1"
                                >
                                    {/* Icon Avatar */}
                                    <div className="flex justify-center mb-4">
                                        <div className="bg-indigo-500 text-white rounded-full p-4 shadow-lg">
                                            <FaChalkboardTeacher className="text-3xl" />
                                        </div>
                                    </div>

                                    {/* Batch Info */}
                                    <div className="text-center space-y-2">
                                        <p className="text-lg font-bold text-gray-800">
                                            {batch.name}
                                        </p>

                                        <p className="text-sm text-gray-600">
                                            <FaBook className="inline mr-2 text-gray-500" />
                                            Course:{" "}
                                            <span className="font-medium">
                                                {batch.course?.name || "N/A"}
                                            </span>
                                        </p>

                                        <p className="text-sm text-gray-600">
                                            <FaUser className="inline mr-2 text-gray-500" />
                                            Created By:{" "}
                                            <span className="font-medium">
                                                {batch.user_id?.name || "N/A"}
                                            </span>
                                        </p>

                                        <p className="text-sm text-gray-600">
                                            <FaUserShield className="inline mr-2 text-gray-500" />
                                            Role:{" "}
                                            <span className="font-medium">
                                                {batch.user_id?.role || "N/A"}
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

export default AllBatches;
