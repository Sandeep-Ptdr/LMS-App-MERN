 import React from 'react'
 
 const QuizCard = () => {
   return (
    <div className="bg-gray-50 rounded-md shadow-md p-4 w-full">
    <h3 className="text-lg font-semibold text-gray-600">quizTitle</h3>
    <p className="text-sm text-gray-500">Course: courseName</p>
    <p className="text-sm text-gray-500">Lesson: lessonName</p>
    <button
      
      className="mt-4 bg-[#2196F3] text-gray-50 text-base font-medium px-2 py-1  rounded-md hover:bg-[#1976D2]"
    >
      Take Quiz
    </button>
  </div>
   )
 }
 
 export default QuizCard