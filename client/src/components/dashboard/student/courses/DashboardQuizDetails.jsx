import React from 'react'

const DashboardQuizDetails = () => {
  return (
   <div className='flex justify-between items-center border-b border-gray-300 py-2 px-4 '>
     <div>
        <h1 className='text-lg font-semibold text-gray-600'>Title of quiz</h1>
         <span className='flex gap-1'><p className='text-gray-600 text-sm font-medium '>Course</p> <p className='text-gray-800 text-sm font-medium '>Basic of node js</p></span>
     </div>

     <div className='flex gap-2 items-center '>
        <span className='text-lg text-gray-600 font-semibold'>Good</span>
        <span className='text-xl text-gray-700 font-semibold'>5.8</span>

     </div>

   </div>

  )
}

export default DashboardQuizDetails