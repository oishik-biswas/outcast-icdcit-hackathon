import React from 'react'

function CommunityCard() {
  return (
    <div>
    <div className="w-[35vw] h-[25rem]  border-2 rounded-lg bg-[#93C572] mt-6">
         <div className="grid h-[92%]">
          <h1 className='text-4xl ml-5 text-white font-bold mt-6 outlined-text'>Community</h1>
          <div className="grid">
          <button className='rounded-xl bg-black text-white justify-self-end self-end mr-7 w-[9rem] h-[2rem]'>
          Join</button>
         
          </div>
  
         </div>
    </div>
  </div>
  )
}

export default CommunityCard
