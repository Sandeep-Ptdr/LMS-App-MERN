import React, { useState } from 'react';

const CreateCourse = () => {
   
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    status: '',
    price: '',
  });

   
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

   
  const handleSubmit = (e) => {
    e.preventDefault();
     
    console.log("Course Data:", courseData);
     
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold text-gray-600 mb-6">Create New Course</h2>
      
      <form onSubmit={handleSubmit} className="bg-gray-50 shadow-md rounded-lg p-6 space-y-4">
        
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
          <label className="block text-gray-600 mb-2">Course Description:</label>
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
          <select
            name="category"
            value={courseData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select Category</option>
            <option value="Web Development">Web Development</option>
            <option value="Data Science">Data Science</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
          </select>
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
