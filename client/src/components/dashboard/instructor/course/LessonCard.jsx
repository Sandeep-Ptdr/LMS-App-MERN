import React, { useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs"; // Three-dot icon
import { Link } from "react-router-dom";

const LessonCard = ({ lesson }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Toggle the dropdown menu
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="min-w-[48%] border border-gray-300 rounded-md p-1 flex items-center">
      
      <div className="w-28 h-16 rounded-md overflow-hidden mr-2">
        <img
          className="object-cover w-full h-full object-center"
          src={lesson.imageUrl || "https://via.placeholder.com/1200x600"}
          alt="Lesson Thumbnail"
        />
      </div>

      
      <div className="flex justify-between items-center min-w-[calc(100%-112px)]">
        <div>
          <h1 className="font-semibold text-lg text-gray-600 hover:text-[#2196F3] cursor-pointer">
            {lesson.title}
          </h1>
          <span className="text-xs font-medium text-gray-500">
            {lesson.description.slice(0, 30)}...
          </span>
        </div>

        
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className=" rounded-md p-1 hover:bg-gray-300 text-xl ml-4"
          >
            <BsThreeDotsVertical  className="text-gray-600"/>
          </button>

           
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-gray-50 border border-gray-300 rounded-md shadow-md z-10 overflow-hidden">
              <ul className="text-sm">
                <li className="hover:bg-gray-200">
                  <Link
                    to={`/instructor/lesson/${lesson._id}/edit`}
                    className="block px-4 py-2"
                  >
                    <MdOutlineModeEdit className="inline mr-2" />
                    Edit
                  </Link>
                </li>
                <li className="hover:bg-gray-200">
                  <Link
                    to={`/instructor/course/lesson/${lesson._id}/quiz/create`}
                    className="block px-4 py-2"
                  >
                    Create Quiz
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
