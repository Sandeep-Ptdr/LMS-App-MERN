import React, { useEffect, useState } from "react";
import FilterBtn from "../../../buttons/FilterBtn";
import { IoMdAdd } from "react-icons/io";
import InstructorCourseCard from "./InstructorCourseCard";
import { Link } from "react-router-dom";
import useFetchData from "../../../../hooks/useFetchData";
import { useSelector } from "react-redux";
import { PiDatabaseLight } from "react-icons/pi";


const MyCourses = () => {

  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState({
    categories: "",
    statuses: "",
  });
  const { data, loading, error,fetchData } = useFetchData();

  const category = useSelector((state) => state.filters.category);
  const status = useSelector((state) => state.filters.statuses);

  const handleDelete = (id) => {
    fetchData(`/instructor/course/${id}/delete`, "DELETE");
    fetchData("/instructor/courses","GET")
  };

  const handlePublish = (id) => {
     
    fetchData(`/instructor/${id}/publish`, "PUT");
    fetchData("/instructor/courses","GET")
  
  };

  useEffect(() => {
     fetchData("/instructor/courses","GET")
  }, [])
  

  useEffect(() => {
    
    if (data?.courses) {
      // console.log(data)
      // console.log("setting filters...");
      const uniqueCategories = Array.from(
        new Set(data?.courses?.map((course) => course.category))
      );
      const uniqueStatuses = Array.from(
        new Set(data?.courses?.map((course) => course.status))
      );
      setFilters({
        categories: uniqueCategories,
        statuses: uniqueStatuses,
      });
    }

     
  }, [data]);

 
   
   
  
  return (
    <>
     
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className=" font-semibold text-2xl text-gray-700 mb-4 ">
            Manage Courses
          </h1>

          <Link to="/instructor/course/create">
            <button className="flex gap-1 font-semibold text-base text-gray-50 justify-center items-center bg-[#2196F3] hover:bg-[#3286cb] px-4 py-2 rounded-md">
              <IoMdAdd className="text-2xl font-bold" /> Add Course
            </button>
          </Link>
        </div>

        <div className="flex justify-between p-4  bg-gray-50 rounded-md border-l-[3px]  border-l-[#2196F3] shadow-lg mb-4">
          <FilterBtn
            categories={filters.categories}
            statuses={filters.statuses}
          />

          <div className="w-[85%]">
            <form
              className="flex gap-2 "
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                placeholder="Search courses"
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="py-2 px-3 w-full border border-gray-300 rounded-lg outline-none focus:border-[#2196F3]"
              />
               
            </form>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 py-4  justify-center sm:justify-normal relative">
          
          {loading && <div className="flex justify-center items-center absolute top-1/2 left-1/2"><div className="loader"></div></div>}
          {error && <p>{error?.data?.message || error?.message }</p>}

          {Array.isArray(data?.courses) && data?.courses.length > 0
            ? data?.courses
                .filter((course) => {
                  if (category === "All" && status === "All") {
                    return course.title
                      .toLowerCase()
                      .includes(searchInput.toLowerCase());
                  }
                  else {
                    return (
                      category === course.category &&
                      status === course.status &&
                      course.title
                        .toLowerCase()
                        .includes(searchInput.toLowerCase())
                    );
                  }
                })
                .map((course) => (
                  <InstructorCourseCard course={course} key={course._id} onDelete={handleDelete} onPublish={handlePublish} />
                ))
            : !loading && !error && <p>No courses found.</p>}
        </div>
      </div>
    </>
  );
};

export default MyCourses;
