import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import SideBar from '../components/SideBar';

function CoursesPage() {
  const [modules, setModules] = useState({}); // State to store modules
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  useEffect(() => {
    // Fetch modules from the backend
    let skills= localStorage.getItem("skills")?.trim();

    // Validate and clean userId
    if (skills?.startsWith('"') && skills?.endsWith('"')) {
      skills = skills.slice(1, -1);
    }
    const fetchModules = async () => {
      try {
        const response = await fetch(`http://localhost:4000/${skills}/courses`); // Replace with your backend endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch modules');
        }
        const data = await response.json();
        setModules(data); // Set the modules data from backend
      } catch (error) {
        console.error('Error fetching modules:', error);
      }
    };

    fetchModules();
  }, []); // Empty dependency array ensures this runs once on component mount

  const handleModuleClick = (module, details) => {
    navigate(`/module/${module}`, { state: details }); // Pass details as state when navigating
  };

  const tominimize = () => {
    navigate(`/minimizepdf`);
  };

  const toexam = () => {
    navigate(`/exam`);
  };

  return (
    <div className='flex bg-[#d4f3fd] min-h-[100vh] h-auto overflow-hidden'>
      <div className='hidden md:block fixed'>
        <SideBar />
      </div>
      <div className="w-auto h-auto">
        <div className="text-[50px] py-[20px] ml-[8rem] font-semibold flex gap-[400px]">
          Courses Page
          <div className='text-[20px] flex gap-[30px] mt-[1rem]'>
            <button
              className='bg-[rgb(173,189,226)] border-[rgb(156,176,222)] h-[40px] w-auto px-[2rem] py-[1rem] rounded-[30px] flex items-center overflow-hidden hover:text-white hover:bg-[rgb(135,163,229)]'
              onClick={tominimize}
            >
              Minimize any pdf
            </button>
            <button
              className='bg-[rgb(173,189,226)] border-[rgb(156,176,222)] h-[40px] w-auto px-[2rem] py-[1rem] rounded-[30px] flex items-center hover:text-white hover:bg-[rgb(135,163,229)]'
              onClick={toexam}
            >
              Exam
            </button>
          </div>
        </div>
        <div className="text-[20px] font-light ml-[8rem]">Recommendations</div>
        <div className='bg-gradient-to-l from-[rgb(180,192,220)] via-gray-200 to-[rgb(180,192,220)] w-[1000px] h-auto ml-[8rem] rounded-[30px] '>
          <div className='flex flex-col gap-[10px] m-[20px]'>
            {Object.keys(modules).length > 0 ? (
              Object.keys(modules).map((module) => (
                <div
                  key={module}
                  className='relative w-[900px] h-[120px] ml-[2rem] border-2 border-[#ccc] my-[15px] rounded-[15px] bg-white p-6 shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 transform hover:scale-105'
                  onClick={() => handleModuleClick(module, modules[module])}
                >
                  <div className="font-semibold text-xl text-gray-700">{module}</div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">Loading modules...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursesPage;
