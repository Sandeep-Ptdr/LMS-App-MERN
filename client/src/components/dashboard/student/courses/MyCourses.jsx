import React, { useEffect } from "react";
import MyCoursesCard from "./MyCoursesCard";
import useFetchData from "../../../../hooks/useFetchData";

const MyCourses = () => {
  const { data, loading, error, fetchData } = useFetchData();

  useEffect(() => {
    fetchData("student/mycourses", "GET");
  }, []);

 
 
  return (
    <div className="container mx-auto px-4 ">
      <h1 className="font-semibold text-2xl text-gray-700 mb-4">My Courses</h1>

      <div className="flex flex-wrap gap-3 py-4  justify-center sm:justify-normal w-full">
        {loading && <div className="flex justify-center items-center w-full "> <div className="loader"></div> </div>}
        {error && <p>{error?.data?.message || error?.message }</p>}
        

        {data && data?.course?.length > 0
          ? data?.course?.map((course) => <MyCoursesCard key={course._id} course={course}  />)
          : !loading && !error && <p className="p-4">No enrolled courses found!</p>
           }
      </div>
    </div>
  );
};

export default MyCourses;
