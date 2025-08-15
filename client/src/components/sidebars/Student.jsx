import React, { useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { IoSearch } from "react-icons/io5";
import { MdMenuBook } from "react-icons/md";
import { TbProgressCheck } from "react-icons/tb";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { BsBarChartFill } from "react-icons/bs";
import { MdManageAccounts } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Student = ({ isHamburgerOpen }) => {
  return (
    <aside
      className={`fixed z-10  md:static  h-screen w-64 bg-gray-800 text-gray-400 p-4 ${
        isHamburgerOpen ? "hidden " : "block"
      }`}
    >
      <nav>
        <ul className="flex flex-col gap-5 font-semibold text-base ">
          <NavLink to="/student"
          end
          className={({isActive}) => (isActive ? 'active': " ")}
          >
            {({isActive}) => (
            <li className="cursor-pointer flex items-center gap-2">
              <i>
                <RxDashboard  className={`w-6 h-6 ${isActive ? "text-[#2196F3]":"text-gray-300"}`} />
              </i>{" "}
              <span className="hover:text-gray-50">Dashboard</span>
            </li>
            )}
          </NavLink>

          <NavLink to="/student/browse-courses"
          className={({isActive}) => (isActive ? 'active': " ")}
          >
            {({isActive}) => (
            <li className="cursor-pointer flex items-center gap-2">
              <i>
                <IoSearch  className={`w-6 h-6 ${isActive ? "text-[#2196F3]":"text-gray-300"}`} />
              </i>{" "}
              <span className="hover:text-gray-50">Browse Courses</span>
            </li>
            )}
          </NavLink>

          <NavLink to="/student/mycourses"
          className={({isActive}) => (isActive ? 'active': " ")}
          >
            {({isActive}) => (
            
            <li className="cursor-pointer flex items-center gap-2">
              <i>
                <MdMenuBook className={`w-6 h-6 ${isActive ? "text-[#2196F3]":"text-gray-300"}`} />
              </i>{" "}
              <span className="hover:text-gray-50">My Courses</span>
            </li>
            )}
          </NavLink>

           

          <NavLink to="/student/quizes"
          className={({isActive}) => (isActive ? 'active': " ")}
          >
            {({isActive}) => (
            
            <li className="cursor-pointer flex items-center gap-2">
              <i>
                <HiOutlineDesktopComputer className={`w-6 h-6 ${isActive ? "text-[#2196F3]":"text-gray-300"}`} />
              </i>{" "}
              <span className="hover:text-gray-50">Take Quiz</span>
            </li>
            )}
          </NavLink>

          <li className="cursor-pointer flex items-center gap-2">
            <i>
              <BsBarChartFill className="w-6 h-6" />
            </i>{" "}
            <span className="hover:text-gray-50">Quiz Results</span>
          </li>

          <li className="cursor-pointer flex items-center gap-2">
            <i>
              <MdManageAccounts className="w-6 h-6" />
            </i>{" "}
            <span className="hover:text-gray-50">Account</span>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Student;
