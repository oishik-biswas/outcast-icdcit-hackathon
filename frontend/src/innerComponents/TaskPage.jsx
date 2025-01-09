import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";

const TaskPage = () => {
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDay = dayNames[new Date().getDay()]; // Get the current day name

  const [tasks, setTasks] = useState({});
  const [selectedDay, setSelectedDay] = useState(currentDay); // Set the default selected day
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let userId = localStorage.getItem("userId")?.trim();
    if (userId.startsWith('"') && userId.endsWith('"')) {
      userId = userId.slice(1, -1);
    }

    if (!userId) {
      console.error("User ID not found");
      setError("User ID not found. Please log in.");
      setLoading(false);
      return;
    }

    // Check if userId is a valid ObjectId (24 characters long and hex)
    if (!/^[a-fA-F0-9]{24}$/.test(userId)) {
      console.error("Invalid userId format");
      setError("Invalid User ID format. Please check your session.");
      setLoading(false);
      return;
    }

    console.log("Retrieved userId:", userId); // Log userId
    console.log("Type of userId:", typeof userId); // Log type of userId

    // Fetch tasks from the backend using userId
    axios
      .get(`http://localhost:4000/tasks/${userId}`)
      .then((response) => {
        setTasks(response.data); // Assume response.data is the JSON with days as keys
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error.response || error.message || error);
        setError("Error fetching tasks. Please try again later.");
        setLoading(false);
      });
  }, []);

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  return (
    <div className="flex bg-[#d4f3fd] h-[100vh]">
      <div className="hidden md:block fixed">
        <SideBar />
      </div>
      <div className="ml-[8rem] w-full p-6">
        <div className="font-sans text-gray-700">
          <h1 className="text-3xl font-bold mb-6">Weekly Schedule</h1>
          <div className="flex flex-wrap gap-4 mb-6">
            {dayNames.map((day) => (
              <button
                key={day}
                onClick={() => handleDayClick(day)}
                className={`px-6 py-3 border rounded-lg shadow-md transition duration-300 ${
                  selectedDay === day
                    ? "bg-[rgb(127,127,250)] text-white border-[rgb(120,120,244)]"
                    : "bg-white text-black border-gray-300 hover:bg-blue-100 hover:shadow-lg"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
          <div>
            {loading ? (
              <h2 className="text-xl text-gray-500">Loading tasks...</h2>
            ) : error ? (
              <h2 className="text-xl text-red-500">{error}</h2>
            ) : (
              <div>
                <h2 className="text-xl font-semibold mb-4">Tasks for {selectedDay}:</h2>
                <ul className="space-y-4">
                  {tasks[selectedDay]?.length ? (
                    tasks[selectedDay].map((taskData, index) => (
                      <li
                        key={index}
                        className="bg-gradient-to-l from-[rgb(170,170,247)] via-[rgb(190,190,254)] to-[rgb(194,194,250)] p-4 rounded-lg shadow-2xl hover:shadow-3xl transition duration-300"
                      >
                        <div className="font-semibold">{taskData.task}</div>
                        <div className="text-sm text-gray-600">
                          {taskData.from} - {taskData.to}
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">No tasks for {selectedDay}</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
