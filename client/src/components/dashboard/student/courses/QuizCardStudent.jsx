import React from "react";
import { Link } from "react-router-dom";

const QuizCardStudent = ({ data }) => {
  const submitted = Boolean(data?.isSubmitted);

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="bg-gradient-to-r from-[#2196F3] to-[#64B5F6] px-5 py-4 text-white">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-50">
            Student Quiz
          </p>
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${
              submitted
                ? "bg-green-100 text-green-700"
                : "bg-white/20 text-white"
            }`}
          >
            {submitted ? "Submitted" : "Pending"}
          </span>
        </div>
        <h3 className="mt-2 line-clamp-2 text-xl font-bold">
          {data?.title || "Untitled Quiz"}
        </h3>
      </div>

      <div className="flex flex-1 flex-col px-5 py-4">
        <div className="grid grid-cols-1 gap-2 rounded-xl bg-white p-3 text-sm text-gray-600 shadow-sm">
          <div className="rounded-lg bg-gray-100 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Course
            </p>
            <p className="mt-1 line-clamp-2 text-sm font-semibold text-gray-800">
              {data?.course?.title || "Unknown Course"}
            </p>
          </div>
          <div className="rounded-lg bg-gray-100 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Lesson
            </p>
            <p className="mt-1 line-clamp-2 text-sm font-semibold text-gray-800">
              {data?.lesson?.title || "Unknown Lesson"}
            </p>
          </div>
          {submitted && (
            <div className="rounded-lg bg-gray-100 px-3 py-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Result
              </p>
              <p className="mt-1 text-sm font-semibold text-gray-800">
                {data?.submission?.score ?? 0}/{data?.submission?.totalMarks ?? 0} marks
              </p>
              <p className="mt-1 text-xs font-medium text-gray-500">
                {data?.submission?.percentage ?? 0}% score
              </p>
            </div>
          )}
        </div>

        <div className="mt-auto pt-4">
          <Link to={`/student/course/lesson/quiz/${data?._id}`}>
            <button
              className={`w-full rounded-md px-4 py-2.5 text-sm font-bold text-gray-50 ${
                submitted
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-[#2196F3] hover:bg-[#1976D2]"
              }`}
            >
              {submitted ? "Submitted" : "Start Quiz"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizCardStudent;
