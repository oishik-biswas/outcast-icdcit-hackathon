import React from 'react';
import "./SideBar.css";
import { GoHome,GoBell } from "react-icons/go";
import { BiMessageMinus } from "react-icons/bi";
import { LuCalendarDays } from "react-icons/lu";
import {IoExitOutline, IoSettingsOutline } from "react-icons/io5";
import { RiErrorWarningLine } from "react-icons/ri";
function SideBar() {
  return (
    <div className=' bg-white h-[100vh] w-[5rem] shadow-xl shadow-black'>
        <div className="flex flex-col items-center justify-center">
            <ul>
                <li className='mt-[4rem] text-[1.5rem] text-gray-500 cursor-pointer icons'>
                    <GoHome/></li>
                <li className='mt-3 text-[1.5rem] text-gray-500 cursor-pointer icons'>
                    <BiMessageMinus/></li>
                    <li className='mt-3 text-[1.5rem] text-gray-500 cursor-pointer icons'>
                    <LuCalendarDays/></li>
                    <li className='mt-[4rem] text-[1.5rem] text-gray-500 cursor-pointer icons'>
                    <GoBell/></li>
                    <li className='mt-3 text-[1.5rem] text-gray-500 cursor-pointer icons'>
                    <IoSettingsOutline/></li>
                    <li className='mt-[4rem] text-[1.5rem] text-gray-500 cursor-pointer icons'>
                    <IoExitOutline/></li>
                    <li className='mt-3 text-[1.5rem] text-gray-500 cursor-pointer icons'>
                    <RiErrorWarningLine/></li>
            </ul>
        </div>
    </div>
  )
}

export default SideBar;
