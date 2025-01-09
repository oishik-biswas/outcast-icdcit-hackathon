import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import TaskPage from './TaskPage';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic, for example, sending tasks to the backend
    console.log(tasks);
    
  };

  return (
<div className="flex bg-[#d4f3fd] min-h-[100vh]">
    <div className="">
      <div className="hidden md:block fixed"> 
        <SideBar />
      </div>
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
