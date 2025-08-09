import React, { useEffect, useState } from "react";
import useFetchData from "../../../../hooks/useFetchData";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Quiz = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { data, loading, error, fetchData } = useFetchData();
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState({
    correct: 0,
    wrong: 0,
    left: 0,
  });

  useEffect(() => {
    fetchData(`/student/course/lesson/quiz/${params.quizId}`, "GET");
  }, []);

  useEffect(() => {
    if (data?.quiz?.questions.length > 0) {
      setScore((prev) => ({
        ...prev,
        left: data?.quiz?.questions?.length,
      }));
    }
  }, [data]);

  const handleAnswer = (selectedOption) => {
    const currentQuestion = data?.quiz?.questions[currentQuestionIndex];
    setAnswers([...answers, selectedOption]);
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore((prev) => ({
        ...prev,
        correct: prev.correct + 1,
        left: prev.left - 1,
      }));
    } else {
      setScore((prev) => ({
        ...prev,
        wrong: prev.wrong + 1,
        left: prev.left - 1,
      }));
    }

    // Move to the next question
    if (currentQuestionIndex < data?.quiz?.questions?.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowSubmitButton(true);
    }
  };

  // Current question
  const currentQuestion = data?.quiz?.questions[currentQuestionIndex];

  const handleSubmit = () => {
    fetchData(`/quiz/${params.quizId}/submit`, "POST", { answers });
  };
  useEffect(() => {
    if (data.message === "Quiz submitted successfully") {
      toast.success("Quiz submitted successfully");
    }
  }, [data]);

  const calculatePercentage = (score, total) => {
    return ((score / total) * 100).toFixed(2);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return console.log("error in Quiz", error);
  console.log("single quiz data", data);

  return (
    <>
      <Toaster />
      <div className="container px-4 mx-auto">
        <h1 className="font-semibold text-2xl text-gray-700 mb-4">Quiz</h1>
        <div className=" border rounded-md shadow-md p-4 bg-gray-50">
          {currentQuestion ? (
            <>
              <div className="flex justify-between mb-6 text-center">
                <div>
                  <h1 className="text-xl font-bold text-gray-700">
                    {data?.quiz?.questions?.length}
                  </h1>
                  <p className="text-sm text-gray-500">Total</p>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-green-500">
                    {score.correct}
                  </h1>
                  <p className="text-sm text-gray-500">Correct</p>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-red-500">
                    {score.wrong}
                  </h1>
                  <p className="text-sm text-gray-500">Wrong</p>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-blue-500">
                    {score.left}
                  </h1>
                  <p className="text-sm text-gray-500">Left</p>
                </div>
              </div>

              <div className="border-t border-b py-4 mb-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  {currentQuestionIndex + 1}. {currentQuestion?.questionText}
                </h2>
                <div className="flex flex-col gap-2">
                  {currentQuestion?.options?.map((option, index) => (
                    <button
                      key={index}
                      className="w-full px-4 py-2 bg-gray-100 text-gray-700 border rounded hover:bg-gray-200"
                      onClick={() => handleAnswer(index + 1)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                {showSubmitButton && (
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-[#2196F3] text-gray-50 rounded hover:bg-[#1976D2]"
                  >
                    Submit
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              {console.log("quizdataaa", data)}
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Quiz Results
              </h2>
              <div className="flex justify-between mb-6 text-center">
                <div>
                  <h1 className="text-xl font-bold text-gray-700">
                    {data?.totalQuestions || 0}
                  </h1>
                  <p className="text-sm text-gray-500">Total Questions</p>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-green-500">
                    {score.correct || 0}
                  </h1>
                  <p className="text-sm text-gray-500">Correct</p>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-red-500">
                    {score.wrong || 0}
                  </h1>
                  <p className="text-sm text-gray-500">Wrong</p>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-blue-500">
                    {score.left || 0}
                  </h1>
                  <p className="text-sm text-gray-500">Unanswered</p>
                </div>
              </div>

              <div className="border-t border-b py-4 mb-4 text-center">
                <h2 className="text-lg font-semibold text-gray-700">
                  Your Score:{" "}
                  <span className="text-blue-500">
                    {data.score}/{data.totalQuestions}
                  </span>
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  Percentage:{" "}
                  <span className="font-bold text-green-500">
                    {calculatePercentage(score?.correct, data?.totalQuestions)}%
                  </span>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Quiz;
