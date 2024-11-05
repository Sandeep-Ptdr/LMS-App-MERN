import React  from "react";
import Overview from "../../../components/dashboard/instructor/Overview";
import EarningsChart from "../../../components/charts/EarningChart";
import StudentList from "../../../components/dashboard/instructor/StudentList";
import useFetchData from "../../../hooks/useFetchData";
import { useEffect } from "react";

const earningsData = [
  { month: "Jan", earnings: 4030 },
  { month: "Feb", earnings: 3000 },
  { month: "Mar", earnings: 5030 },
  { month: "Apr", earnings: 2000 },
  { month: "May", earnings: 4050 },
  { month: "Jun", earnings: 3500 },
  { month: "Jul", earnings: 5000 },
  { month: "Aug", earnings: 7000 },
  { month: "Sep", earnings: 4500 },
  { month: "Oct", earnings: 9000 },
  { month: "Nov", earnings: 9550 },
  { month: "Dec", earnings: 3500 },
];

const studentData = [
  { courseName: 'React for Beginners', studentName: 'John Doe', email: 'john.doe@example.com' },
  { courseName: 'Advanced Node.js', studentName: 'Jane Smith', email: 'jane.smith@example.com' },
  { courseName: 'CSS Mastery', studentName: 'Bob Johnson', email: 'bob.johnson@example.com' },
];

const InstructorDashboard = () => {

  

  const {data, loading, error, fetchData} = useFetchData();

  useEffect(() => {
      fetchData("/instructor","GET")
  },[])

  if(loading) return <p>Loading...</p>
  if(error) return <p>{error?.data?.message || "an error occured"}</p>
   

   
  
   
  
  



  return (
    <div className="container mx-auto p-4">
      <div className=" max-w-[95%] m-auto">
        <Overview data={data}  />

        <div className="mt-8">
          <EarningsChart data={earningsData}   />
        </div>

        <div className="mt-8">
          <StudentList data={data.courses} />
        </div>

      </div>
    </div>
  );
};

export default InstructorDashboard;
