import React from 'react';
import { useNavigate } from 'react-router-dom';
function Welcome() {
    const navigate=useNavigate();
    const toregister=(e)=>{
      e.preventDefault();
      navigate('/register');
    };
    const tologin=(e)=>{
        e.preventDefault();
        navigate('/login');
      };
  return (
    <div className='bg-[#EAF6FA] w-[100vw] h-[100vh]'>
     <h1 className='flex justify-center items-center text-[40px] px-5 py-5 '> Welcome to HealthEase</h1>
      <button type="button" onClick={toregister} className='mt-[5rem] ml-[40%] bg-teal-400 w-[112px] rounded-[30px]'>Register</button>
      <button type="button" onClick={tologin} className='mt-[5rem] ml-[1rem] bg-teal-400 w-[112px] rounded-[30px]'>Login</button>
    </div>
  )
}

export default Welcome
