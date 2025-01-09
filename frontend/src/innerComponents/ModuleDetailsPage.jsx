import React from 'react';
import { useLocation, useParams } from 'react-router-dom'; // Import useLocation and useParams

const ModuleDetailsPage = () => {
  const { moduleName } = useParams(); // Get the module name from URL params
  const location = useLocation(); // Use useLocation to access the state passed from CoursesPage
  const moduleDetails = location.state; // Retrieve the module details (description, instructor)

  if (!moduleDetails) {
    return <div>Module not found</div>;
  }

  return (
    <div className="flex flex-col items-center bg-[#f0f0f0] min-h-screen py-10 h-auto w-[100vw]">
      <h1 className="text-[40px] font-semibold">{moduleName}</h1>
      <div className="bg-white w-[80%] p-6 mt-6 rounded-[15px] shadow-lg h-auto ">
        <h2 className="text-[25px] font-semibold mb-4">Details</h2>
        {moduleDetails.map((moduleData, index) => (
          <div key={index} className="mb-4">
            <div className="text-[18px] font-semibold">{moduleData.description}</div>
            <div className="text-[16px] text-gray-500">Instructor: {moduleData.instructor}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModuleDetailsPage;
