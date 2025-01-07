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
    <div className="w-[450px] h-[400px]  border-2 rounded-lg mt-6 ml-[15px] z-0 Communitybg">
         <div className="grid h-[92%] z-10">
          <p className='text-4xl ml-5 text-white font-bold mt-6 '><p className='outlined-text'>Community</p>
          <p className='text-[20px] text-[#172681]  font-medium condesed'>Join the community and enhance your skills</p>
          </p>

          <div className="grid">
          <button onClick={tocommunity} className='rounded-[30px] bg-[#95AA04] text-black font-semibold justify-self-end self-end mr-7 w-[9rem] h-[2rem]'>
          Join</button>
         
          </div>
  
         </div>
    </div>
  </div>
  )
}

export default CommunityCard
