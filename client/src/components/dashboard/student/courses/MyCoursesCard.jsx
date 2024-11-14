import React from "react";
import { IoPlayCircleOutline } from "react-icons/io5";
const MyCoursesCard = () => {
  return (
    <div className="min-w-[48%] bg-gray-50 shadow-md rounded  ">
      <div className="flex px-4 py-4">
        <div className="w-28 h-16 rounded-md  overflow-hidden mr-2">
          <img
            className="object-cover w-full h-full object-center"
            src={"https://via.placeholder.com/1200x600"}
            alt=""
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1>Course Name</h1>
          <p>lesson 1 of 5</p>
        </div>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full ">
        <div className="bg-[#2196F3] h-full rounded-full transition-all duration-300 " style={{width:`${Math.floor(Math.random() * 100)}%`}}/>
      </div>

      <div className="p-4">
        <button className="flex gap-1 justify-center items-center bg-[#2196F3] hover:bg-[#1976D2] text-gray-50 px-2 py-1 rounded-md">
            Continue <IoPlayCircleOutline/>
        </button>
      </div>
    </div>
  );
};

export default MyCoursesCard;
