import React, { useState, useEffect } from "react";
import SideBar from '../components/SideBar';

const TaskPage = () => {
  const schedule = {
    Monday: [
      { task: "Meeting with team", from: "10:00 AM", to: "11:00 AM" },
      { task: "Work on project report", from: "11:30 AM", to: "1:00 PM" }
    ],
    Tuesday: [
      { task: "Client presentation", from: "2:00 PM", to: "3:00 PM" },
      { task: "Code review", from: "3:30 PM", to: "5:00 PM" }
    ],
    Wednesday: [
      { task: "Team standup", from: "9:00 AM", to: "9:30 AM" },
      { task: "Design brainstorming session", from: "10:00 AM", to: "12:00 PM" }
    ],
    Thursday: [
      { task: "Submit project update", from: "9:00 AM", to: "10:00 AM" },
      { task: "Call with vendor", from: "4:00 PM", to: "5:00 PM" }
    ],
    Friday: [
      { task: "Weekly review meeting", from: "3:00 PM", to: "4:00 PM" },
      { task: "Prepare next week's plan", from: "4:30 PM", to: "6:00 PM" }
    ],
    Saturday: [
      { task: "Personal errands", from: "10:00 AM", to: "12:00 PM" },
      { task: "Complete online course module", from: "1:00 PM", to: "3:00 PM" }
    ],
    Sunday: [
      { task: "Relax and recharge", from: "All day", to: "All day" },
      { task: "Plan for the week ahead", from: "4:00 PM", to: "5:00 PM" }
    ],
  };
  const [selectedDay, setSelectedDay] = useState("");

  

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  useEffect(() => {
    
    const currentDay = new Date().getDay();
    
    setSelectedDay(dayNames[currentDay]);
  }, []);

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  return (
    <div className="flex bg-[#d4f3fd] h-[100vh]">
      <div className="">
        <div className="hidden md:block fixed"> 
          <SideBar />
        </div>
      </div>
      <div className="ml-[8rem] w-full p-6">
        <div className="font-sans text-gray-700">
          <h1 className="text-3xl font-bold mb-6">Weekly Schedule</h1>
          <div className="flex flex-wrap gap-4 mb-6">
            {Object.keys(schedule).map((day) => (
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
            {selectedDay ? (
              <div>
                <h2 className="text-xl font-semibold mb-4">Tasks for {selectedDay}:</h2>
                <ul className="space-y-4">
                  {schedule[selectedDay].map((taskData, index) => (
                    <li key={index} className="bg-gradient-to-l from-[rgb(170,170,247)] via-[rgb(190,190,254)] to-[rgb(194,194,250)] p-4 rounded-lg shadow-2xl hover:shadow-3xl transition duration-300">
                      <div className="font-semibold">{taskData.task}</div>
                      <div className="text-sm text-gray-600">{taskData.from} - {taskData.to}</div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <h2 className="text-xl text-gray-500">Click a day to see tasks</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
