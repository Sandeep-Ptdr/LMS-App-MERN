import React from 'react'
import CourseDetail from '../../../components/dashboard/instructor/course/CourseDetail'

const CourseDetailPage = () => {
  const sampleCourse = {
    title: "React.js for Beginners",
    instructor: "John Doe",
    description: "Learn React.js from scratch in this comprehensive course.",
    totalStudents: 120,
    category: "Web Development",
    status: "Published",
    price: 29.99,
    lessons: [
      { title: "Introduction to React", duration: "10 min" },
      { title: "Components and Props", duration: "20 min" },
      { title: "State and Lifecycle", duration: "25 min" },
    ],
    students: [
      { name: "Alice", email: "alice@example.com" },
      { name: "Bob", email: "bob@example.com" },
    ],
    earnings: 3600,
  };


  return (
    <div className="w-full p-4">
      <div className=" max-w-[95%] m-auto">
         <CourseDetail course={sampleCourse}/>
      </div>
    </div>
  )
}

export default CourseDetailPage