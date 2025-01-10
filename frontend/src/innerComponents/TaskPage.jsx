import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskPage = () => {
  const [tasks, setTasks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let userId = localStorage.getItem("userId")?.trim();

    // Validate and clean userId
    if (userId?.startsWith('"') && userId?.endsWith('"')) {
      userId = userId.slice(1, -1);
    }

    if (!userId) {
      console.error("User ID not found in localStorage.");
      setError("User ID not found. Please log in.");
      setLoading(false);
      return;
    }

    if (!/^[a-fA-F0-9]{24}$/.test(userId)) {
      console.error("Invalid userId format.");
      setError("Invalid User ID format. Please check your session.");
      setLoading(false);
      return;
    }

    // Fetch tasks from backend
    axios
      .get(`http://localhost:4000/schedule/${userId}`)
      .then((response) => {
        console.log("Tasks fetched successfully:", response.data);
        setTasks(response.data); // Set the entire response as tasks
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error.response || error.message || error);
        setError("Error fetching tasks. Please try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-[#d4f3fd] min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Weekly Tasks</h1>
      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading tasks...</p>
      ) : error ? (
        <p className="text-center text-red-500 text-lg">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(tasks).map(([day, taskList]) => (
            <div
              key={day}
              className="bg-white shadow-md rounded-lg p-6 border-t-4 border-blue-500"
            >
              <h2 className="text-xl font-semibold text-blue-600 mb-4">{day}</h2>
              <ul className="space-y-3">
                {taskList.length > 0 ? (
                  taskList.map((task, index) => (
                    <li
                      key={index}
                      className="bg-gray-50 p-3 rounded shadow-sm border border-gray-200 text-gray-700"
                    >
                      {task}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500 italic">No tasks for this day.</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskPage;
