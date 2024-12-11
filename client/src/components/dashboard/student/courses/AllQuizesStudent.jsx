import React from 'react'
import QuizCardStudent from './QuizCardStudent'

const AllQuizesStudent = () => {
     
  return (
    <div className="container mx-auto px-4">
    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Quizes</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
       <QuizCardStudent />
       <QuizCardStudent />  
       
    </div>
  </div>
  )
}

export default AllQuizesStudent