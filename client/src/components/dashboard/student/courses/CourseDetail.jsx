import React, { useEffect } from "react";
import { IoMdStar, IoMdStarHalf, IoIosStarOutline } from "react-icons/io";
import useFetchData from "../../../../hooks/useFetchData";
import {  useNavigate, useParams } from "react-router-dom";

const CourseDetail = () => {

  const navigate = useNavigate();

  const params = useParams()
  const {data, loading, error, fetchData} = useFetchData();

  useEffect(() => {
    fetchData(`/student/course/${params.courseId}`,"GET")
  },[])

   console.log('detail',data)

   

  return (
    <div className="container px-4 mx-auto">
      <h1 className=" font-semibold text-2xl text-gray-700 mb-4 ">Course</h1>
      <div className="sm:flex w-full gap-4">
        <div className="w-full sm:w-8/12">
          <div className="bg-gray-50 shadow-md rounded-md mb-4 overflow-hidden">
            <video className="w-full h-5/6" controls>
              <source
                src={data.course?.content}
                type="video/mp4"
              />
            </video>
            <div className="p-4">
              <h1 className="text-xl font-semibold text-gray-700">
                 {data?.course?.title}
              </h1>
              <p className="text-sm font-medium text-gray-600">
                {data?.course?.description}
              </p>
            </div>
          </div>

          <div className="w-full bg-gray-50 shadow-md rounded-md mb-4 ">
            <div>
              {loading && <p>Loading...</p>}
              {error && <p>{error?.data?.message || error?.message}</p>}
              <ul>

                {
                  data && data?.lessons?.length > 0 ? data.lessons.map((lesson) => <li 
                  onClick={() => navigate(`/student/course/lesson/${lesson._id}`)}
                  className="list-decimal list-inside p-2 border-b border-gray-300 text-gray-600 font-medium cursor-pointer" key={lesson._id}>
                   {lesson.title}
                </li> ) : !loading  && !error && <p> No Lessons found!</p>
                }
                 
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-4/12 ">
          <div className="bg-gray-50 rounded-md shadow-md mb-4 w-full p-4 flex flex-col items-center gap-1">
            <span className="text-xl font-semibold text-gray-600">199 USD</span>
            <button className="bg-green-600 hover:bg-green-700 transition-colors duration-100 text-gray-50 text-lg font-medium w-full py-2 rounded-md">
              {" "}
              Purchase Course
            </button>
          </div>
          <div className="bg-gray-50 rounded-md shadow-md mb-4 w-full">
            <div className=" w-full flex p-4 border-b border-gray-300">
              <div className="border border-gray-300 w-14 h-14 rounded-full overflow-hidden">
                <img
                  src="https://via.placeholder.com/1200x600"
                  alt=""
                  className="w-full h-full object-contain object-center"
                />
              </div>
              <div className="ml-4 ">
                <h1 className="font-semibold text-lg text-gray-600">
                   {data?.course?.instructor.map((instructor) => instructor.name.charAt(0).toUpperCase() + instructor.name.slice(1))}
                </h1>
                <span className="text-sm font-medium text-gray-500">
                  Instructor
                </span>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm font-medium text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, ex
                reprehenderit et nobis voluptatibus voluptates delectus!
              </p>
            </div>
          </div>

          <div className="w-full bg-gray-50 rounded-md shadow-md">
            <div className="p-4 border-b border-gray-300 ">
              <h1 className="font-semibold text-xl text-gray-600">Ratings</h1>
            </div>
            <div className="p-4">
              <span className="flex mb-1 ">
                <IoMdStar className="text-xl text-yellow-500" />
                <IoMdStarHalf className="text-xl text-yellow-500" />
                <IoIosStarOutline className="text-xl text-yellow-500" />
              </span>
              <p className="text-xs font-medium text-gray-500">20 ratings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
