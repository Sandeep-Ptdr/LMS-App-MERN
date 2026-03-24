import React from "react";
import useSWR from "swr";
import API from "../../../../utils/api";

const DashboardQuizDetails = () => {
  const swrFetcher = async (url) => {
    const response = await API.get(url);
    return response.data;
  };

  const { data, error, isLoading } = useSWR(
    "/student/quizzes-result",
    swrFetcher,
    { revalidateOnFocus: false,  revalidateIfStale: false }
  );

  if (isLoading) return <p className="text-sm text-gray-500">Loading quizzes...</p>;
  if (error) return <p className="text-sm text-red-500">Error loading quizzes</p>;

  const quizResults = data?.quizResults || [];
  const visibleResults = quizResults.slice(0, 5);
  const getPercentage = (score, totalMarks) => {
    if (!totalMarks) return "0%";
    return `${((score / totalMarks) * 100).toFixed(0)}%`;
  };

  return (
    <div className="space-y-3">
      {visibleResults.length > 0 ? (
        visibleResults.map((quiz, index) => (
          <div
            key={quiz._id || index}
            className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-base font-semibold text-gray-800">
                {quiz?.quiz?.title || "Untitled Quiz"}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-x-2 text-sm">
                <span className="text-gray-600">Course:</span>
                <span className="font-medium text-gray-800">
                  {quiz?.course?.title || "Unknown Course"}
                </span>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 text-xs text-gray-500">
                <span>
                  Score: {quiz?.score ?? 0}/{quiz?.totalMarks ?? 0}
                </span>
                <span>{getPercentage(quiz?.score ?? 0, quiz?.totalMarks ?? 0)}</span>
                <span>{new Date(quiz?.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="ml-4 shrink-0 rounded-full bg-blue-50 px-3 py-2 text-right">
              <span className="block text-xs font-medium text-[#1976D2]">
                Result
              </span>
              <span className="block text-lg font-bold text-[#1976D2]">
                {getPercentage(quiz?.score ?? 0, quiz?.totalMarks ?? 0)}
              </span>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500">No quiz results found yet.</p>
      )}
    </div>
  );
};

export default DashboardQuizDetails;
