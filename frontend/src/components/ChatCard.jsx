import React from 'react'

function ChatCard() {
  return (
    
      <div className="w-[26vw] h-[25rem]  border-2 rounded-lg bg-white ml-[2rem] mt-[1rem]">
        
            <div className="topline text-md h-[70%] ml-[1rem]">
              <p className='font-bold '>Experience the goodness <br/>of Deep Communication</p>

            </div>
            <div className="btn ml-[1rem]">
            <button className='rounded-2xl bg-black text-white justify-self-end self-end mr-5 w-[7rem] h-[2rem]'>
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
