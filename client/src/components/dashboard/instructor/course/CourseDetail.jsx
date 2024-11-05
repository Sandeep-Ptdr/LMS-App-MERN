import React from "react";
import { Link } from "react-router-dom";
const CourseDetail = ({data}) => {
  // console.log('datad',data)
  return (
    <>
     
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className=" font-semibold text-2xl text-gray-700 mb-4 ">
            Course
          </h1>

          <Link to={`/instructor/course/${data?.course?._id}/edit`}>
            <button className="bg-[#2196F3] hover:bg-[#3286cb] text-white font-bold py-2 px-4 rounded">
              Edit Course
            </button>
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img
            className="w-full h-60 object-cover"
            src={"https://via.placeholder.com/1200x600"}
            alt={data?.course?.title}
          />

          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {data?.course?.title.trim().charAt(0).toUpperCase() + data?.course?.title.slice(1)}
            </h1>
            <p className="text-gray-600 mb-4">
              Instructor: {data?.course?.instructor.map((instructor) => instructor.name)}
            </p>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                Description
              </h2>
              <p className="text-gray-600">{data?.course?.description}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                Course Information
              </h2>
              <ul className="list-disc pl-5 text-gray-600">
                <li>
                  <strong>Total Students:</strong> {data?.course?.enrolledStudents?.length}
                </li>
                <li>
                  <strong>Category:</strong> {data?.course?.category}
                </li>
                <li>
                  <strong>Status:</strong> {data?.course?.status}
                </li>
                <li>
                  <strong>Price:</strong> ${data?.course?.price}
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                Course Content
              </h2>
              <ul className="list-decimal pl-5 text-gray-600">
                {data?.lessons.length > 0 ? (data?.lessons?.map((lesson, index) => (
                  <li key={index} className="mb-1">
                    {lesson?.title}{" "}
                     
                  </li>
                ))):(<p>No lessons found.</p>)}
              </ul>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                Enrolled Students
              </h2>
              <ul className="list-disc pl-5 text-gray-600">
                {data?.course?.enrolledStudents.length > 0 ? (data?.course?.enrolledStudents?.map((student, index) => (
                  <li key={index} className="mb-1">
                    {student?.name} - {student?.email}
                  </li>
                ))):(<p>No students enrolled yet.</p>) }
              </ul>
            </div>

            {/* <div className="flex justify-between items-center">
              <span className="font-bold text-[#2196F3] text-lg">
                Total Earnings: ${course.earnings}
              </span>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetail;
