import React, { useEffect } from "react";
import ProgressChart from "../../charts/ProgressChart";
import DashboardCourseCard from "./courses/DashboardCourseCard";
import DashboardQuizDetails from "./courses/DashboardQuizDetails";
import API from "../../../utils/api";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
 

const DashboardOverview = ({ data }) => {
const navigate = useNavigate();
 

const swrFetcher = async (url) => {
    const response = await API.get(url);
    return response.data; // make sure to return only the data
  };

  const { data: progress, error, isLoading } = useSWR("/student/progress", swrFetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });


   const { data: courses, error: courseError } = useSWR("/student/mycourses", swrFetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });

  

 
  const progressList = Array.isArray(progress) ? progress : progress?.progress || [];
  const courseList = Array.isArray(courses?.course) ? courses?.course : [];

  console.log(progressList,'progressList');
  console.log(courseList,'courseList');

  // Merge progress with course details
  const mergedData = progressList.map((p) => {
    const matchedCourse = courseList.find((c) => c._id === p.course?._id);
   
    return {
      ...p,
      courseThumbnail: matchedCourse?.image || "https://via.placeholder.com/1200x600",
      courseId: matchedCourse?._id || p.course?._id,
      courseTitle: matchedCourse?.title || p.course?.title || "Untitled Course",
    };
  });

 
// console.log(mergedData,'mergedData');


  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error?.data?.message || error?.message}</p>;
  const isProgress = progress?.progress || [];
  // console.log(isProgress);

    


  return (
    <>
      <h1 className="font-semibold text-2xl text-gray-700 mb-4">Welcome {data?.user?.name.charAt(0).toUpperCase() + data?.user?.name.slice(1)}</h1>
      <div className="flex justify-between flex-col gap-2 md:flex-row mb-5">
        <div className="mb-4  md:w-[50%] w-full ">
          <ProgressChart />
        </div>
        <div className=" bg-gray-50 rounded-md md:w-[50%] w-full  h-[375px] overflow-hidden shadow-md">
          <div className="flex justify-between items-center p-4 border-b border-gray-300">
            <h1 className="text-2xl font-semibold text-gray-600">Quizzes</h1>
            <button className="px-3 py-2 bg-[#2196F3] text-gray-50 font-semibold rounded-md hover:bg-[#1976D2]">
              Quiz Results
            </button>
          </div>
          <div className="overflow-y-scroll h-[calc(100%-72px)] scroll-smooth ">
            <DashboardQuizDetails />
             
          </div>
        </div>
      </div>

      <div className=" bg-gray-50 rounded-md shadow-md">
        <div className=" flex justify-between items-center p-4 border-b border-gray-300">
          <h1 className=" text-2xl font-medium text-gray-600">Courses</h1>
          <button 
          onClick={() => navigate('/student/mycourses')}
          className=" px-3 py-2 bg-[#2196F3] text-white rounded-md hover:bg-[#1976D2]    font-semibold">
            My Courses
          </button>
        </div>
        <div className="w-full flex flex-wrap gap-2 p-4 ">
          {mergedData?.map((progress) => (
            <DashboardCourseCard key={progress._id} progress={progress} />
          ))}
        </div>
      </div>
    </>
  );
};

export default DashboardOverview;
