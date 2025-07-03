import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

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
                const data = response.data
                console.log(data.data)
                setBatches(data.data); // Make sure this matches your backend structure
            } catch (error) {
                console.error("Error fetching batches:", error);
                setMessage("❌ Failed to fetch batches.");
            }
        };

        fetchBatches();
    }, [token]);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1">
                <Header />
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">📋 All Batches</h2>

                    {message && <p className="text-red-500 mb-4">{message}</p>}

                    {batches.length === 0 ? (
                        <p className="text-gray-600">No batches found.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {batches.map((batch, index) => (
                                <div
                                    key={index}
                                    className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition"
                                >
                                    <h3 className="text-lg font-semibold text-indigo-700">
                                        🏷️ {batch.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-2">
                                        📘 course: <span className="font-medium">
                                            {batch.course.name || "N/A"}
                                        </span>
                                    </p>
                                    <p className="text-sm text-gray-600 mt-2">
                                        👤 Created By: <span className="font-medium">
                                            {batch.user_id.name || "N/A"}
                                        </span>
                                    </p>

                                    <p className="text-sm text-gray-600">
                                        🛡️ Role: <span className="font-medium">
                                            {batch.user_id?.role || "N/A"}
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

export default AllBatches;
