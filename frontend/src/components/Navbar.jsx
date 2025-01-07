import React from 'react'
import { BiMessageMinus } from 'react-icons/bi';
import { GoBell, GoHome } from 'react-icons/go';
import { IoExitOutline, IoSettingsOutline } from 'react-icons/io5';
import { LuCalendarDays } from 'react-icons/lu';
import { RiErrorWarningLine } from 'react-icons/ri';
import "./SideBar.css"
function Navbar() {
  return (
    <div>
      <div className="w-[100vw] h-[2.2rem] bg-white flex items-center shadow-md shadow-black-200">
        <ul className='flex w-[60%] sm:w-[70%] '>
            <li className='text-[1.2rem] text-gray-500 cursor-pointer icons'><GoHome/></li>
            <li className='text-[1.2rem] text-gray-500 cursor-pointer icons'><BiMessageMinus/></li>
            <li className='text-[1.2rem] text-gray-500 cursor-pointer icons'>
            <LuCalendarDays/></li>
            <li className=' text-[1.2rem] text-gray-500 cursor-pointer icons'>
            <GoBell/></li>
          </ul>
          <ul className='flex'>
            <li className='text-[1.2rem] text-gray-500 cursor-pointer icons'>
            <IoSettingsOutline/></li>
             <li className=' text-[1.2rem] text-gray-500 cursor-pointer icons'>
             <IoExitOutline/></li>
            <li className='text-[1.2rem] text-gray-500 cursor-pointer icons'>
            <RiErrorWarningLine/></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar;
