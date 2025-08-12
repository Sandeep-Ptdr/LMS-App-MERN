import React from "react";
import useSWR from "swr";
import API from "../../../../utils/api";
import { useNavigate } from "react-router-dom";

const DashboardCourseCard = ({progress}) => {
  
const navigate = useNavigate()
  // let progress = 50;
  return (
    <div className=" min-w-[48%] border border-gray-300 rounded-md p-1 flex items-center">
      <div className="w-28 h-16 rounded-md  overflow-hidden mr-2">
        <img
          className="object-cover w-full h-full object-center"
          src={progress?.courseThumbnail }
          alt={progress?.course?.title}
        />
      </div>

      <div className="flex justify-between items-center min-w-[calc(100%-112px)]">
       
            <div>
            <h1 className="font-semibold text-lg text-gray-600 hover:text-[#2196F3] cursor-pointer">
              {progress?.course?.title}
            </h1>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#2196F3] h-full rounded-full transition-all duration-300"
                style={{ width: `${progress?.progress}%` }}
              />
            </div>

            <p className="text-gray-500 text-xs font-medium mt-1">
              {progress?.progress}% completed
            </p>
          </div>
        

        <div>
          {" "}
          <button
          onClick={() => navigate(`/student/course/${progress?.course?._id}`)}
          className=" border border-gray-300 rounded-md p-1 hover:bg-gray-300 text-xs font-medium ml-4 text-gray-700">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardCourseCard;
