import React from "react";
import { PiStudentBold } from "react-icons/pi";
import { GiBookshelf } from "react-icons/gi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";


const Overview = ({data}) => {
  


  return (
    <>
      <h1 className="font-semibold text-2xl text-gray-700 mb-4">
        Welcome {data?.user?.name.charAt(0).toUpperCase() + data?.user?.name.slice(1)}
      </h1>

      <div className="card-container flex flex-wrap gap-5">
        <div className="border-l-[3px] bg-gray-100 border-[#2196F3] w-56 h-28 rounded-xl shadow-lg  p-1 flex  flex-grow items-center justify-center gap-4">
          <div>
            <PiStudentBold className="w-11 h-11 text-[#2196F3]" />
          </div>

          <div>
            <h6 className="text-gray-600 font-semibold">Total Students</h6>
            <p className="text-3xl text-gray-700">{data.totalEnrolledStudents}</p>
          </div>
        </div>

        <div className="border-l-[3px] bg-gray-100 border-red-500 w-56 h-28 rounded-xl shadow-lg  p-1 flex  flex-grow items-center justify-center gap-4">
          <div>
            <GiBookshelf className="w-11 h-11 text-red-500" />
          </div>

          <div>
            <h6 className="text-gray-600 font-semibold">Total Courses</h6>
            <p className="text-3xl text-gray-700">{data.totalCourses}</p>
          </div>
        </div>

        <div className="border-l-[3px] bg-gray-100 border-green-500 w-56 h-28 rounded-xl shadow-lg  p-1 flex  flex-grow items-center justify-center gap-4">
          <div>
            <RiMoneyDollarCircleLine className="w-11 h-11 text-green-500" />
          </div>

          <div>
            <h6 className="text-gray-600 font-semibold">Total Earnings</h6>
            <p className="text-3xl text-gray-700">1000</p>
          </div>
        </div>

      </div>
    </>
  );
};

export default Overview;
