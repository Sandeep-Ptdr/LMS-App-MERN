import React, { useState } from "react";

const Quiz = () => {
  const questions = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: "Paris",
    },
    {
      id: 2,
      question: "Which language is primarily used for Android development?",
      options: ["Java", "Python", "C++"],
      correctAnswer: "Java",
    },
    {
      id: 3,
      question: "What does HTML stand for?",
      options: [
        "HyperText Markup Language",
        "HyperTransfer Markup Language",
        "HighText Marking Language",
      ],
      correctAnswer: "HyperText Markup Language",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState({
    correct: 0,
    wrong: 0,
    left: questions.length,
  });

  const handleAnswer = (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex];

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
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert("Quiz finished!");
    }
  };

  const handleSkip = () => {
    setScore((prev) => ({ ...prev, left: prev.left - 1 }));
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert("Quiz finished!");
    }
  };

  // Current question
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container px-4 mx-auto">
      <h1 className="font-semibold text-2xl text-gray-700 mb-4">Quiz</h1>
      <div className=" border rounded-md shadow-md p-4 bg-gray-50">
        
        <div className="flex justify-between mb-6 text-center">
          <div>
            <h1 className="text-xl font-bold text-gray-700">
              {questions.length}
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
            #{currentQuestion.id} {currentQuestion.question}
          </h2>
          <div className="flex flex-col gap-2">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 border rounded hover:bg-gray-200"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

         
        <div className="flex justify-between">
          <button
            onClick={handleSkip}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
