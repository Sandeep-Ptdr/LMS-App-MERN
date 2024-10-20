import React, { useState } from "react";
import FilterBtn from "../../../buttons/FilterBtn";
import { IoMdSearch } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import InstructorCourseCard from "./InstructorCourseCard";



const categories = ["Web Development", "Data Science", "Design"]; // Example categories
const statuses = ["Published", "Draft"];
const MyCourses = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);

  const allCourses = [
    {
      name: "React for Beginners",
      category: "web-development",
      status: "published",
    },
    {
      name: "Data Science Bootcamp",
      category: "data-science",
      status: "draft",
    },
    // Add more courses here
  ];

  const handleFilter = (filters) => {
    const filtered = allCourses.filter((course) => {
      return (
        (filters.category ? course.category === filters.category : true) &&
        (filters.status ? course.status === filters.status : true)
      );
    });
    setFilteredCourses(filtered);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className=" font-semibold text-2xl text-gray-700 mb-4 ">
          Manage Courses
        </h1>

        <button className="flex gap-1 font-semibold text-base text-gray-50 justify-center items-center bg-[#2196F3] hover:bg-[#3286cb] px-4 py-2 rounded-md"> <IoMdAdd className="text-2xl font-bold"/> Add Course</button>
      </div>

      <div className="flex justify-between p-4 border-[1px] bg-gray-50 rounded-md border-l-2 border-l-[#2196F3] shadow-lg mb-4">
        <FilterBtn
          categories={categories}
          statuses={statuses}
          onFilter={handleFilter}
        />

        <div className="w-[85%]">
          <form className="flex gap-2 ">
            <input
              placeholder="Search courses"
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="py-2 px-3 w-full border border-gray-300 rounded-lg outline-none"
            />
            <button className=" border border-gray-300 hover:bg-gray-200 px-2 py-1 text-gray-700 rounded-md ">
              <IoMdSearch className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 p-5 justify-center sm:justify-normal">
         <InstructorCourseCard/>
          
      </div>
    </>
  );
};

export default MyCourses;
