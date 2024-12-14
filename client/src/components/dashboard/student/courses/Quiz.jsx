import React, { useEffect, useState } from "react";
import useFetchData from "../../../../hooks/useFetchData";
import { useParams } from "react-router-dom";

const Quiz = () => {

  const params = useParams();
  const { data, loading, error, fetchData } = useFetchData();
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([])
  const [score, setScore] = useState({
    correct: 0,
    wrong: 0,
    left: 0,
  });

  useEffect(() => {
    fetchData(`/student/course/lesson/quiz/${params.quizId}`, "GET");
  }, []);

  useEffect(() => {
    if(data?.quiz?.questions.length > 0){
      setScore((prev) => ({
        ...prev,
        left: data?.quiz?.questions?.length,
      }))
    }
  },[data])

  const handleAnswer = (selectedOption) => {
    const currentQuestion = data?.quiz?.questions[currentQuestionIndex];
     setAnswers([...answers, selectedOption])
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

  const handleSkip = () => {
    setScore((prev) => ({ ...prev, left: prev.left - 1 }));
    if (currentQuestionIndex < data?.quiz?.questions?.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert("Quiz finished!");
    }
  };

  // Current question
  const currentQuestion = data?.quiz?.questions[currentQuestionIndex];

  const handleSubmit = () => {
    console.log('answers', answers)
    fetchData(`/quiz/${params.quizId}/submit`, "POST", {answers} );
  }

  if (loading) return <p>Loading...</p>;
  if (error) return console.log("error in Quiz", error);
  console.log("single quiz data", data);

  return (
    <div className="container px-4 mx-auto">
      <h1 className="font-semibold text-2xl text-gray-700 mb-4">Quiz</h1>
      <div className=" border rounded-md shadow-md p-4 bg-gray-50">
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
            <h1 className="text-xl font-bold text-red-500">{score.wrong}</h1>
            <p className="text-sm text-gray-500">Wrong</p>
          </div>
          <div>
            <h1 className="text-xl font-bold text-blue-500">{score.left}</h1>
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
          {
            showSubmitButton ? (
              <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-[#2196F3] text-gray-50 rounded hover:bg-[#1976D2]"
              >
                Submit
              </button>
            ) : ''
          }
        </div>
      </div>
    </div>
  );
};

export default Quiz;
