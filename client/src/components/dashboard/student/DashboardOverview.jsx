import React from "react";
import ProgressChart from "../../charts/ProgressChart";
import DashboardCourseCard from "./courses/DashboardCourseCard";
import DashboardQuizDetails from "./courses/DashboardQuizDetails";

const DashboardOverview = ({ data }) => {
  return (
    <>
      <h1 className="font-semibold text-2xl text-gray-700 mb-4">Welcome {data?.user?.name.charAt(0).toUpperCase() + data?.user?.name.slice(1)}</h1>
      <div className="flex justify-between">
        <div className="mb-4 flex-1 ">
          <ProgressChart />
        </div>
        <div className=" bg-gray-50 rounded-md flex-1 h-[365px] overflow-hidden shadow-md">
          <div className="flex justify-between items-center p-4 border-b border-gray-300">
            <h1 className="text-2xl font-semibold text-gray-600">Quizzes</h1>
            <button className="px-3 py-2 bg-[#2196F3] text-gray-50 font-semibold rounded-md hover:bg-[#1976D2]">
              Quiz Results
            </button>
          </div>
          <div className="overflow-y-scroll h-[calc(100%-72px)] scroll-smooth ">
            <DashboardQuizDetails />
            <DashboardQuizDetails />
            <DashboardQuizDetails />
            <DashboardQuizDetails />
            <DashboardQuizDetails />
            <DashboardQuizDetails />
            <DashboardQuizDetails />
          </div>
        </div>
      </div>

      <div className=" bg-gray-50 rounded-md shadow-md">
        <div className=" flex justify-between items-center p-4 border-b border-gray-300">
          <h1 className=" text-2xl font-medium text-gray-600">Courses</h1>
          <button className=" px-3 py-2 bg-[#2196F3] text-white rounded-md hover:bg-[#1976D2]    font-semibold">
            My Courses
          </button>
        </div>
        <div className="w-full flex flex-wrap gap-2 p-4 ">
          <DashboardCourseCard />
          <DashboardCourseCard />
          <DashboardCourseCard />
        </div>
      </div>
    </>
  );
};

export default DashboardOverview;
