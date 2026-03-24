import React, { useEffect } from "react";
import QuizCardStudent from "./QuizCardStudent";
import useFetchData from "../../../../hooks/useFetchData";

const AllQuizesStudent = () => {
  const { data, loading, error, fetchData } = useFetchData();

  useEffect(() => {
    fetchData("/student/quizzes", "GET");
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error?.data?.message || error?.message}</p>;
  return (
    <div className="container mx-auto px-4">
      <h2 className="mb-4 text-2xl font-semibold text-gray-700">Quizzes</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {
        data && data?.quizzes?.length > 0 ? (
          data?.quizzes?.map((quiz) => <QuizCardStudent key={quiz._id} data={quiz} />)
        ): (
          !loading && !error && <p className="text-sm font-medium text-gray-500">No quizzes found!</p>
        )
        }
      </div>
    </div>
  );
};

export default AllQuizesStudent;
