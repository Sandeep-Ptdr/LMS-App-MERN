import React, { useEffect } from "react";
import { IoPlayCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../../../hooks/useFetchData";
 
const MyCoursesCard = ({ course }) => {
  const navigate = useNavigate();

  const { data, loading, fetchData } = useFetchData();
  useEffect(() => {
    fetchData(`student/progress`, "GET");
  }, []);

  if (loading) return <p>Loading...</p>;
  // if(error) return console.log('error::::',error)
  // console.log('dataaaa',data)

  const courseProgress = data?.progress?.find(
    (progress) => progress?.course?._id === course?._id
  );

  const progressPercentage = courseProgress?.progress || 0;
  const totalLessons = courseProgress?.totalLessons || 0;
  const completedLessons = courseProgress?.completedLessons.length || 0;
  const title = course?.title?.trim()
    ? course.title.trim().charAt(0).toUpperCase() + course.title.trim().slice(1)
    : "Untitled Course";
  const buttonLabel =
    completedLessons === totalLessons && totalLessons > 0 ? "Review" : "Continue";

  return (
    <div className="relative flex h-full w-full max-w-[308px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="overflow-hidden">
        <img
          className="h-36 w-full object-cover transition-all duration-300 ease-in-out hover:scale-105"
          src={course?.image || "https://via.placeholder.com/1200x600"}
          alt={title}
        />
      </div>

      <div className="flex flex-1 flex-col px-4 py-3 sm:px-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="line-clamp-2 text-lg font-bold text-gray-800 hover:text-[#2196F3]">
              {title}
            </h1>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#2196F3]">
              Enrolled Course
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-[#1976D2]">
            {progressPercentage}%
          </span>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2 rounded-xl bg-white p-2.5 text-sm text-gray-600 shadow-sm">
          <div className="rounded-lg bg-gray-100 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Lessons
            </p>
            <p className="mt-1 text-base font-bold text-gray-800">
              {completedLessons}/{totalLessons}
            </p>
          </div>
          <div className="rounded-lg bg-gray-100 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Status
            </p>
            <p className="mt-1 text-base font-bold text-gray-800">
              {progressPercentage === 100 ? "Completed" : "In Progress"}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between text-sm font-medium text-gray-600">
            <span>Course Progress</span>
            <span>{progressPercentage}%</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-[#2196F3] transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <button
            className="flex w-full items-center justify-center gap-1 rounded-md bg-[#2196F3] px-4 py-2 text-sm font-bold text-gray-50 hover:bg-[#1976D2] sm:w-auto"
            onClick={() => navigate(`/student/course/${course._id}`)}
          >
            {buttonLabel} <IoPlayCircleOutline className="text-base" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCoursesCard;
