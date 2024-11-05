import React, { useEffect } from "react";
import CourseDetail from "../../../components/dashboard/instructor/course/CourseDetail";
import useFetchData from "../../../hooks/useFetchData";
import { useParams } from "react-router-dom";

const CourseDetailPage = () => {
  const { data, error, loading, fetchData } = useFetchData();
  const params = useParams();

  useEffect(() => {
    fetchData(`/instructor/course/${params.courseId}/detail`, "GET");
    console.log('data',data)
  }, [params.courseId]);

  if (loading) return <p>Loading...</p>;
  if (error)
    return <p>Error: {error?.data?.message || "Something went wrong"}</p>;
  

  return (
    <div className="w-full p-4">
      <div className=" max-w-[95%] m-auto">
        <CourseDetail data={data} />
      </div>
    </div>
  );
};

export default CourseDetailPage;
