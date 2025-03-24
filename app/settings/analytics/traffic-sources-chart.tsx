"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Progress } from "@/components/ui/progress";

ChartJS.register(ArcElement, Tooltip, Legend);

// Custom Plugin to Draw Text in the Middle
const centerTextPlugin = {
  id: "centerText",
  beforeDraw: (chart: any) => {
    const { width, height, ctx } = chart;
    ctx.restore();

    const fontSize = (height / 120).toFixed(2);
    ctx.font = `${fontSize}em sans-serif`;
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#000"; // Text color

    const text = "Traffic\nsources";
    const textX = width / 2 - ctx.measureText("Traffic sources").width / 2;
    const textY = height / 2 + 10;

    ctx.fillText(text, textX, textY);
    ctx.save();
  },
};

// Chart Data
const data = {
  labels: ["Channel pages", "Direct or unknown", "Search", "External"],
  datasets: [
    {
      data: [37.5, 33.6, 11, 6],
      backgroundColor: ["#1565D8", "#5F9CF3", "#96B3FF", "#DCE4FF"],
      borderColor: ["#1565D8", "#5F9CF3", "#96B3FF", "#DCE4FF"],
      borderWidth: 0,
      cutout: "70%", // Creates ring effect
      circumference: 360, // Semi-circle
      rotation: 270, // Start from top
    },
  ],
};

// Chart Options
const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false, // Hide default legend
    },
  },
};

const TrafficSourcesChart = () => {
  return (
    <div className="w-full h-64 flex flex-col sm:flex-row items-center  bg-white">
      {/* Chart Container */}
      <div className="relative flex-1 h-64 flex items-center justify-center">
        <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
      </div>

      {/* Legend */}
      <div className="flex-1 flex flex-col text-sm ml-4">
        {data.labels.map((label, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-between w-full py-1 bg-red-500"
          >
            {label}
            <div className="flex flex-col">
              <Progress
                value={data.datasets[0].data[index]}
                className="flex flex-col w-full"
              />
              <span className="font-semibold">
                {data.datasets[0].data[index]}%
              </span>
            </div>
          </div>
        ))}
        <a href="#" className="text-blue-500 text-sm mt-2">
          See more
        </a>
      </div>
    </div>
  );
};

export default TrafficSourcesChart;
