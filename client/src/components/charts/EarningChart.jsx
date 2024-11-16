import React, { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useFetchData from '../../hooks/useFetchData';

const EarningsChart = () => {
  const {data, loading, error, fetchData} = useFetchData();

  useEffect(() => {
    fetchData("/instructor/earnings","GET")
  },[])

  if(loading) return <p>Loading...</p>
  if(error) return <p>{error?.data?.message || "an error occured"}</p>
  console.log('earnings',data)

 
  

  return (
    <div className="earnings-chart border-[1px] border-gray-300 p-1 rounded-md bg-gray-50">
      <h2 className="text-xl font-semibold text-gray-600 text-center mb-4">Earnings Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data.earnings}>
          <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="earnings" stroke="#2196F3" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EarningsChart;
