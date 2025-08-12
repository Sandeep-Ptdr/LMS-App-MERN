import React, { useEffect } from "react";
import useFetchData from "../../../../hooks/useFetchData";

const QuizCard = ({ data, onDeleteSuccess }) => {
  const { data: quizDeleteRes, loading, error, fetchData } = useFetchData();

  const handleQuizDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this quiz?"
    );
    if (confirmDelete) {
      fetchData(`/delete/quiz/${id}`, "DELETE");
    }
  };

  // Handle post-delete actions
  useEffect(() => {
    if (quizDeleteRes?.success) {
      alert("Quiz deleted successfully!");
      if (onDeleteSuccess) {
        onDeleteSuccess(); // remove from list in parent
      }
    }
  }, [quizDeleteRes, onDeleteSuccess, data?._id]);

  useEffect(() => {
    if (error) {
      alert("Error deleting quiz: " + error);
    }
  }, [error]);

  return (
    <div className="bg-gray-50 rounded-md shadow-md p-4 w-full relative">
      {loading && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-10">
          <div className="loader"></div>
        </div>
      )}

      <h3 className="text-lg font-semibold text-gray-600">
        {data?.title || "None"}
      </h3>
      <p className="text-sm text-gray-500">
        Course: {data?.course?.title || "None"}
      </p>
      <p className="text-sm text-gray-500">
        Lesson: {data?.lesson?.title || "None"}
      </p>

      <button
        onClick={() => handleQuizDelete(data._id)}
        className="mt-4 bg-[#2196F3] text-gray-50 text-base font-medium px-2 py-1 rounded-md hover:bg-[#1976D2]"
      >
        Delete Quiz
      </button>
    </div>
  );
};

export default QuizCard;
