import React from 'react';
import SideBar from '../components/SideBar';

function CoursesPage() {
  return (
    <div className='flex bg-[#d4f3fd]'>
      <div className='hidden md:block fixed'> 
      <SideBar/>
      </div>
      <div className=" w-auto">
      <div className="text-[50px] py-[20px] ml-[8rem] font-semibold ">Courses Page</div>
      <div className="text-[20px] font-light ml-[8rem]">Recommendations</div>
      <div className='bg-white w-[1000px] h-[100vh] ml-[8rem] rounded-[30px] '>
        <div className='flex flex-col gap-[10px] m-[10px]'>
        <div className='ml-[2rem] border-2 border-black py-5 bg-white w-[900px] h-[70px] mt-6 justify-center rounded-[10px]'>Course 1</div>
        <div className='ml-[2rem] border-2 border-black py-5 bg-white w-[900px] h-[70px] justify-center rounded-[10px]'>Course 2</div>
        <div className='ml-[2rem] border-2 border-black py-5 bg-white w-[900px] h-[70px] justify-center rounded-[10px]'>Course 3</div>
        <div className='ml-[2rem] border-2 border-black py-5 bg-white w-[900px] h-[70px] justify-center rounded-[10px]'>Course 4</div>
        <div className='ml-[2rem] border-2 border-black py-5 bg-white w-[900px] h-[70px] justify-center rounded-[10px]'>Course 5</div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default CoursesPage
