import React from 'react';
import { useNavigate } from 'react-router-dom';
import Coursecardimg from '../assets/Coursecard.png';

function CoursesCard() {
  const navigate= useNavigate();
  const tocourse=(e)=>{
     e.preventDefault();

     navigate("/coursespage");
  };
  return (
    <div>
         <div className="w-[26vw] h-[25rem]  border-2 rounded-lg bg-white ml-[2rem] mt-[1rem]">
         <h1 className='text-3xl font-bold text-[40px] px-5 py-[1rem] mt-[2rem]'>Courses</h1>
         <p className='text-[19px] font-semibold ml-[1rem] '>Micro Courses offered to you featured by AI </p>
         <p className='text-[15px] font-light ml-[1rem] '>This will fasten up your course with detailed study set by AI and that too for FREE!!</p>
         <img src={Coursecardimg} alt="" srcset="" className='h-[110px] ml-[1rem]' />
         <div className="topline  ml-[1rem]">

         </div>
         <div className="btn ml-[1rem]">
            <button onClick={tocourse} className='rounded-2xl bg-black text-white justify-self-end self-end mr-5 w-[7rem] h-[2rem]'>
            View</button>

            </div>
            <div className="bottom w-[80%] ml-[1rem]">
              <p className="font-thin text-sm">View your courses here</p>
            </div>
</div>
    </div>
  )
}

export default CoursesCard
