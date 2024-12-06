import React, { useState } from "react";
import useFetchData from "../../../../hooks/useFetchData";
import { useParams } from "react-router-dom";

const CreateQuiz = () => {
  const params = useParams();
  const [quizData, setQuizData] = useState({
    title: "",
    questions: [],
  });

  const { data, loading, error, fetchData } = useFetchData();

  const addQuestion = () => {
    setQuizData((prevState) => ({
      ...prevState,
      questions: [
        ...prevState.questions,
        {
          id: Date.now(),
          questionText: "",
          options: ["", "", "", ""],
          correctAnswer: "",
          marks: 1,
        },
      ],
    }));
  };

  const updateQuestion = (id, field, value) => {
    const updatedQuestions = quizData.questions.map((question) =>
      question.id === id ? { ...question, [field]: value } : question
    );
    setQuizData((prevState) => ({ ...prevState, questions: updatedQuestions }));
  };

  const updateOption = (id, optionIndex, value) => {
    const updatedQuestions = quizData.questions.map((question) =>
      question.id === id
        ? {
            ...question,
            options: question.options.map((opt, idx) =>
              idx === optionIndex ? value : opt
            ),
          }
        : question
    );
    setQuizData((prevState) => ({ ...prevState, questions: updatedQuestions }));
  };

  const removeQuestion = (id) => {
    const filteredQuestions = quizData.questions.filter(
      (question) => question.id !== id
    );
    setQuizData((prevState) => ({
      ...prevState,
      questions: filteredQuestions,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchData(
      `/instructor/course/lesson/${params.lessonId}/quiz/create`,
      "POST",
      quizData
    );

    if (loading) return <p>Loading...</p>;
    if (error) {
      console.log("error in quiz", error);
    }

    if (data) {
      console.log(data);
    }
  };
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Create a Quiz</h2>

      <div className="w-full rounded-md bg-gray-50  p-4">
        <form onSubmit={handleSubmit}>
          {/* Quiz Title */}
          <div className="mb-4">
            <label className="block font-medium text-gray-600 mb-1">
              Quiz Title:
            </label>
            <input
              required
              type="text"
              placeholder="Enter quiz title"
              className="w-full p-2 border rounded outline-none focus:border-[#2196F3] "
              value={quizData.title}
              onChange={(e) =>
                setQuizData({ ...quizData, title: e.target.value })
              }
            />
          </div>

          {/* Questions Section */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2 text-gray-600">Questions</h3>
            <button
              type="button"
              className=" bg-[#2196F3] mb-1 text-gray-50 text-base font-medium px-4 py-2 rounded"
              onClick={addQuestion}
            >
              + Add Question
            </button>
            {quizData.questions.map((question, index) => (
              <div key={question.id} className="mb-4 p-4 border rounded">
                <label className="block font-medium text-gray-600">
                  Question {index + 1}
                </label>
                <input
                  type="text"
                  placeholder="Enter question text"
                  className="w-full p-2 border rounded mb-2 outline-none focus:border-[#2196F3] "
                  value={question.questionText}
                  onChange={(e) =>
                    updateQuestion(question.id, "questionText", e.target.value)
                  }
                />
                <label className="block font-medium text-gray-600">
                  Options
                </label>
                {question.options.map((option, idx) => (
                  <input
                    key={idx}
                    type="text"
                    placeholder={`Option ${idx + 1}`}
                    className="w-full p-2 border rounded mb-2 outline-none focus:border-[#2196F3] "
                    value={option}
                    onChange={(e) =>
                      updateOption(question.id, idx, e.target.value)
                    }
                  />
                ))}
                <label className="block font-medium">Correct Answer</label>
                <select
                  className="w-full p-2 border rounded mb-2 outline-none focus:border-[#2196F3] "
                  value={question.correctAnswer}
                  onChange={(e) =>
                    updateQuestion(question.id, "correctAnswer", e.target.value)
                  }
                >
                  <option value="">Select Correct Option</option>
                  {question.options.map((_, idx) => (
                    <option key={idx} value={idx + 1}>
                      Option {idx + 1}
                    </option>
                  ))}
                </select>

                <label
                  htmlFor="marks"
                  className="block font-medium text-gray-600"
                >
                  Marks:
                </label>
                <input
                  type="number"
                  id="marks"
                  className="w-full p-2 border border-gray-300 rounded mb-2 outline-none focus:border-[#2196F3] "
                  value={question.marks}
                  onChange={(e) =>
                    updateQuestion(question.id, "marks", e.target.value)
                  }
                />

                <button
                  type="button"
                  className="text-red-500 underline"
                  onClick={() => removeQuestion(question.id)}
                >
                  Remove Question
                </button>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="bg-green-500 text-gray-50 text-base font-medium px-4 py-2 rounded"
          >
            Create Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;
