import React, { useEffect, useState } from "react";
import FilterBtn from "../../../buttons/FilterBtn";
import { IoMdAdd } from "react-icons/io";
import InstructorCourseCard from "./InstructorCourseCard";
import { Link } from "react-router-dom";
import useFetchData from "../../../../hooks/useFetchData";
import { useSelector } from "react-redux";
import { PiDatabaseLight } from "react-icons/pi";
import toast, { Toaster } from "react-hot-toast";


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

 
  error && toast.error(error?.data?.message || "Something went wrong");  
   
  
  return (
    <>
     <Toaster/>
      <div className="container mx-auto px-4">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold text-gray-700">
            Manage Courses
          </h1>

          <Link to="/instructor/course/create">
            <button className="flex w-full items-center justify-center gap-1 rounded-md bg-[#2196F3] px-4 py-2 text-base font-semibold text-gray-50 hover:bg-[#3286cb] sm:w-auto">
              <IoMdAdd className="text-2xl font-bold" /> Add Course
            </button>
          </Link>
        </div>

        <div className="mb-6 flex flex-col gap-4 rounded-xl border-l-[3px] border-l-[#2196F3] bg-gray-50 p-4 shadow-lg lg:flex-row lg:items-center lg:justify-between">
          <FilterBtn
            categories={filters.categories}
            statuses={filters.statuses}
          />

          <div className="w-full lg:w-[60%] xl:w-[70%]">
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                placeholder="Search courses"
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-[#2196F3]"
              />
               
            </form>
          </div>
        </div>

        <div className="relative mx-auto max-w-[62rem] py-4">
          
          {loading && <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"><div className="loader"></div></div>}
          
          {Array.isArray(data?.courses) && data?.courses.length > 0 ? (
            <div className="grid justify-center gap-5 md:grid-cols-2 xl:grid-cols-3">
              {data?.courses
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
                ))}
            </div>
          ) : !loading && !error && (
            <p className="rounded-xl bg-gray-50 px-4 py-8 text-center text-gray-500 shadow-sm">
              No courses found.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyCourses;
