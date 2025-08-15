import React, { useEffect } from "react";
import { IoPlayCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../../../hooks/useFetchData";
 
const MyCoursesCard = ({course}) => {
  const navigate = useNavigate()

  const {data, loading, error, fetchData} = useFetchData()
  useEffect(() => {

  fetchData(`student/progress`, "GET");
      
  },[])

  if(loading) return <p>Loading...</p>
  // if(error) return console.log('error::::',error)
    // console.log('dataaaa',data)

  const  courseProgress = data?.progress?.find(progress => progress?.course?._id === course?._id)

  const progressPercentage = courseProgress?.progress || 0
  const totalLessons = courseProgress?.totalLessons || 0
  const completedLessons = courseProgress?.completedLessons.length || 0

 
   
   
  return (
    <div className="md:min-w-[48%]  min-w-full bg-gray-50 shadow-md rounded  ">
      <div className="flex px-4 py-4">
        <div className="w-28 h-16 rounded-md  overflow-hidden mr-2">
          <img
            className="object-cover w-full h-full object-center"
            src={ course.image ||"https://via.placeholder.com/1200x600"}
            alt=""
          />    
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-lg font-semibold text-gray-700">{course.title}</h1>
          <p className="text-base font-medium text-gray-500">{`Lesson ${completedLessons}/${totalLessons}`}</p>
        </div>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full ">
        <div className="bg-[#2196F3] h-full rounded-full transition-all duration-300 " style={{width:`${progressPercentage}%`}}/>
      </div>

      <div className="p-4">
        {
          completedLessons === totalLessons ? (
            <button className="flex gap-1 justify-center items-center bg-[#2196F3] hover:bg-[#1976D2] text-gray-50 px-2 py-1 rounded-md" 
        onClick={() => navigate(`/student/course/${course._id}`)}
        >
            Start <IoPlayCircleOutline/>
        </button>
          ) : (
            <button className="flex gap-1 justify-center items-center text-gray-50 px-2 py-1 rounded-md bg-[#2196F3] hover:bg-[#1976D2] " 
            onClick={() => navigate(`/student/course/${course._id}`)} 
            >
            Continue <IoPlayCircleOutline/>
        </button>
          )
        }
      </div>
    </div>
  );
};

export default MyCoursesCard;
