import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Dummy data for 10 students
const dummyData = [
  { day: 1, job: 1, internship: 1, higherEducation: 1, entrepreneurship: 0, notPlaced: 47 },
  { day: 2, job: 3, internship: 1, higherEducation: 1, entrepreneurship: 1, notPlaced: 45 },
  { day: 3, job: 4, internship: 2, higherEducation: 2, entrepreneurship: 1, notPlaced: 42 },
  { day: 4, job: 5, internship: 2, higherEducation: 2, entrepreneurship: 1, notPlaced: 40 },
  { day: 5, job: 6, internship: 3, higherEducation: 3, entrepreneurship: 1, notPlaced: 37 },
  { day: 6, job: 8, internship: 3, higherEducation: 3, entrepreneurship: 2, notPlaced: 35 },
  { day: 7, job: 9, internship: 4, higherEducation: 4, entrepreneurship: 2, notPlaced: 32 },
  { day: 8, job: 10, internship: 4, higherEducation: 4, entrepreneurship: 2, notPlaced: 30 },
  { day: 9, job: 11, internship: 5, higherEducation: 5, entrepreneurship: 2, notPlaced: 27 },
  { day: 10, job: 13, internship: 5, higherEducation: 5, entrepreneurship: 3, notPlaced: 25 },
  { day: 11, job: 14, internship: 6, higherEducation: 6, entrepreneurship: 3, notPlaced: 22 },
  { day: 12, job: 15, internship: 6, higherEducation: 6, entrepreneurship: 3, notPlaced: 20 },
  { day: 13, job: 16, internship: 7, higherEducation: 7, entrepreneurship: 3, notPlaced: 17 },
  { day: 14, job: 18, internship: 7, higherEducation: 7, entrepreneurship: 4, notPlaced: 15 },
  { day: 15, job: 19, internship: 8, higherEducation: 8, entrepreneurship: 4, notPlaced: 12 },
  { day: 16, job: 20, internship: 8, higherEducation: 8, entrepreneurship: 4, notPlaced: 10 },
  { day: 17, job: 21, internship: 9, higherEducation: 9, entrepreneurship: 4, notPlaced: 7 },
  { day: 18, job: 23, internship: 9, higherEducation: 9, entrepreneurship: 5, notPlaced: 5 },
  { day: 19, job: 24, internship: 10, higherEducation: 10, entrepreneurship: 5, notPlaced: 2 },
  { day: 20, job: 25, internship: 10, higherEducation: 10, entrepreneurship: 5, notPlaced: 2 },
];

const COLORS = {
  job: "#8884d8",
  internship: "#82ca9d",
  higherEducation: "#ffc658",
  entrepreneurship: "#ff7300",
  notPlaced: "#d0021b",
};

const StudentCareerChart: React.FC = () => {
  const [currentDay, setCurrentDay] = useState(1);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentDay(Number(event.target.value));
  };

  const currentData = dummyData.find((data) => data.day === currentDay) || dummyData[0];

  const chartData = [
    { name: "Job", value: currentData.job, fill: COLORS.job },
    { name: "Internship", value: currentData.internship, fill: COLORS.internship },
    { name: "Higher Education", value: currentData.higherEducation, fill: COLORS.higherEducation },
    { name: "Entrepreneurship", value: currentData.entrepreneurship, fill: COLORS.entrepreneurship },
    { name: "Not Placed", value: currentData.notPlaced, fill: COLORS.notPlaced },
  ];

  return (
    <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Student Career Progression</h2>
      <div style={{ width: "100%", height: "400px" }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 50]} tickCount={6} />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ marginTop: "20px" }}>
        <p style={{ textAlign: "center", marginBottom: "10px" }}>Day: {currentDay}</p>
        <input
          type="range"
          min={1}
          max={20}
          value={currentDay}
          onChange={handleSliderChange}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
}

export default StudentCareerChart;
