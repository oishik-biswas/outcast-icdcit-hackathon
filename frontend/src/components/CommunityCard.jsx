import React from 'react';
import { useNavigate } from 'react-router-dom';

function CommunityCard() {
  const navigate= useNavigate();
  const tocommunity=(e)=>{
     e.preventDefault();

     navigate("/communitypage");
  };
  return (
    <div>
    <div className="w-[360x] h-[400px]  border-2 rounded-lg bg-[#93C572] mt-6 ml-[25px]">
         <div className="grid h-[92%]">
          <h1 className='text-4xl ml-5 text-white font-bold mt-6 outlined-text'>Community</h1>
          <div className="grid">
          <button onClick={tocommunity} className='rounded-xl bg-black text-white justify-self-end self-end mr-7 w-[9rem] h-[2rem]'>
          Join</button>
         
          </div>
  
         </div>
    </div>
  </div>
  )
}

export default CommunityCard
