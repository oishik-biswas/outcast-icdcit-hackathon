import React from 'react'
import { useNavigate } from 'react-router-dom';
import Avatar1 from '../assets/chatavatar1.png';
import Avatar2 from '../assets/chatavatar2.png';
import Avatar3 from '../assets/chatavatar3.png';

function ChatCard() {
  const navigate=useNavigate();
  const tochat=(e)=>{
    e.preventDefault();
    //navigate("/chatpage");
    window.location.href = "http://localhost:5174";
 };
  return (
    
      <div className="w-[40vw] h-[25rem]  border-2 rounded-lg bg-white ml-[3rem] mt-[1rem]">
        
            <div className="topline text-md h-[60%] ml-[1rem]">
              <div className='mt-[2rem] flex relative'><img src={Avatar1} className='avatar ' alt="" />
              <img src={Avatar2} className='avatar z-10 absolute left-[22px]' alt="" />
              <img src={Avatar3} className='avatar absolute left-[44px]' alt="" />
              </div>
              <p className='font-bold px-5 py-[2rem] '>Experience the goodness <br/>of Deep Communication</p>

            </div>
            <div className="btn ml-[1rem]">
            <button onClick={tochat} className='rounded-2xl bg-black text-white justify-self-end self-end mr-5 w-[7rem] h-[2rem]'>
            Chat</button>
            <p className='font-bold'>Chat now</p>
            </div>
            <div className="bottom w-[80%] ml-[1rem]">
              <p className="font-thin text-sm">You have received 3+ messages from David,Soni and more</p>
            </div>
            </div>
      
    
  )
}

export default ChatCard
