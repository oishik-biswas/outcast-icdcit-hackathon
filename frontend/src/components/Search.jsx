import React from 'react';
import { BiSearch } from 'react-icons/bi';
function Search() {
  return (
    <div>
          <BiSearch className='absolute mt-[0.5rem] ml-[1rem]  text-gray-500'/> <input type="text" value=""  placeholder='Search' className='rounded-[15px] w-[20rem] h-[2rem] px-9 shadow-md shadow-gray-500'/>
      
    </div>
  )
}

export default Search
