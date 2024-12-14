import React, { useEffect } from 'react'
import QuizCardStudent from './QuizCardStudent'
import useFetchData from '../../../../hooks/useFetchData'

const AllQuizesStudent = () => {
     const {data, loading, error, fetchData} = useFetchData();


     useEffect(() => {
       fetchData('/student/quizzes', "GET")
     }, [])


     if(loading) return <p>Loading...</p>
     if(error) return console.log('error',error)
      console.log('data',data)
  return (
    <div className="container mx-auto px-4">
    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Quizes</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
       {
        data && data?.quizzes?.length > 0 ? (
          data?.quizzes?.map((quiz) => <QuizCardStudent key={quiz._id} data={quiz} />)
        ): (
          !loading && !error && <p>No quizzes found!</p>
        )
       }
        
       
    </div>
  </div>
  )
}

export default AllQuizesStudent