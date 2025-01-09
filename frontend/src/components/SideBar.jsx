import React from 'react';
import "./SideBar.css";
import { GoHome,GoBell } from "react-icons/go";
import { BiMessageMinus } from "react-icons/bi";
import { LuCalendarDays } from "react-icons/lu";
import {IoExitOutline, IoSettingsOutline } from "react-icons/io5";
import { RiErrorWarningLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
function SideBar() {
  const navigate=useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('authToken'); 
    sessionStorage.removeItem('authToken');
    navigate("/") ;
  }
  const tohome=(e)=>{
     e.preventDefault();
     navigate("/home");
  };

  const tochat=(e)=>{
    navigate("/chatpage");
  };

  const totask=(e)=>{
    navigate("/taskpage");
  };
  return (
    <div className=' bg-white h-[100vh] w-[5rem] shadow-xl shadow-black'>
        <div className="flex flex-col items-center justify-center">
            <ul>
                <li onClick={tohome} className='mt-[4rem] text-[1.5rem] text-gray-500 cursor-pointer icons '>
                    <GoHome/></li>
                <li onClick={tochat} className='mt-3 text-[1.5rem] text-gray-500 cursor-pointer icons'>
                    <BiMessageMinus/></li>
                    <li onClick={totask} className='mt-3 text-[1.5rem] text-gray-500 cursor-pointer icons'>
                    <LuCalendarDays/></li>
                    <li className='mt-[4rem] text-[1.5rem] text-gray-500 cursor-pointer icons'>
                    <GoBell/></li>
                    <li className='mt-3 text-[1.5rem] text-gray-500 cursor-pointer icons'>
                    <IoSettingsOutline/></li>
                    <li className='mt-[4rem] text-[1.5rem] text-gray-500 cursor-pointer icons' onClick={handleLogout}>
                    <IoExitOutline/></li>
                    <li className='mt-3 text-[1.5rem] text-gray-500 cursor-pointer icons'>
                    <RiErrorWarningLine/></li>
            </ul>
        </div>
    </div>
  )
}

export default SideBar;
