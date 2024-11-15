import React from 'react'
import { Link } from 'react-router-dom'
import useFetchData from '../../../../hooks/useFetchData';

const Card = ({course, onPayment}) => {

  
   
  return (
    <div className=" w-72 rounded overflow-hidden shadow-lg bg-gray-50 relative">
       

      {/* {dropDownOpen && (
        <div className="absolute top-10 right-2 bg-gray-50 shadow-md rounded p-2 z-20 w-24">
          <button 
            className="w-full text-left px-2 py-1 text-red-600 hover:bg-red-100 rounded"
            onClick={() => onDelete(course._id)}
          >
            Delete
          </button>
          <button 
            className="w-full text-left px-2 py-1 text-[#3da8ff] hover:bg-blue-100 rounded mt-1"
             onClick={() => onPublish(course._id)}
          >
            Publish
          </button>
        </div>
      )} */}
      <div className="overflow-hidden">
        <img
          className="w-full h-36 object-cover hover:scale-105 transition-all duration-300 ease-in-out"
          src={course?.image || "https://miro.medium.com/v2/resize:fit:1200/1*y6C4nSvy2Woe0m7bWEn4BA.png"}
          alt="Course Image"
        />
      </div>
      <div className="px-4 py-3">
        <h3 className="font-bold text-lg text-gray-800 hover:text-[#2196F3]">
          {course?.title.trim().charAt(0).toUpperCase() + course?.title.slice(1) || 'No title'}
        </h3>
        <p className="text-gray-600 text-sm mb-2">
         {course?.description.slice(0,35) || 'No description'}...
        </p>

        {/* Course Stats for Instructor */}
        <div className="flex flex-col text-sm text-gray-500 mb-2">
          <span>Total Students: {course?.enrolledStudents.length || 0}</span>
          <span>Status: {course?.status || 'draft'}</span>
          <span>Category: {course?.category || 'other'}</span>
          <span className='text-base font-semibold flex gap-1'>Price: <p className='text-gray-700'>{course?.price || '1'}</p></span>
        </div>


        {/* Course Actions */}
         <div className="flex justify-between items-center mt-3">
          <Link to='/student/course/detail' >
            <button className="bg-[#2196F3] hover:bg-[#1976D2] text-white font-bold py-1 px-3 rounded text-sm">
              View Details
            </button>
          </Link>
          <Link >
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-3 rounded text-sm" 
            id='btn'
            onClick={() => onPayment(course?._id, course.price)}>
              Enroll
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Card