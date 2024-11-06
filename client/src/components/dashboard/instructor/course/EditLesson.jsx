import React, { useEffect, useState } from 'react';
import useFetchData from '../../../../hooks/useFetchData';
import { useParams } from 'react-router-dom';

const EditLesson = () => {
  const params = useParams();
  const [editData, setEditData] = useState({
    title: "", 
    description: ""
  })
  const [videoUrl, setVideoUrl] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const {data, loading, error, fetchData} = useFetchData();

  const handleFileChange = (e) => {
    if (e.target.name === 'video'){
      setVideoUrl(e.target.files[0]);
    } else if (e.target.name === 'pdf'){
      setPdfUrl(e.target.files[0]);
    } else if (e.target.name === 'image'){
      setImageUrl(e.target.files[0]);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
     
  }

  const handleSave =  () => {
    const formData = new FormData();

    formData.append('title', editData.title);
    formData.append('description', editData.description);
    if(videoUrl) formData.append('video', videoUrl);
    if(pdfUrl) formData.append('pdf', pdfUrl);
    if(imageUrl) formData.append('image', imageUrl);
   
    
    fetchData(`/instructor/lesson/${params.lessonId}/edit`, "PUT", formData)
     
  }

  useEffect(() => {
    fetchData(`/instructor/lesson/${params.lessonId}/edit`, "GET")
  }, [])
  
  useEffect(() => {

    if(loading){
      <p>Loading...</p>
      return;
    }

    if (error) {
      <p>{error?.data?.message}</p>
      return;
      
    }

    if(data){
       setEditData({
        title: data?.lesson?.title,
        description: data?.lesson?.description
       })
       setVideoUrl(data?.lesson?.videoUrl)
       setPdfUrl(data?.lesson?.pdfUrl)
       setImageUrl(data?.lesson?.imageUrl)  

    }

  },[data])

  if(loading) return <p>Loading...</p>
  if(error) return <p>{error?.data?.message && error?.data?.error}</p>
  
    
  return (
    <div className="container mx-auto px-4">
      <h1 className="font-semibold text-2xl text-gray-700 mb-4">
        Edit Lesson
      </h1>
      <div className="bg-gray-50 shadow-md rounded-lg overflow-hidden block sm:flex">
        <div className="sm:w-2/3 w-full p-6 border-r border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">
            Basic Information:
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Lesson Title:</label>
            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={handleInputChange}
              className="w-full outline-none px-3 py-2 border border-gray-300 rounded focus:border-[#2196F3]"
              placeholder="Enter lesson title"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Lesson Description:
            </label>
            <textarea
              name="description"
              value={editData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-[#2196F3]"
              rows="4"
              placeholder='Enter lesson description'  
            ></textarea>
          </div>

          {/* Image Upload Section */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Upload Image</label>
            <input
              type="file"
              name="image"
              className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-[#2196F3]"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <button
            onClick={handleSave}
            className="bg-[#2196F3] hover:bg-[#3286cb] text-white font-bold py-2 px-4 rounded"
          >
            Save Changes
          </button>
        </div>

        <div className="sm:w-1/3 w-full p-6">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">
            Edit Lesson Video
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Current Video</label>
            <video
              className="w-full h-36 border border-gray-300 rounded"
              controls
            >
              <source src={videoUrl} type="video/mp4" />
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
              onChange={handleFileChange}
            />
          </div>

          {/* PDF Upload Section */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Upload PDF</label>
            <input
              type="file"
              name="pdf"

              className="w-full px-3 py-2 border border-gray-300 rounded"
              accept="application/pdf"
              onChange={handleFileChange}
            />
          </div>

           
        </div>
      </div>
    </div>
  );
};

export default EditLesson;
