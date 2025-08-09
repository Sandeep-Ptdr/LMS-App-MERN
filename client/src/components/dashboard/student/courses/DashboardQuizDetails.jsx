import React from "react";
import useSWR from "swr";
import API from "../../../../utils/api";

const DashboardQuizDetails = () => {
  // SWR fetcher using your API instance
  const swrFetcher = async (url) => {
    const response = await API.get(url);
    return response.data; // make sure to return only the data
  };

  const { data, error, isLoading } = useSWR(
    "/student/quizzes-result",
    swrFetcher,
    { revalidateOnFocus: false,  revalidateIfStale: false }
  );

  if (isLoading) return <p className="text-gray-500">Loading quizzes...</p>;
  if (error) return <p className="text-red-500">Error loading quizzes</p>;

  const quizResults = data?.quizResults || [];
  console.log("quizResults", quizResults);

  return (
    <div className="space-y-3">
      {quizResults.length > 0 ? (
        quizResults.map((quiz, index) => (
          <div
            key={quiz._id || index}
            className="flex justify-between items-center border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow bg-white"
          >
            <div>
              <h1 className="text-lg font-semibold text-gray-800">
                {quiz?.quiz?.title || "Untitled Quiz"}
              </h1>
              <span className="flex gap-1 text-sm">
                <p className="text-gray-600">Course:</p>
                <p className="text-gray-800 font-medium">
                  {quiz?.course || "Unknown Course"}
                </p>
              </span>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-sm text-gray-500">Score</span>
              <span className="text-xl font-bold text-gray-700">
                {quiz?.score ?? "-"}
              </span>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No quizzes found</p>
      )}
    </div>
  );
};

export default DashboardQuizDetails;
