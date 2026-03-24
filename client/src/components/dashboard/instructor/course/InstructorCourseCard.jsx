import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";

const InstructorCourseCard = ({course, onDelete, onPublish}) => {

  const [dropDownOpen, setDropDownOpen] = useState(false)



  const toggleDropDown = () => {
    setDropDownOpen((prev) => !prev);
  }


   

  return (
    <div className="relative mx-auto flex h-full w-full max-w-[308px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="absolute right-3 top-3 z-10 cursor-pointer rounded-full bg-gray-900/30 p-2 backdrop-blur-sm"
      onClick={toggleDropDown}>
        <PiDotsThreeOutlineVertical className="text-gray-50"/>
        
      </div>

      {dropDownOpen && (
        <div className="absolute right-3 top-14 z-20 w-28 rounded-lg bg-gray-50 p-2 shadow-md">
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
      )}
      <div className="overflow-hidden">
        <img
          className="h-36 w-full object-cover transition-all duration-300 ease-in-out hover:scale-105"
          src={course?.image || "https://miro.medium.com/v2/resize:fit:1200/1*y6C4nSvy2Woe0m7bWEn4BA.png"}
          alt="Course Image"
        />
      </div>

      <div className="flex flex-1 flex-col px-4 py-3 sm:px-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="line-clamp-2 text-lg font-bold text-gray-800 hover:text-[#2196F3]">
              {course.title.trim().charAt(0).toUpperCase() + course.title.slice(1)}
            </h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#2196F3]">
              {course.category || "Other"}
            </p>
          </div>
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
              course.status === "Published"
                ? "bg-blue-100 text-[#1976D2]"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {course.status}
          </span>
        </div>

        <p className="mb-4 line-clamp-2 text-sm leading-6 text-gray-600">
          {course?.description || "No description added for this course yet."}
        </p>

        <div className="grid grid-cols-2 gap-2 rounded-xl bg-white p-2.5 text-sm text-gray-600 shadow-sm">
          <div className="rounded-lg bg-gray-100 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Students
            </p>
            <p className="mt-1 text-base font-bold text-gray-800">
              {course.enrolledStudents.length}
            </p>
          </div>
          <div className="rounded-lg bg-gray-100 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Price
            </p>
            <p className="mt-1 text-base font-bold text-gray-800">
              Rs. {course.price || 0}
            </p>
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <Link to={`/instructor/course/${course._id}/detail`}>
            <button className="w-full rounded-md bg-[#2196F3] px-4 py-2 text-sm font-bold text-white hover:bg-[#3286cb] sm:w-auto">
              View Details
            </button>
          </Link>
          <Link to={`/instructor/course/${course._id}/edit`}>
            <button className="w-full rounded-md bg-gray-200 px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-300 sm:w-auto">
              Edit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstructorCourseCard;
