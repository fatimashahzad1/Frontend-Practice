'use client';
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export const data = {
  labels: ['Text', 'Images', 'Documents', 'Videos'],
  datasets: [
    {
      label: '# of Votes',
      data: [32, 25, 22, 11],
      backgroundColor: ['#1565D8', '#5F9CF3', '#96B3FF', '#F572B9'],
      borderColor: ['#1565D8', '#5F9CF3', '#96B3FF', '#F572B9'],
      borderWidth: 1,
      borderRadius: 100,
      spacing: 10,
      weight: 1,
    },
  ],
};

const options = {
  cutout: '80%', // Controls the thickness of the doughnut ring
  responsive: true,
  plugins: {
    legend: {
      position: 'right' as const,
      labels: {
        usePointStyle: true,
        boxWidth: 8,
        padding: 20,
      },
    },
    datalabels: {
      display: false,
      // color: 'red',
      // font: {
      //     weight: 'bold',
      //     size: 14,
      // },
      // formatter: (value, context) => {
      //     const total = context.dataset.data.reduce(
      //         (acc, val) => acc + val,
      //         0
      //     );
      //     return ((value / total) * 100).toFixed(0) + '%';
      // },
    },
  },
};

// Custom Plugin to Draw Text in the Center
const centerTextPlugin = {
  id: 'centerText',
  beforeDraw: (chart: any) => {
    const { width } = chart;
    const { height } = chart;
    const ctx = chart.ctx;
    ctx.restore();

    // Set text properties
    const fontSize = (height / 100).toFixed(2);
    ctx.font = `${fontSize}em sans-serif`;
    ctx.textBaseline = 'middle';

    // Define the text
    const text = '90';
    const textX = Math.round((width - ctx.measureText(text).width) / 2);
    const textY = height / 2;

    ctx.fillStyle = '#000'; // Text color
    ctx.fillText(text, textX, textY);
    ctx.save();
  },
};
const Recycled = () => {
  return (
    <div className="w-full h-64  flex items-center justify-center">
      <Doughnut data={data} options={options} plugins={{ centerTextPlugin }} />
      {/* <div className="z-100 absolute left-1/4 text-center">
                <p className="text-sm text-gray-600 font-medium">Total</p>
                <p className="text-lg font-bold text-black">47.1K</p>
            </div> */}
    </div>
  );
};

export default Recycled;
