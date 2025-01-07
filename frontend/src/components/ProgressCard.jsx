import React from 'react'
import { useNavigate } from 'react-router-dom';

function ProgressCard() {
  const navigate= useNavigate();
  const toprogress=(e)=>{
    e.preventDefault();
    navigate("/progresspage");
 };
  return (
    <div>
       <div className="w-[26vw] h-[25rem]  border-2 rounded-lg bg-white ml-[2rem] mt-[1rem]">
         <h1 className='text-3xl font-bold text-[40px] py-[1rem] px-5 mt-[2rem]'>Progress</h1>
         <p className='text-[15px] font-light ml-[1rem]'>AI Work model Scheduled</p>
         <div className="topline h-[40%] ml-[1rem]">

         </div>
         <div className="btn ml-[1rem]">
            <button onClick={toprogress} className='rounded-2xl bg-black text-white justify-self-end self-end mr-5 w-[7rem] h-[2rem]'>
            View</button>

            </div>
            <div className="bottom w-[80%] ml-[1rem]">
              <p className="font-thin text-sm">View your progress and finish up your work in given time</p>
            </div>
          </div>
    </div>
  )
}

export default ProgressCard
