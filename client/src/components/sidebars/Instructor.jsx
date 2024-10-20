import React from "react";
import { RxDashboard } from "react-icons/rx";
import { MdMenuBook } from "react-icons/md";
import { TbProgressCheck } from "react-icons/tb";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { FaPlus } from "react-icons/fa6";
import { MdManageAccounts } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
const Instructor = () => {
  return (
    <aside className="h-[calc(100vh-4rem)] w-64 bg-gray-800 text-gray-400 p-4 hidden sm:block">
      <nav>
        <ul className="flex flex-col gap-5 font-semibold text-base ">
          <NavLink
            to="/instructor"
            className={({ isActive }) => (isActive ? "active" : " ")}
          >
            {({ isActive }) => (
              <li className="cursor-pointer flex items-center gap-2">
                <RxDashboard
                  className={`w-6 h-6 ${
                    isActive ? "text-[#2196F3]" : "text-gray-300"
                  }`}
                />
                <span className="hover:text-gray-50">Dashboard</span>
              </li>
            )}
          </NavLink>
          <NavLink
            to="/instructor/courses"
            className={({ isActive }) => (isActive ? "active" : " ")}
          >
            {({ isActive }) => (
              <li className="cursor-pointer flex items-center gap-2">
                <i>
                  <MdMenuBook className={`w-6 h-6 ${isActive ? "text-[#2196F3]":"text-gray-300"}`} />
                </i>
                <span className="hover:text-gray-50">Manage Courses</span>
              </li>
            )}
          </NavLink>
          <NavLink
            to="/instructor/dashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {({ isActive }) => (
              <li className="cursor-pointer flex items-center gap-2">
                <i>
                  <TbProgressCheck className="w-6 h-6" />
                </i>
                <span className="hover:text-gray-50">Completed Courses</span>
              </li>
            )}
          </NavLink>{" "}
          <NavLink
            to="/instructor/dashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {({ isActive }) => (
              <li className="cursor-pointer flex items-center gap-2">
                <i>
                  <HiOutlineDesktopComputer className="w-6 h-6" />
                </i>
                <span className="hover:text-gray-50">Quiz Manager</span>
              </li>
            )}
          </NavLink>
          <NavLink
            to="/instructor/dashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {({ isActive }) => (
              <li className="cursor-pointer flex items-center gap-2">
                <i>
                  <FaPlus className="w-6 h-6" />
                </i>
                <span className="hover:text-gray-50">Create New Course</span>
              </li>
            )}
          </NavLink>
          <NavLink
            to="/instructor/dashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {({ isActive }) => (
              <li className="cursor-pointer flex items-center gap-2">
                <i>
                  <MdManageAccounts className="w-6 h-6" />
                </i>
                <span className="hover:text-gray-50">Account</span>
              </li>
            )}
          </NavLink>
        </ul>
      </nav>
    </aside>
  );
};

export default Instructor;
