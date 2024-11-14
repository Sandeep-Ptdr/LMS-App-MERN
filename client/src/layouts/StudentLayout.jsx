 import React from 'react'
import Student from '../components/sidebars/Student'
import Header from '../components/common/Header'
import StudentDashboard from '../pages/dashboard/studentDashboard/StudentDashboard'
import { Outlet } from 'react-router-dom'
 
 const StudentLayout = () => {
   return (
    <>
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
      {/* sidebar */}
        <Student /> 

        <main className="flex flex-1 overflow-y-auto w-[calc(100vw-256px)] bg-gray-200">
          <Outlet />
           
        </main>
      </div>
    </div>
  </>
   )
 }
 
 export default StudentLayout