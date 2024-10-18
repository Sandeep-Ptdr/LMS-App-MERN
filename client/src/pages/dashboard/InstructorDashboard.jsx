import React from "react";

const InstructorDashboard = () => {
  return (
    <div className="w-full p-4">
        <div className=" max-w-[95%] m-auto">
            <h1 className="font-semibold text-2xl text-gray-700 mb-4">
            Welcome Instructor
            </h1>
        
            <div className="card-container flex flex-wrap justify-between ">
                <div className="border-[1px] bg-gray-100 border-gray-400 w-56 h-28 rounded-xl shadow-lg  p-1 flex flex-col">
                    <h6 className="text-gray-600 font-semibold text-center">
                    Total Students
                    </h6>

                    <div className="w-full h-full flex justify-center items-center">
                        <p className="text-3xl text-gray-700">1000</p>
                    </div>
                </div>

                <div className="border-[1px] bg-gray-100 border-gray-400 w-56 h-28 rounded-xl shadow-lg  p-1 flex flex-col">
                    <h6 className="text-gray-600 font-semibold text-center">
                    Total Courses
                    </h6>

                    <div className="w-full h-full flex justify-center items-center">
                        <p className="text-3xl text-gray-700">50</p>
                    </div>
                </div>

                <div className="border-[1px] bg-gray-100 border-gray-400 w-56 h-28 rounded-xl shadow-lg  p-1 flex flex-col">
                    <h6 className="text-gray-600 font-semibold text-center">
                    Total Students
                    </h6>

                    <div className="w-full h-full flex justify-center items-center">
                        <p className="text-3xl text-gray-700">1000</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default InstructorDashboard;
