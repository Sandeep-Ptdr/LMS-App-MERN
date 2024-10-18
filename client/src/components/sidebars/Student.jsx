import React from 'react'
import { RxDashboard } from "react-icons/rx";
import { IoSearch } from "react-icons/io5";
import { MdMenuBook } from "react-icons/md";
import { TbProgressCheck } from "react-icons/tb";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { BsBarChartFill } from "react-icons/bs";
import { MdManageAccounts } from "react-icons/md";

const Student = () => {
  return (
     <aside className='h-screen w-64 bg-gray-800 text-gray-400 p-4 '>
      <nav>
        <ul className='flex flex-col gap-5 font-semibold text-base '>

            <li className='cursor-pointer flex items-center gap-2'> 
            <i><RxDashboard className='w-6 h-6'/></i> <span className='hover:text-gray-50'>Dashboard</span></li>
            

            <li className='cursor-pointer flex items-center gap-2'> 
            <i><IoSearch className='w-6 h-6'/></i> <span className='hover:text-gray-50'>Browse Courses</span></li>

            <li className='cursor-pointer flex items-center gap-2'> 
            <i><MdMenuBook className='w-6 h-6'/></i> <span className='hover:text-gray-50'>My Courses</span></li>

            <li className='cursor-pointer flex items-center gap-2'> 
            <i><TbProgressCheck className='w-6 h-6'/></i> <span className='hover:text-gray-50'>Completed Courses</span></li>

            <li className='cursor-pointer flex items-center gap-2'> 
            <i>< HiOutlineDesktopComputer className='w-6 h-6'/></i> <span className='hover:text-gray-50'>Take Quiz</span></li>

            <li className='cursor-pointer flex items-center gap-2'> 
            <i><BsBarChartFill className='w-6 h-6'/></i> <span className='hover:text-gray-50'>Quiz Results</span></li>

            <li className='cursor-pointer flex items-center gap-2'> 
            <i><MdManageAccounts  className='w-6 h-6'/></i> <span className='hover:text-gray-50'>Account</span></li> 
            
        </ul>
      </nav>
     </aside>
  )
}

export default Student