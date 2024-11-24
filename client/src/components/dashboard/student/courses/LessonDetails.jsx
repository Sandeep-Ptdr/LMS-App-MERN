import React, { useEffect } from "react";
import { IoMdDownload } from "react-icons/io";
import useFetchData from "../../../../hooks/useFetchData";
import { useParams } from "react-router-dom";
import API from "../../../../utils/api";
const LessonDetails = () => {

  const {data, loading , error, fetchData} = useFetchData();
  const params = useParams()

  useEffect(() => {
    
    fetchData(`/student/course/lesson/${params.lessonId}`, "GET");

  }, [])

  console.log('error', error)   
  
  if(loading) return <p>Loading...</p>
  if(error) return <p>{error?.data?.message || error?.message}</p>
  console.log('lesson info', data);
  
  const updateProgress =  async () => {
    try{

    const res = await API.put(`/student/updateprogress`,  {courseId: data?.lesson?.course[0], lessonId: params.lessonId})

    console.log('resssssssss....', res)
    }catch(error){
      console.log('error::::',error)
    }

  }
     
  if(data?.success){
    updateProgress();
  }
  
  

  return (
    <div className="container px-4 mx-auto">
      <h1 className=" font-semibold text-2xl text-gray-700 mb-4 ">Lesson</h1>
      <div className="sm:flex w-full gap-4">
        <div className="w-full sm:w-8/12">
          <div className="bg-gray-50 shadow-md rounded-md mb-4 overflow-hidden">
            <video className="w-full h-5/6" controls>
              <source
                src={data?.lesson?.videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4"}
                type="video/mp4"
              />
            </video>
            <div className="p-4">
              <h1 className="text-xl font-semibold text-gray-700">{data?.lesson?.title}</h1>
              <p className="text-sm font-medium text-gray-600">
                 {data?.lesson?.description}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-4/12 ">
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
                  Instructor Name
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

          <div className="w-full bg-gray-50 rounded-md shadow-md ">
            <div className="p-4 border-b border-gray-300 flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-600"> Course Data</span>
              <button  className="p-2 rounded-full bg-[#2196F3] text-gray-50">
                <IoMdDownload />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetails;
