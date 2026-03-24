import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardCourseCard = ({ progress }) => {
  const navigate = useNavigate();

  return (
    <div className="flex h-full items-center rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className="mr-3 h-16 w-28 overflow-hidden rounded-lg">
        <img
          className="h-full w-full object-cover object-center"
          src={progress?.courseThumbnail}
          alt={progress?.courseTitle}
        />
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h1 className="cursor-pointer truncate text-lg font-semibold text-gray-600 hover:text-[#2196F3]">
            {progress?.courseTitle || "Untitled Course"}
          </h1>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-[#2196F3] transition-all duration-300"
              style={{ width: `${progress?.progress || 0}%` }}
            />
          </div>

          <p className="mt-1 text-xs font-medium text-gray-500">
            {progress?.progress || 0}% completed
          </p>
        </div>

        <div>
          <button
            onClick={() => navigate(`/student/course/${progress?.courseId}`)}
            className="rounded-md bg-[#2196F3] px-3 py-2 text-xs font-semibold text-white hover:bg-[#1976D2]"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardCourseCard;
