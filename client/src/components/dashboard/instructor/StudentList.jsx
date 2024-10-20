import React from "react";

const StudentList = ({data}) => {
  return (
    <div className=" p-1 overflow-hidden w-full border-[1px] border-gray-300 rounded-md bg-gray-50">
      <h2 className="font-semibold text-xl text-center mb-2 text-gray-600">Students List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 border text-gray-700">Course Name</th>
              <th className="text-left px-4 py-2 border text-gray-700">Student Name</th>
              <th className="text-left px-4 py-2 border text-gray-700">Email ID</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{row.courseName}</td>
                <td className="border px-4 py-2">{row.studentName}</td>
                <td className="border px-4 py-2">{row.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;