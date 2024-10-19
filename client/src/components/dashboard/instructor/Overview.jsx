import React from 'react'

const Overview = () => {
  return (
     <>
      <h1 className="font-semibold text-2xl text-gray-700 mb-4">
            Welcome Instructor
            </h1>
        
            <div className="card-container flex flex-wrap justify-between ">
                <div className="border-l-[3px] bg-gray-100 border-[#2196F3] w-56 h-28 rounded-xl shadow-lg  p-1 flex flex-col">
                    <h6 className="text-gray-600 font-semibold text-center">
                    Total Students
                    </h6>

                    <div className="w-full h-full flex justify-center items-center">
                        <p className="text-3xl text-gray-700">1000</p>
                    </div>
                </div>

                <div className="border-l-[3px] bg-gray-100 border-red-500 w-56 h-28 rounded-xl shadow-lg  p-1 flex flex-col">
                    <h6 className="text-gray-600 font-semibold text-center">
                    Total Courses
                    </h6>

                    <div className="w-full h-full flex justify-center items-center">
                        <p className="text-3xl text-gray-700">50</p>
                    </div>
                </div>

                <div className="border-l-[3px] bg-gray-100 border-green-600 w-56 h-28 rounded-xl shadow-lg  p-1 flex flex-col">
                    <h6 className="text-gray-600 font-semibold text-center">
                    Total Earnings
                    </h6>

                    <div className="w-full h-full flex justify-center items-center">
                        <p className="text-3xl text-gray-700">1000</p>
                    </div>
                </div>
            </div>
     </>
  )
}

export default Overview