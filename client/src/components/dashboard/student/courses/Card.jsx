import React from "react";
import { Link } from "react-router-dom";

const Card = ({ course, onPayment }) => {
  const title = course?.title?.trim()
    ? course.title.trim().charAt(0).toUpperCase() + course.title.trim().slice(1)
    : "No title";

  return (
    <div className="relative flex h-full w-full max-w-[308px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="overflow-hidden">
        <img
          className="h-36 w-full object-cover transition-all duration-300 ease-in-out hover:scale-105"
          src={
            course?.image ||
            "https://miro.medium.com/v2/resize:fit:1200/1*y6C4nSvy2Woe0m7bWEn4BA.png"
          }
          alt="Course Image"
        />
      </div>

      <div className="flex flex-1 flex-col px-4 py-3 sm:px-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="line-clamp-2 text-lg font-bold text-gray-800 hover:text-[#2196F3]">
              {title}
            </h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#2196F3]">
              {course?.category || "Other"}
            </p>
          </div>
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
              course?.status === "Published"
                ? "bg-blue-100 text-[#1976D2]"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {course?.status || "Draft"}
          </span>
        </div>

        <p className="mb-4 line-clamp-2 text-sm leading-6 text-gray-600">
          {course?.description || "No description added for this course yet."}
        </p>

        <div className="grid grid-cols-2 gap-2 rounded-xl bg-white p-2.5 text-sm text-gray-600 shadow-sm">
          <div className="rounded-lg bg-gray-100 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Students
            </p>
            <p className="mt-1 text-base font-bold text-gray-800">
              {course?.enrolledStudents?.length || 0}
            </p>
          </div>
          <div className="rounded-lg bg-gray-100 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Price
            </p>
            <p className="mt-1 text-base font-bold text-gray-800">
              Rs. {course?.price || 0}
            </p>
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <Link to={`/student/course/${course?._id}`}>
            <button className="w-full rounded-md bg-[#2196F3] px-4 py-2 text-sm font-bold text-white hover:bg-[#3286cb] sm:w-auto">
              View Details
            </button>
          </Link>
          <button
            className="w-full rounded-md bg-gray-200 px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-300 sm:w-auto"
            id="btn"
            onClick={() => onPayment(course?._id, course?.price)}
          >
            Enroll
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
