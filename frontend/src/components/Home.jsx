import React from 'react';
import SideBar from './SideBar.jsx';
import Navbar from './Navbar.jsx';
import './Home.css';
import Search from './Search.jsx';
import TaskCard from './TaskCard.jsx';

import ChatCard from './ChatCard.jsx';

import CoursesCard from './CoursesCard.jsx';

function Home() {
    const name="Andrew";
  return (
    <div className='bg-[#EAF6FA]'>
    <div className='flex flex-col md:flex-row w-auto'>
        <div className="hidden md:block fixed">
       <SideBar/>
       </div>
       <div className="md:hidden">
         <Navbar/>
         </div>
         <div className="main bg-[#d4f3fd] w-[100vw] h-auto ml-[5rem] ">
          <div className="flex ">
         
        {/*} <div className="ml-7 lefthand">*/}
          <div className='flex flex-col ml-[2rem]'>
            <div className='flex '>
         <div> <h1 className='text-[40px]  font-bold mt-[2rem]'>Hello!</h1>
          <h3 className='font-semibold text-gray-600 text-[15px]'>Let's look at today's activity overview</h3></div>
          <Search/>
          <button type="button" className='bg-black text-lime-300 h-[43px] w-[138px] ml-3 px-10  rounded-[30px] flex items-center mt-[2rem]'>Upgrade</button>
          </div>
          <TaskCard/>
         
          </div>
      {/*} </div>*/}
         <div className="righthand py-[1rem] flex flex-col cursor-pointer h-[5rem] ">
          <div className="flex ">
         
         </div>
      
         </div>
         </div>
         <div className="cards flex">
          <ChatCard/>
        
          <CoursesCard/>
          </div>
         </div>
       
         </div>
         
    </div>
    
  )
}

export default Home;