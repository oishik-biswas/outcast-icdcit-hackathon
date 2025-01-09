import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import axios from 'axios';

function SetTaskPage() {
  const [tasks, setTasks] = useState([{ taskName: '', requiredHours: '' }]);

  const handleTaskChange = (index, event) => {
    const updatedTasks = [...tasks];
    updatedTasks[index][event.target.name] = event.target.value;
    setTasks(updatedTasks);
  };

  const handleAddTask = () => {
    setTasks([...tasks, { taskName: '', requiredHours: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve userId from localStorage and ensure any extra spaces are trimmed
    let userId = localStorage.getItem('userId')?.trim();
    console.log("Retrieved userId:", userId);  // Log the value
    if (userId.startsWith('"') && userId.endsWith('"')) {
      userId = userId.slice(1, -1);
  }
    console.log("Type of userId:", typeof userId);  // Log the type of the userId

    // Check if userId is null or invalid
    if (!userId) {
        console.error('userId is not found');
        return;
    }

    // Validate userId (must be a valid ObjectId format)
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(userId);
    console.log("Is userId valid:", isValidObjectId);  // Log the validity check

    if (!isValidObjectId) {
        console.error('Invalid userId format');
        return;
    }

    // Endpoint for task API
    const endpoint = `http://localhost:4000/tasks/${userId}`;

    try {
        // Use Promise.all to handle async POST requests for all tasks
        await Promise.all(
            tasks.map(async (task) => {
                const taskData = {
                    name: task.taskName.trim(), // Use 'name' instead of 'taskName'
                    completed: false,  // Default to false for 'completed'
                    numberOfHours: task.requiredHours,  // Use 'numberOfHours' instead of 'requiredHours'
                };

                // Send each task data to the server
                const response = await axios.post(endpoint, taskData);
                console.log("Task submitted successfully", response.data);
                
            })
        );
        alert("Submitted tasks successfully");
    } catch (error) {
        console.error('Error submitting tasks:', error.response ? error.response.data : error.message);
    }
};

  return (
    <div className="flex bg-[#d4f3fd] min-h-[100vh]">
      <div className="hidden md:block fixed">
        <SideBar />
      </div>
      <div className="set-task-container bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto h-auto my-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Set Your Tasks For The Week</h2>
        <form onSubmit={handleSubmit}>
          {tasks.map((task, index) => (
            <div key={index} className="task-form space-y-4 mb-6">
              <div className="flex space-x-4 mb-4">
                <div className="w-1/2">
                  <label htmlFor={`taskName-${index}`} className="block text-lg font-medium text-gray-700 mb-2">
                    Task Name:
                  </label>
                  <input
                    type="text"
                    id={`taskName-${index}`}
                    name="taskName"
                    value={task.taskName}
                    onChange={(e) => handleTaskChange(index, e)}
                    placeholder="Enter task name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label htmlFor={`requiredHours-${index}`} className="block text-lg font-medium text-gray-700 mb-2">
                    Required Hours:
                  </label>
                  <input
                    type="number"
                    id={`requiredHours-${index}`}
                    name="requiredHours"
                    value={task.requiredHours}
                    onChange={(e) => handleTaskChange(index, e)}
                    min="1"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="text-center">
            <button
              type="button"
              onClick={handleAddTask}
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 mb-6"
            >
              Add More Tasks
            </button>
            <button
              type="submit"
              className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
            >
              Submit Tasks
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SetTaskPage;
