import React, { useEffect } from "react";
import MyCoursesCard from "./MyCoursesCard";
import useFetchData from "../../../../hooks/useFetchData";

const MyCourses = () => {
   const { data, loading, error, fetchData } = useFetchData();

  useEffect(() => {
    fetchData("student/mycourses", "GET");
  }, []);

  if(loading) return <div className="flex justify-center items-center w-full h-screen "> <div className="loader"></div> </div>
  if(error) return <p>{error?.data?.message || error?.message }</p>
 
  return (
    <div className="container md:mx-auto px-4 ">
      <h1 className="font-semibold text-2xl text-gray-700 mb-4">My Courses</h1>

      <div className="grid w-full grid-cols-1 justify-items-center gap-4 py-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        

        {data && data?.course?.length > 0
          ? data?.course?.map((course) => <MyCoursesCard key={course._id} course={course}  />)
          : !loading && !error && <p className="p-4">No enrolled courses found!</p>
           }
      </div>
    </div>
  );
};

export default MyCourses;
