import React from 'react'

function CoursesCard() {
  return (
    <div>
         <div className="w-[26vw] h-[25rem]  border-2 rounded-lg bg-white ml-[2rem] mt-[1rem]">
         <h1 className='text-3xl font-bold'>Courses</h1>
         <div className="topline h-[70%] ml-[1rem]">

         </div>
         <div className="btn ml-[1rem]">
            <button className='rounded-2xl bg-black text-white justify-self-end self-end mr-5 w-[7rem] h-[2rem]'>
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
