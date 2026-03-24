import React, { useMemo } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const ProgressChart = ({ progressData = [], loading = false, error = null }) => {
  const chartData = useMemo(
    () =>
      (progressData || []).map((item) => ({
        course:
          item?.course?.title?.length > 16
            ? `${item.course.title.slice(0, 16)}...`
            : item?.course?.title || "Untitled",
        progress: Number(item?.progress || 0),
      })),
    [progressData]
  );

  return (
    <div className="min-w-full rounded-md border border-gray-300 bg-gray-50 p-4 shadow-lg md:h-[375px]">
      <h2 className="mb-6 text-center text-2xl font-semibold text-gray-700">
        Progress Overview
      </h2>

      {loading ? (
        <div className="flex h-[260px] items-center justify-center">
          <p className="text-sm text-gray-500">Loading progress...</p>
        </div>
      ) : error ? (
        <div className="flex h-[260px] items-center justify-center">
          <p className="text-sm text-red-500">
            {error?.data?.message || error?.message || "Failed to load progress"}
          </p>
        </div>
      ) : chartData.length === 0 ? (
        <div className="flex h-[260px] items-center justify-center">
          <p className="text-sm text-gray-500">
            No progress data available yet.
          </p>
        </div>
      ) : (
        <div className="flex h-[260px] justify-center">
          <ResponsiveContainer width="100%" height="100%">
          <RadarChart outerRadius={120} data={chartData}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis
              dataKey="course"
              tick={{ fill: "#4b5563", fontSize: 12, fontWeight: 500 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: "#6b7280", fontSize: 11 }}
            />
            <Radar
              name="Progress"
              dataKey="progress"
              stroke="#2196F3"
              fill="#2196F3"
              fillOpacity={0.3}
            />
            <Tooltip contentStyle={{ backgroundColor: "#f3f4f6", borderColor: "#d1d5db" }} />
          </RadarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default ProgressChart;
