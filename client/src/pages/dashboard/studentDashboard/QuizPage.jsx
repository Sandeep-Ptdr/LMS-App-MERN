import React from 'react'
import Quiz from '../../../components/dashboard/student/courses/Quiz'

const QuizPage = () => {
    const quizData = {
        title: "JavaScript Basics Quiz",
        questions: [
          {
            id: "1",
            question: "What is the output of `console.log(typeof null)`?",
            options: ["null", "object", "undefined", "string"],
            correctAnswer: "object" // For backend validation, not shown to students
          },
          {
            id: "2",
            question: "Which method is used to add an element at the end of an array?",
            options: ["push()", "pop()", "shift()", "unshift()"],
            correctAnswer: "push()"
          },
          {
            id: "3",
            question: "What is the result of `NaN === NaN` in JavaScript?",
            options: ["true", "false", "undefined", "NaN"],
            correctAnswer: "false"
          },
          {
            id: "4",
            question: "Which of the following is NOT a JavaScript data type?",
            options: ["String", "Number", "Boolean", "Float"],
            correctAnswer: "Float"
          },
          {
            id: "5",
            question: "Which symbol is used for comments in JavaScript?",
            options: [
              "/* */ for single-line comments",
              "// for single-line comments",
              "<!-- --> for single-line comments",
              "' ' for single-line comments"
            ],
            correctAnswer: "// for single-line comments"
          }
        ]
      };
      
  return (
    <div className="w-full p-4">
    <div className=" max-w-[95%] m-auto">
        <Quiz quiz={quizData}/>
    </div>
  </div>
  )
}

export default QuizPage