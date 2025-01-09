import React from 'react';
import { BiSearch } from 'react-icons/bi';
function Search() {
  return (
    <div className='mt-[1rem] ml-[400px]'>
          <BiSearch className='absolute top-[24px] ml-[2rem] text-[25px] text-gray-500'/> <input type="text" value=""  placeholder='Search Box' className='rounded-[30px] w-[330px] h-[40px] px-[70px] text-[20px] shadow-md shadow-gray-500'/>
      
    </div>
  )
}

export default Search
