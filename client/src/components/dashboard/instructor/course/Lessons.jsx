import React, { useEffect } from 'react'
import LessonCard from './LessonCard'
import useFetchData from '../../../../hooks/useFetchData'
import { useParams } from 'react-router-dom'

const Lessons = () => {

 const {data,loading,error,fetchData} = useFetchData()
 const params = useParams()


useEffect(() => {
   fetchData(`/instructor/course/${params.courseId}/lessons`,"GET")
}, [])


  return (
    <>
    {loading && <p>Loading...</p>}
    {error && <p>{error}</p>}
        {
          Array.isArray(data.lessons) && data.lessons.length > 0 ? (
            data.lessons.map((lesson) => <LessonCard  lesson={lesson} key={lesson._id}/> )
          ) : (!loading && !error && <p>No lessons found!</p>)

        }
       
    </>
  )
}

export default Lessons