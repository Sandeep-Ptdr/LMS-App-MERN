import React from "react";
import Overview from "../../../components/dashboard/instructor/Overview";
import EarningsChart from "../../../components/charts/EarningChart";
import StudentList from "../../../components/dashboard/instructor/StudentList";
import useFetchData from "../../../hooks/useFetchData";
import { useEffect } from "react";

const InstructorDashboard = () => {
  const { data, loading, error, fetchData } = useFetchData();

  useEffect(() => {
    fetchData("/instructor", "GET");
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error?.data?.message || "an error occured"}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className=" max-w-[95%] m-auto">
        <Overview data={data} />

        <div className="mt-8">
          <EarningsChart />
        </div>

        <div className="mt-8">
          <StudentList data={data.courses} />
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
