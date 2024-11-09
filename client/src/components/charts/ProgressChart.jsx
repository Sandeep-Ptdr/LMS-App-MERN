import React from 'react'
import { Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts'

const ProgressChart = () => {
    const data = [
        {
          "subject": "Math",
          "A": 100,
          "B": 110,
          "fullMark": 150
        },
        {
          "subject": "Chinese",
          "A": 98,
          "B": 130,
          "fullMark": 150
        },
        {
          "subject": "English",
          "A": 86,
          "B": 130,
          "fullMark": 150
        },
        {
          "subject": "Geography",
          "A": 99,
          "B": 100,
          "fullMark": 150
        },
        {
          "subject": "Physics",
          "A": 85,
          "B": 90,
          "fullMark": 150
        },
        {
          "subject": "History",
          "A": 65,
          "B": 85,
          "fullMark": 150
        },
        {
          "subject": "Commerce",
          "A": 80,
          "B": 85,
          "fullMark": 150
        },
         
      ]
     
      
  return (
    <div className="border-[1px] border-gray-300 p-4 rounded-md bg-gray-50 shadow-lg max-w-md ">
      <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6 ">
        Progress Overview
      </h2>
      
      <div className="flex justify-center">
        <ResponsiveContainer width="100%" aspect={1.5}>
          <RadarChart outerRadius={120} data={data}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: "#4b5563", fontSize: 12, fontWeight: 500 }}
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              tick={{ fill: "#6b7280" }} 
            />
            <Radar 
              name="Progress" 
              dataKey="A" 
              stroke="#2196F3" 
              fill="#2196F3" 
              fillOpacity={0.6} 
            />
            {/* <Legend verticalAlign="top" height={36} /> */}
            <Tooltip contentStyle={{ backgroundColor: "#f3f4f6", borderColor: "#d1d5db" }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ProgressChart