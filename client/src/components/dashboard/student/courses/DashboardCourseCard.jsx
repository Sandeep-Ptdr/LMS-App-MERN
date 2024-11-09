import React from "react";

const DashboardCourseCard = () => {
    let progress = 50
  return (
    <div className=" min-w-[48%] border border-gray-300 rounded-md p-1 flex items-center">
      <div className="w-28 h-16 rounded-md  overflow-hidden mr-2">
        <img
          className="object-cover w-full h-full object-center"
          src={"https://via.placeholder.com/1200x600"}
          alt=""
        />
      </div>

      <div className="flex justify-between items-center min-w-[calc(100%-112px)]">
        <div>
          <h1 className="font-semibold text-lg text-gray-600 hover:text-[#2196F3] cursor-pointer">
            {"Title"}
          </h1>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#2196F3] h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-gray-500 text-xs font-medium mt-1">{progress}% completed</p>
        </div>

         
       <div> <button className=" border border-gray-300 rounded-md p-1 hover:bg-gray-300 text-xs font-medium ml-4 text-gray-700">
           Continue
        </button></div>
       

      </div>

      
    </div>
  );
};

export default DashboardCourseCard;
