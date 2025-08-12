import React from "react";
import QuizCard from "./QuizCard";
import useSWR from "swr";
import API from "../../../../utils/api";

const AllQuizes = () => {
  const swrFetcher = async (url) => {
    const response = await API.get(url);
    return response.data;
  };

  const { data, error, isLoading, mutate } = useSWR("/quizzes", swrFetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });

  if (isLoading) {
    return (
      <p>
        {isLoading && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-10">
            <div className="loader"></div>
          </div>
        )}
      </p>
    );
  }
  if (error) {
    return <p>{error?.response?.data?.message || "Something went wrong"}</p>;
  }

  console.log("data", data);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Quizzes</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.quizzes?.map((quiz) => (
          <QuizCard
            key={quiz._id}
            data={quiz}
            onDeleteSuccess={() => mutate()} // refresh quizzes from API
          />
        ))}
      </div>
    </div>
  );
};

export default AllQuizes;
