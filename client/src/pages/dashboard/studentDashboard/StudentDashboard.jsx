import React, { useEffect } from 'react'
import DashboardOverview from '../../../components/dashboard/student/DashboardOverview'
import useFetchData from '../../../hooks/useFetchData'

const StudentDashboard = () => {
  
   const {data,loading,error,fetchData}= useFetchData()

  useEffect(() => {

    fetchData('/student','GET')

  },[])

  if(loading) return <p>Loading...</p>
  if(error) return <p>{error?.data?.message || "an error occured"}</p>

  return (
    <div className="container mx-auto p-4">
      <div className=" max-w-[95%] m-auto">
         <DashboardOverview  data={data}/>
      </div>
    </div>
  )
}

export default StudentDashboard