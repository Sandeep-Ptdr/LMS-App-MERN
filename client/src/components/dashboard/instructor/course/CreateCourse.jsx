import React, { useState } from "react";
import API from "../../../../utils/api";
import useFetchData from "../../../../hooks/useFetchData";
import { useNavigate } from "react-router-dom";
 

const CreateCourse = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState({
    video:"",
    image:""
  });
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    status: "",
    price: "",
  });

  const {data, loading, error, fetchData} = useFetchData()

   

  const handleFileChange = (e) => {
    if(e.target.name === "video"){
        setFiles({...files,video:e.target.files[0]})
      }
      else if(e.target.name === "image"){
        setFiles({...files,image:e.target.files[0]})
    }
    }
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", courseData.title);
    formData.append("description", courseData.description);
    formData.append("category", courseData.category);
    formData.append("status", courseData.status);
    formData.append("price", courseData.price);
    if (files) {
      formData.append("video", files.video);
      formData.append("image", files.image);
    }

    fetchData(`/instructor/course/create`, "POST", formData);
      
     
  };

   
   if(error) { <p>{error?.data?.message}</p> }
  if(data?.success){
    <p>{data?.message}</p>

    return navigate("/instructor/courses");


  }
   
  return (
    <div className="container mx-auto px-4 ">
      <h2 className="text-2xl font-semibold text-gray-600 mb-6">
        Create New Course
      </h2>

      { loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-10">
          <div className="loader"></div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 shadow-md rounded-lg p-6 space-y-4"
      >
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Course Title:</label>
          <input
            type="text"
            name="title"
            value={courseData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter course title"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">
            Course Description:
          </label>
          <textarea
            name="description"
            value={courseData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            rows="4"
            placeholder="Enter course description"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Category:</label>
          <input
            type="text"
            name="category"
            value={courseData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter course category"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Status:</label>
          <select
            name="status"
            value={courseData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select Status</option>
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Price:</label>
          <input
            type="number"
            name="price"
            value={courseData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter course price"
            min="0"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Video File:</label>
          <input
            type="file"
            name="video"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Thumbnail/Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-[#2196F3] text-white font-bold py-2 px-4 rounded hover:bg-[#3286cb]"
        >
          Create Course
        </button>
      </form>

     

       

    </div>
  );
};

export default CreateCourse;
