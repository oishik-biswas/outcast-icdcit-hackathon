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
    
      <div className="w-[600px] h-[400px]  border-2 rounded-lg bg-gradient-to-l from-[#CDF0EF] to-[#768A8A] shadow-[6px_4px_4px_0px_#00000040] ">
         <div className="flex ">
          <div className="lefthand">
            <h1 className='text-4xl ml-5 text-white font-bold mt-6 outlined-text'>Your Task Today</h1>
          
            <div className="flex gap-[15rem]">
            <div className="mt-[15rem] ml-5 text-white">Join live classes</div>  </div>  </div>


           <div className="rightTask w-[300px] h[400px] ">
            
            <button onClick={totask}  className='rounded-[30px] bg-black text-white justify-self-end self-end mr-5 w-[240px] h-[2rem] mt-[20rem] ml-[2rem]'>
                 View Your Task ----&gt;</button></div>
             </div>
      </div>
  
  )
}

export default TaskCard
