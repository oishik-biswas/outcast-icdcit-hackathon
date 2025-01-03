import React from 'react';
import SideBar from './SideBar';
import Navbar from './Navbar';
import './Home.css';
import Search from './Search';
import TaskCard from './TaskCard';
import CommunityCard from './CommunityCard';
import ChatCard from './ChatCard';
import ProgressCard from './ProgressCard';
import CoursesCard from './CoursesCard';

function Home() {
    const name="Andrew";
  return (
    <div className='bg-teal-100'>
    <div className='flex flex-col md:flex-row w-[100vw]'>
        <div className="hidden md:block fixed">
       <SideBar/>
       </div>
       <div className="md:hidden">
         <Navbar/>
         </div>
         <div className="main bg-teal-100 w-[100vw] h-auto ml-[5rem] ">
          <div className="flex">
         <div className="ml-7 lefthand">
          <h1 className='text-[2rem]  font-bold'>Hi, {name}!</h1>
          <h3 className='font-semibold text-gray-600'>Let's look at today's activity overview</h3>
          <TaskCard/>

       </div>
         <div className="righthand py-[1rem] flex flex-col relative cursor-pointer h-[5rem] ml-5 ">
          <div className="flex ">
          <Search/>
         <button type="button" className='bg-black text-lime-300 h-[2rem] ml-4 px-4 py-2 rounded-[20px] flex items-center'>Upgrade</button>
         </div>
         <CommunityCard/>
         </div>
         </div>
         <div className="cards flex">
          <ChatCard/>
          <ProgressCard/>
          <CoursesCard/>
          </div>
         </div>
       
         </div>
         
    </div>
    
  )
}

export default Home;
