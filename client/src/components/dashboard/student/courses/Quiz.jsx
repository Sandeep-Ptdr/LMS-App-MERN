import React, { useEffect, useMemo, useState } from "react";
import useFetchData from "../../../../hooks/useFetchData";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import API from "../../../../utils/api";

const Quiz = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { data, loading, error, fetchData } = useFetchData();
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData(`/student/course/lesson/quiz/${params.quizId}`, "GET");
  }, [params.quizId]);

  useEffect(() => {
    if (data?.quiz) {
      setQuizData(data.quiz);
      setAnswers(new Array(data.quiz.questions?.length || 0).fill(null));
      setCurrentQuestionIndex(0);
      setSubmissionResult(null);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || error?.message || "Something went wrong");
    }
  }, [error]);

  const questions = quizData?.questions || [];
  const totalQuestions = questions.length;

  const stats = useMemo(() => {
    let answered = 0;

    questions.forEach((question, index) => {
      const answer = answers[index];

      if (answer == null) return;

      answered += 1;
    });

    return {
      correct: 0,
      wrong: 0,
      left: Math.max(totalQuestions - answered, 0),
      answered,
    };
  }, [answers, questions, totalQuestions]);

  const showSubmitButton = totalQuestions > 0 && stats.answered === totalQuestions;

  const handleAnswer = (selectedOption) => {
    if (!questions[currentQuestionIndex] || submissionResult) {
      return;
    }

    setAnswers((prev) => {
      const nextAnswers = [...prev];
      nextAnswers[currentQuestionIndex] = selectedOption;
      return nextAnswers;
    });
  };

  const currentQuestion = questions[currentQuestionIndex];

  const handleSubmit = async () => {
    if (!showSubmitButton || submitting) {
      return;
    }

    try {
      setSubmitting(true);
      const response = await API.post(`/quiz/${params.quizId}/submit`, { answers });
      setSubmissionResult(response.data);
      toast.success(response?.data?.message || "Quiz submitted successfully");
    } catch (submitError) {
      toast.error(
        submitError?.response?.data?.message || submitError?.message || "Failed to submit quiz"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const calculatePercentage = (score, total) => {
    if (!total) return "0.00";
    return ((score / total) * 100).toFixed(2);
  };

  const resultCorrect = submissionResult?.correctAnswers ?? stats.correct ?? 0;
  const resultWrong = submissionResult?.wrongAnswers ?? stats.wrong ?? 0;
  const resultLeft = submissionResult?.unansweredAnswers ?? stats.left ?? 0;
  const resultScore = submissionResult?.score || 0;
  const resultTotalMarks =
    submissionResult?.totalMarks ||
    questions.reduce((sum, question) => sum + (question?.marks || 1), 0);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container px-4 mx-auto">
        <h1 className="font-semibold text-2xl text-gray-700 mb-4">Quiz</h1>
        <div className=" border rounded-md shadow-md p-4 bg-gray-50">
          {!submissionResult && currentQuestion ? (
            <>
              <div className="flex justify-between mb-6 text-center">
                <div>
                  <h1 className="text-xl font-bold text-gray-700">
                    {totalQuestions}
                  </h1>
                  <p className="text-sm text-gray-500">Total</p>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-green-500">
                    -
                  </h1>
                  <p className="text-sm text-gray-500">Correct</p>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-red-500">
                    -
                  </h1>
                  <p className="text-sm text-gray-500">Wrong</p>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-blue-500">
                    {stats.left}
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
                      className={`w-full rounded border px-4 py-2 text-left text-gray-700 transition ${
                        answers[currentQuestionIndex] === index + 1
                          ? "border-[#2196F3] bg-blue-50"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
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
                    disabled={submitting}
                    className="px-4 py-2 bg-[#2196F3] text-gray-50 rounded hover:bg-[#1976D2] disabled:cursor-not-allowed disabled:bg-blue-300"
                  >
                    {submitting ? "Submitting..." : "Submit"}
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Quiz Results
              </h2>
              <div className="flex justify-between mb-6 text-center">
                <div>
                  <h1 className="text-xl font-bold text-gray-700">
                    {submissionResult?.totalQuestions || totalQuestions}
                  </h1>
                  <p className="text-sm text-gray-500">Total Questions</p>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-green-500">
                    {resultCorrect}
                  </h1>
                  <p className="text-sm text-gray-500">Correct</p>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-red-500">
                    {resultWrong}
                  </h1>
                  <p className="text-sm text-gray-500">Wrong</p>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-blue-500">
                    {resultLeft}
                  </h1>
                  <p className="text-sm text-gray-500">Unanswered</p>
                </div>
              </div>

              <div className="border-t border-b py-4 mb-4 text-center">
                <h2 className="text-lg font-semibold text-gray-700">
                  Your Score:{" "}
                  <span className="text-blue-500">
                    {resultScore}/{resultTotalMarks}
                  </span>
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  Percentage:{" "}
                  <span className="font-bold text-green-500">
                    {calculatePercentage(
                      resultScore,
                      resultTotalMarks
                    )}%
                  </span>
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-[#2196F3] text-white rounded hover:bg-[#1976D2]"
                  onClick={() => navigate(-1)}
                >
                  Back
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Quiz;
