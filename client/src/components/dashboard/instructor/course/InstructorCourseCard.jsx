import React from "react";

const InstructorCourseCard = () => {
  return (
    <div className="max-w-72 rounded overflow-hidden shadow-lg bg-gray-50">
      <div className="overflow-hidden">
      <img
        className="w-full h-36 object-cover hover:scale-105 transition-all duration-200 ease-in-out"
        src="https://miro.medium.com/v2/resize:fit:1200/1*y6C4nSvy2Woe0m7bWEn4BA.png"
        alt="Course Image"
      />
      </div>
      <div className="px-4 py-3">
        <h3 className="font-bold text-lg text-gray-800 hover:text-[#2196F3]">Course Name</h3>
        <p className="text-gray-600 text-sm mb-2">Brief description of the course.</p>

        {/* Course Stats for Instructor */}
        <div className="flex flex-col text-sm text-gray-500 mb-2">
          <span>Total Students: 50</span>
          <span>Status: Published</span>
        </div>

        {/* Course Actions */}
        <div className="flex justify-between items-center mt-3">
          <button className="bg-[#2196F3] hover:bg-[#3286cb] text-white font-bold py-1 px-3 rounded text-sm">
            View Details
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-3 rounded text-sm">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorCourseCard;