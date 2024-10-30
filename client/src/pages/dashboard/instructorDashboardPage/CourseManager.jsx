import React from "react";
import MyCourses from "../../../components/dashboard/instructor/course/MyCourses";
import useFetchData from "../../../hooks/useFetchData";

const CourseManager = () => {

  

  return (
    <div className="w-full p-4">
      <div className=" max-w-[95%] m-auto">
         <MyCourses/>
      </div>
    </div>
  );
};

export default CourseManager;
