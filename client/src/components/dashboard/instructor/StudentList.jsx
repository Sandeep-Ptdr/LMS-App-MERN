import React from "react";

const StudentList = ({data}) => {


  return (
    <div className=" p-1   w-full border-[1px] border-gray-300 rounded-md bg-gray-50">
      <h2 className="font-semibold text-xl text-center mb-2 text-gray-600">Students List</h2>

      <div className="overflow-x-auto h-96 ">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 border text-gray-700">Course Name</th>
              <th className="text-left px-4 py-2 border text-gray-700">Student Name</th>
              <th className="text-left px-4 py-2 border text-gray-700">Email ID</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((course, courseIndex) => course.enrolledStudents.map((student , studentIndex) => (
            <tr key={`${courseIndex}-${studentIndex}`} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{course.title}</td>
              <td className="border px-4 py-2">{student.name}</td>
              <td className="border px-4 py-2">{student.email}</td>
            </tr>
            )))}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 

export default StudentList;
