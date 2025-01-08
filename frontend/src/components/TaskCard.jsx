import React from 'react';
import "./Home.css";
import Doctor from '../assets/61ad43b29966ecde672a66702909263e.png'
import { useNavigate } from 'react-router-dom';
function TaskCard() {
  const navigate= useNavigate();
  const totask=(e)=>{
     e.preventDefault();
     navigate("/taskpage");
  };
  return (
    
      <div className="w-[675px] h-[400px]  border-2 rounded-[30px] shadow-[6px_4px_4px_0px_#00000040] Taskcardbg">
         <div className="flex ">
          <div className="lefthand">
            <h1 className='text-4xl ml-5 text-white font-bold mt-6 outlined-text'>Your Task Today</h1>
            <p className='ml-[1rem] text-[18px] text-[#588117]  font-medium condesed w-[365px] '>Finish up your Todays task to gain experience</p>
          
            <div className="flex gap-[15rem]">
            <div className="mt-[15rem] ml-5 text-white">Join live classes</div>  </div>  </div>


           <div className="rightTask rounded-[30px] ">
            
            <button onClick={totask}  className='rounded-[30px] bg-black text-white justify-self-end self-end mr-5 w-[240px] h-[2rem] mt-[20rem] ml-[2rem]'>
                 View Your Task ----&gt;</button></div>
             </div>
      </div>
  
  )
}

export default TaskCard
