import React from 'react';
import "./Home.css";
function TaskCard() {
  return (
    <div>
      <div className="w-[47vw] h-[25rem]  border-2 rounded-lg bg-[#93C572]">
           <div className="grid h-[92%]">
            <h1 className='text-4xl ml-5 text-white font-bold mt-6 outlined-text'>Your Task Today</h1>
            <div className="flex gap-[15rem]">
            <div className="self-end ml-5">Join live classes</div>
            <button className='rounded-xl bg-black text-white justify-self-end self-end mr-5 w-[12rem] h-[2rem]'>
                 View Your Task ----&gt;</button>
            </div>
    
           </div>
      </div>
    </div>
  )
}

export default TaskCard
