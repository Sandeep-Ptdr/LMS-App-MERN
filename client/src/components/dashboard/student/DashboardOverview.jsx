import React from "react";
import ProgressChart from "../../charts/ProgressChart";
import DashboardCourseCard from "./courses/DashboardCourseCard";
import DashboardQuizDetails from "./courses/DashboardQuizDetails";
import API from "../../../utils/api";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
 

const DashboardOverview = ({ data }) => {
  const navigate = useNavigate();

  const swrFetcher = async (url) => {
    const response = await API.get(url);
    return response.data;
  };

  const {
    data: progress,
    error,
    isLoading,
  } = useSWR("/student/progress", swrFetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });

  const { data: courses, error: courseError } = useSWR("/student/mycourses", swrFetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });

  const progressList = Array.isArray(progress) ? progress : progress?.progress || [];
  const courseList = Array.isArray(courses?.course) ? courses?.course : [];
  const studentName = data?.user?.name?.trim()
    ? data.user.name.charAt(0).toUpperCase() + data.user.name.slice(1)
    : "Student";

  const mergedData = progressList.map((p) => {
    const matchedCourse = courseList.find((c) => c._id === p.course?._id);

    return {
      ...p,
      courseThumbnail: matchedCourse?.image || "https://via.placeholder.com/1200x600",
      courseId: matchedCourse?._id || p.course?._id,
      courseTitle: matchedCourse?.title || p.course?.title || "Untitled Course",
    };
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error?.data?.message || error?.message}</p>;
  if (courseError) return <p>{courseError?.data?.message || courseError?.message}</p>;

  return (
    <>
      <h1 className="font-semibold text-2xl text-gray-700 mb-4">
        Welcome {studentName}
      </h1>
      <div className="mb-5 flex flex-col gap-4 md:flex-row">
        <div className="mb-4 w-full md:mb-0 md:w-[50%]">
          <ProgressChart
            progressData={progressList}
            loading={isLoading}
            error={error}
          />
        </div>
        <div className="h-[375px] w-full overflow-hidden rounded-md bg-gray-50 shadow-md md:w-[50%]">
          <div className="flex justify-between items-center p-4 border-b border-gray-300">
            <h1 className="text-2xl font-semibold text-gray-600">Quizzes</h1>
            <button
              onClick={() => navigate("/student/quizzes")}
              className="rounded-md bg-[#2196F3] px-3 py-2 font-semibold text-gray-50 hover:bg-[#1976D2]"
            >
              Quiz Results
            </button>
          </div>
          <div className="h-[calc(100%-72px)] overflow-y-auto p-4 scroll-smooth">
            <DashboardQuizDetails />
          </div>
        </div>
      </div>

      <div className="rounded-md bg-gray-50 shadow-md">
        <div className="flex items-center justify-between border-b border-gray-300 p-4">
          <h1 className="text-2xl font-medium text-gray-600">Courses</h1>
          <button
            onClick={() => navigate("/student/mycourses")}
            className="rounded-md bg-[#2196F3] px-3 py-2 font-semibold text-white hover:bg-[#1976D2]"
          >
            My Courses
          </button>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 p-4 lg:grid-cols-2">
          {mergedData?.length > 0 ? (
            mergedData.map((progress) => (
              <DashboardCourseCard key={progress._id} progress={progress} />
            ))
          ) : (
            <p className="text-sm font-medium text-gray-500">
              No course progress found yet.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardOverview;
