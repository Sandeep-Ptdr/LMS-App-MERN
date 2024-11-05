import React, { useEffect, useState } from "react";

import Lessons from "./Lessons";
import useFetchData from "../../../../hooks/useFetchData";
import { useParams } from "react-router-dom";
import { useEditCourse } from "../../../../hooks/courseHandler";
import API from "../../../../utils/api";
import { useNavigate } from "react-router-dom";

const EditInstructorCourse = () => {
  const navigate = useNavigate()
  const params = useParams();
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    category: "",
    status: "",
  });

  const { data, error, loading, fetchData } = useFetchData();

  const handleInputChange = async (e) => {
    const { name, value } = e.target;

    setEditData({ ...editData, [name]: value });
  };

  const handleSave = () => {


    fetchData(`/instructor/course/${params.courseId}/edit`,"PUT",editData)

     if(data.success === true){
       <p>{data.message}</p>
       navigate("/instructor/courses")
       
     }
    // try {
    //   setLoading(true)
    //   const response = await API.put(`/instructor/course/${params.courseId}/edit`, editData);
    //   console.log(response)
    // } catch (error) {
    //    setError(error)
    // }finally{
    //   setLoading(false)
    // }
    // await editCourse(editData);
  };
  // const handleVideoUrl = (e) => {
  //   const file = e.target.files && e.target.files[0];
  //   if (file) {
  //     const videoUrl = URL.createObjectURL(file); // Create a temporary URL for the video
  //     setEditData({ ...editData, video: videoUrl }); // Save the file (or URL if you want to save the URL)
  //   } else {
  //     console.error("No file selected");
  //   }
  // };
  useEffect(() => {
    fetchData(`/instructor/course/${params.courseId}/edit`, "GET");
  },[])

  useEffect(() => {
    

    if (loading) {
      <p>loading...</p>
      return;
    } 

    if (error) {
       <p>{error}</p>
      return;
    }

    if (data) {
      setEditData({
        title: data?.course.title,
        description: data?.course.description,
        category: data?.course.category,
        status: data?.course.status,
      });
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

   


  return (
    <div className="container mx-auto px-4">
      <h1 className=" font-semibold text-2xl text-gray-700 mb-4 ">
        Edit Course
      </h1>
      <div className="bg-gray-50 shadow-md rounded-lg overflow-hidden block sm:flex ">
        <div className="sm:w-2/3 w-full p-6 border-r border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">
            Basic Information:
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Course Title:</label>
            <input
              type="text"
              name="title"
              value={editData.title || " "}
              onChange={handleInputChange}
              className="w-full outline-none px-3 py-2 border border-gray-300 rounded focus:border-[#2196F3]"
              placeholder="Enter course title"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Course Description:
            </label>
            <textarea
              name="description"
              value={editData.description || " "}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-[#2196F3]"
              rows="4"
              placeholder="Enter course description"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={editData.category || " "}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-[#2196F3]"
            >
              <option value={editData.category || ""}>
                {editData.category || "Select Category"}
              </option>
              <option value="Web Development">Web Development</option>
              <option value="Data Science">Data Science</option>
              <option value="Design">Design</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Status:</label>
            <select
              name="status"
              value={editData.status || " "}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-[#2196F3]"
            >
              <option value={editData.status || ""}>
                {editData.status || "Select Status"}
              </option>
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </div>

          <button
            onClick={handleSave}
            className="bg-[#2196F3] hover:bg-[#3286cb] text-white font-bold py-2 px-4 rounded"
          >
            Save Changes
          </button>
        </div>

        <div className=" sm:w-1/3 w-full p-6">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">
            Edit Course Video
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Current Video</label>
            <video
              className="w-full h-36 border border-gray-300 rounded"
              controls
            >
              <source src="https://example.com" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Upload New Video</label>
            <input
              type="file"
              name="video"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              accept="video/*"
            />
          </div>

          <button
            // onClick={handleVideoUrl}
            className="bg-[#2196F3] hover:bg-[#3286cb] text-white font-bold py-2 px-4 rounded"
          >
            Save Video
          </button>
        </div>
      </div>

      <div className=" w-full shadow-md bg-gray-50 rounded-md mt-4">
        <h1 className=" font-semibold text-2xl text-gray-700  border-b border-gray-300 px-6 py-4">
          Lessons
        </h1>

        <div className="px-6 py-4">
          <button className=" py-2 px-4 font-bold  bg-[#2196F3] hover:bg-[#3286cb] rounded-md text-white mb-4">
            Add Lesson
          </button>

          <div className="w-full flex flex-wrap gap-1 ">
            <Lessons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInstructorCourse;
