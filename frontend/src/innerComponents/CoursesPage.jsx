import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import SideBar from '../components/SideBar';

// Sample module data with description and instructor names
const modules = {
  "Module 1": [
    { description: "Introduction to React", instructor: "John Doe" },
    { description: "React Basics", instructor: "Jane Smith" }
  ],
  "Module 2": [
    { description: "Advanced JavaScript", instructor: "Michael Brown" },
    { description: "Asynchronous Programming", instructor: "Emily Davis" }
  ],
  "Module 3": [
    { description: "Web Development Fundamentals", instructor: "Sarah Lee" },
    { description: "Frontend Frameworks", instructor: "David Wilson" }
  ],
  "Module 4": [
    { description: "Backend Development with Node.js", instructor: "Chris Johnson" },
    { description: "APIs and Databases", instructor: "Olivia Martinez" }
  ],
  "Module 5": [
    { description: "UX/UI Design", instructor: "James Taylor" },
    { description: "Design Thinking", instructor: "Sophia Clark" }
  ],

};

function CoursesPage() {
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  const handleModuleClick = (module, details) => {
    navigate(`/module/${module}`, { state: details }); // Pass details as state when navigating
  };
  const tominimize = () => {
    navigate(`/minimizepdf`); // Pass details as state when navigating
  }

  const toexam = () => {
    navigate(`/exam`); // Pass details as state when navigating
  }

  return (
    <div className='flex bg-[#d4f3fd] h-auto'>
      <div className='hidden md:block fixed'>
        <SideBar />
      </div>
      <div className=" w-auto h-auto">
        <div className="text-[50px] py-[20px] ml-[8rem] font-semibold flex gap-[400px]">Courses Page
          <div className='text-[20px] flex gap-[30px] mt-[1rem]'><button className='bg-[rgb(173,189,226)] border-[rgb(156,176,222)] h-[40px] w-auto px-[2rem] py-[1rem] rounded-[30px] flex items-center hover:text-white hover:bg-[rgb(135,163,229)]'
          onClick={tominimize}>
            Minimize any pdf</button> 
          <button className='bg-[rgb(173,189,226)] border-[rgb(156,176,222)] h-[40px] w-auto px-[2rem] py-[1rem] rounded-[30px] flex items-center hover:text-white hover:bg-[rgb(135,163,229)]'
          onClick={toexam}>
            Exam</button></div>
        </div>
        <div className="text-[20px] font-light ml-[8rem]">Recommendations</div>
        <div className='bg-gradient-to-l from-[rgb(180,192,220)] via-gray-200 to-[rgb(180,192,220)] w-[1000px] h-auto ml-[8rem] rounded-[30px] '>
          <div className='flex flex-col gap-[10px] m-[20px]'>
            {Object.keys(modules).map((module) => (
             <div
             key={module}
             className='relative w-[900px] h-[120px] ml-[2rem] border-2 border-[#ccc] my-[15px] rounded-[15px] bg-white p-6 shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 transform hover:scale-105'
             onClick={() => handleModuleClick(module, modules[module])} // Pass module details on click
           >
             <div className="font-semibold text-xl text-gray-700">{module}</div>
           </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursesPage;
