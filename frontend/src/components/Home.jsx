import React from 'react';
import SideBar from './SideBar';
import Navbar from './Navbar';
import { BiSearch } from 'react-icons/bi';

function Home() {
    const name="Andrew";
  return (
    
    <div className='bg-teal-100 w-[100vw] h-[100vh] flex flex-col md:flex-row'>
        <div className="hidden md:block">
       <SideBar/>
       </div>
       <div className="md:hidden">
         <Navbar/>
         </div>
       <div className="main ml-8 w-[60%]">
          <h1 className='text-[2rem]  font-bold'>Hi, {name}!</h1>
          <h3 className='font-semibold text-gray-600'>Let's look at today's activity overview</h3>
       </div>
       <div className="search py-[1rem] flex relative cursor-pointer h-[5rem]">
          <BiSearch className='absolute mt-[0.5rem] ml-[1rem]  text-gray-500'/> <input type="text" value=""  placeholder='Search' className='rounded-[15px] w-[15rem] h-[2rem] px-9 shadow-md shadow-gray-500'/>
       </div>
       <div className="upgrade flex h-[5rem] py-[1rem] cursor-pointer">
        <button type="button" className='bg-black text-lime-300 h-[2rem] ml-4 px-4 py-2 rounded-[20px] flex items-center'>Upgrade</button>
       </div>
    </div>
    
  )
}

export default Home;
