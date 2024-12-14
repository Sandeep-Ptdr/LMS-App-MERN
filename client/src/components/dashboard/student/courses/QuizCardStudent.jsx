import React from "react";
import { Link } from "react-router-dom";

const QuizCardStudent = ({data}) => {
  console.log('quiz',  data )
  return (
    <div className="bg-gray-50 rounded-md shadow-md p-4 w-full">
      <h3 className="text-lg font-semibold text-gray-600">{data?.title}</h3>
      <p className="text-sm text-gray-500">Course: {data?.course.title}</p>
      <p className="text-sm text-gray-500">Lesson: {data?.lesson.title}</p>

      <Link to={`/student/course/lesson/quiz/${data?._id}`}>
        <button className="mt-4 bg-[#2196F3] text-gray-50 text-base font-medium px-2 py-1  rounded-md hover:bg-[#1976D2]">
          Take Quiz
        </button>
      </Link>
    </div>
  );
};

export default QuizCardStudent;
