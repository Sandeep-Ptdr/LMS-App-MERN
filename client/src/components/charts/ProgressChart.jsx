import React, { useEffect } from 'react'
import { Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts'
import useFetchData from '../../hooks/useFetchData';

import toast,{Toaster} from 'react-hot-toast';

const ProgressChart = () => {
     
  const {data, laoding, error, fetchData} = useFetchData(); 

  useEffect(() => {
    
    fetchData('student/progress', "GET");
    

  }, [])

  if(laoding) return <p>Loading...</p>
  if(error) return  <p>{error?.data?.message || error?.message}</p>
  
    const chartData = data?.progress?.map((item) => ({
      course : item.course.title,
      progress : item.progress
    }))
  
     
      
  return (
    
    <div className="border-[1px] border-gray-300 p-4 rounded-md bg-gray-50 shadow-lg max-w-md ">
      <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6 ">
        Progress Overview
      </h2>
      
      <div className="flex justify-center">
        <ResponsiveContainer width="100%" aspect={1.5}>
          <RadarChart outerRadius={120} data={chartData}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis 
              dataKey="course" 
              tick={{ fill: "#4b5563", fontSize: 12, fontWeight: 500 }}
            />
            {/* <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              tick={{ fill: "#6b7280" }} 
            /> */}
            <Radar 
              name="Progress"
              dataKey="progress"
              stroke="#2196F3" 
              fill="#2196F3" 
              fillOpacity={0.3} 
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