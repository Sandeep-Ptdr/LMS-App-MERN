import React from 'react'
import MyCoursesCard from './MyCoursesCard'

const MyCourses = () => {
  return (
     <div className='container mx-auto p-4 '>
         <h1 className="font-semibold text-2xl text-gray-700 mb-4">
         My Courses
      </h1>

      <div className="flex flex-wrap gap-3 py-4  justify-center sm:justify-normal w-full">
             <MyCoursesCard/>
             <MyCoursesCard/>
             <MyCoursesCard/>
             <MyCoursesCard/>
             <MyCoursesCard/>
             <MyCoursesCard/>
      </div>
     </div>
  )
}

export default MyCourses