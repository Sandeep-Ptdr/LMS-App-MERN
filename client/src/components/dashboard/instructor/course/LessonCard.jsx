import React from "react";
import { MdOutlineModeEdit } from "react-icons/md";

const LessonCard = ({lesson}) => {
  return (
    <div className=" min-w-[48%] border border-gray-300 rounded-md p-1 flex items-center">
      <div className="w-28 h-16 rounded-md  overflow-hidden mr-2">
        <img
          className="object-cover w-full h-full object-center"
          src="https://via.placeholder.com/1200x600"
          alt=""
        />
      </div>

      <div className="flex justify-between items-center min-w-[calc(100%-112px)]">
        <div >
          <h1 className="font-semibold text-lg text-gray-600 hover:text-[#2196F3] cursor-pointer">
             {lesson.title}
          </h1>
          <span className="text-xs font-medium text-gray-500">
             {lesson.description.slice(0,30)}...
          </span>
        </div>

       <div> <button className=" border border-gray-300 rounded-md p-1 hover:bg-gray-300 text-xl ml-4">
          <MdOutlineModeEdit />
        </button></div>
      </div>
    </div>
  );
};

export default LessonCard;
