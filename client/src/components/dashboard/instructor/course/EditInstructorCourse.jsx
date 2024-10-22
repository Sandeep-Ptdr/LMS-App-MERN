import React, { useEffect, useState } from "react";

const EditInstructorCourse = () => {
const [editData, setEditData] = useState({
  title: "",
  description: "",
  category: "",
  status:"",
  video:"",
})

const handleSave = (e) => {
 const {name,value} = e.target;

 setEditData({...editData, [name]: value});
 
}
const handleVideoUrl = (e) => {
  const file = e.target.files && e.target.files[0];
  if (file) {
    const videoUrl = URL.createObjectURL(file); // Create a temporary URL for the video
    setEditData({ ...editData, video: videoUrl }); // Save the file (or URL if you want to save the URL)
  }else {
    console.error("No file selected");
  }

}

useEffect(() => {
  
  console.log("editData",editData);

}, [editData])

   
  return (
    <div className="container mx-auto px-4">
      <h1 className=" font-semibold text-2xl text-gray-700 mb-4 ">
         Edit Course 
        </h1>
    <div className="bg-gray-50 shadow-md rounded-lg overflow-hidden flex">
      
      
      <div className="w-2/3 p-6 border-r border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">Basic Information:</h2>

         
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Course Title:</label>
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleSave}
            className="w-full outline-none px-3 py-2 border border-gray-300 rounded focus:border-[#2196F3]"
            placeholder="Enter course title"
          />
        </div>

         
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Course Description:</label>
          <textarea
          name="description"
            value={editData.description}
            onChange={ handleSave}
            className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-[#2196F3]"
            rows="4"
            placeholder="Enter course description"
          ></textarea>
        </div>

        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Category</label>
          <select
          name="category"
            value={editData.category}
            onChange={ handleSave}
            className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-[#2196F3]"
          >
            <option value="">Select Category</option>
            <option value="Web Development">Web Development</option>
            <option value="Data Science">Data Science</option>
            <option value="Design">Design</option>
             
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Status:</label>
          <select
          name="status"
            value={editData.status}
            onChange={handleSave}
            className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-[#2196F3]"
          >
            <option value="">Select Status</option>
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

       
      <div className="w-1/3 p-6">
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">Edit Course Video</h2>

        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Current Video</label>
          <video className="w-full h-36 border border-gray-300 rounded" controls>
            <source src='https://example.com' type="video/mp4" />
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
          onClick={handleVideoUrl}
          className="bg-[#2196F3] hover:bg-[#3286cb] text-white font-bold py-2 px-4 rounded"
        >
          Save Video
        </button>
      </div>
    </div>
  </div>
  );
};

export default EditInstructorCourse;
