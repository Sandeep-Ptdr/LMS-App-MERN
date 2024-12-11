import React from "react";
import { Link } from "react-router-dom";

const QuizCardStudent = () => {
  return (
    <div className="bg-gray-50 rounded-md shadow-md p-4 w-full">
      <h3 className="text-lg font-semibold text-gray-600">quizTitle</h3>
      <p className="text-sm text-gray-500">Course: courseName</p>
      <p className="text-sm text-gray-500">Lesson: lessonName</p>

      <Link to="/student/course/lesson/1/quiz">
        <button className="mt-4 bg-[#2196F3] text-gray-50 text-base font-medium px-2 py-1  rounded-md hover:bg-[#1976D2]">
          Take Quiz
        </button>
      </Link>
    </div>
  );
};

export default QuizCardStudent;
