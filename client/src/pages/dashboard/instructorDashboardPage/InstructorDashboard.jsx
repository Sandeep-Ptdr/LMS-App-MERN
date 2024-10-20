import React from "react";
import Overview from "../../../components/dashboard/instructor/Overview";
import EarningsChart from "../../../components/charts/EarningChart";
import StudentList from "../../../components/dashboard/instructor/StudentList";

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

const data = [
  { courseName: 'React for Beginners', studentName: 'John Doe', email: 'john.doe@example.com' },
  { courseName: 'Advanced Node.js', studentName: 'Jane Smith', email: 'jane.smith@example.com' },
  { courseName: 'CSS Mastery', studentName: 'Bob Johnson', email: 'bob.johnson@example.com' },
];

const InstructorDashboard = () => {
  return (
    <div className="w-full p-4">
      <div className=" max-w-[95%] m-auto">
        <Overview />

        <div className="mt-8">
          <EarningsChart data={earningsData} />
        </div>

        <div className="mt-8">
          <StudentList data={data}/>
        </div>

      </div>
    </div>
  );
};

export default InstructorDashboard;
