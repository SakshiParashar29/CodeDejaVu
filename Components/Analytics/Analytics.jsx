import React, { useState, useEffect } from 'react';
import { Line } from "react-chartjs-2";
import axios from 'axios';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const sheets = [
    { name: "Striver's Sheet", link: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2", humour: "Recommended dosage: 2 problems daily… overdose at your own risk.", action: "Grind Time", color: "bg-pink-100" },
    { name: "Love Babbar Sheet", link: "https://www.geeksforgeeks.org/explore?page=1&sprint=94ade6723438d94ecf0c00c3937dad55&sortBy=submissions&sprint_name=Love%20Babbar%20Sheet", humour: "Warning: Side effects may include headaches and existential dread.", action: "Bring It On", color: "bg-yellow-100" },
    { name: "CSES Problem Set", link: "https://cses.fi/problemset/", humour: "Because sleep is for the weak.", action: "No Sleep Mode", color: "bg-green-100" },
    { name: "GFG 160", link: "https://www.geeksforgeeks.org/courses/gfg-160-series", humour: "If found crying, please return to Stack Overflow.", action: "Cry & Conquer", color: "bg-blue-100" },
    { name: "LeetCode 150", link: "https://leetcode.com/studyplan/top-interview-150/", humour: "The best way to ruin a perfectly good evening.", action: "Evening Killer", color: "bg-purple-100" },
    { name: "LeetCode 100 Liked", link: "https://leetcode.com/studyplan/top-100-liked/", humour: "Turning coffee into bugs since day one.", action: "Bug Factory", color: "bg-red-100" },
    { name: "Blind 75", link: "https://leetcode.com/problem-list/oizxjoit/", humour: "Because nothing screams 'prepared' like panic-solving at 2 AM.", action: "Panic Mode", color: "bg-orange-100" }
  ];
const options = {
    scales: {
      y: {
        beginAtZero: true  
      }
    }
  };
 const [graphData, setGraphData] = useState({
    labels: [],  
    datasets: [
      {
        label: "Problems Solved",
        data: [],   
        borderColor: "green",
        backgroundColor: "rgba(72, 187, 120, 0.2)",
        fill: false,
        tension: 0.3,
      }
    ]
  });

  useEffect(() => {
    const fetchGraph = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://code-deja-vu.vercel.app/api/heat-map', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const monthArr = res.data.data; 
        const days = monthArr.map((_, index) => index + 1);

        setGraphData({
          labels: days,
          datasets: [
            {
              label: "Sleep-to-Bugs Ratio",
              data: monthArr,
              borderColor: "green",
              backgroundColor: "rgba(72, 187, 120, 0.2)",
              fill: false,
              tension: 0.3,
            }
          ]
        });

      } catch (error) {
        console.log("Something went wrong!!", error);
      }
    };

    fetchGraph();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
      <div className="bg-white p-4 m-4 rounded-lg">
        <h2 className="text-2xl text-blue-700 font-semibold text-center mb-2">
          Pain Pattern over Time!!
        </h2>
        <Line data={graphData} options={options} width={450} height={150} />
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md shadow-sm mb-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-yellow-800 text-center">
          Coding sheets:{" "}
          <span className="italic text-xl text-gray-700">
            "Because scrolling Instagram won't get you a job."
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {sheets.map((sheet, index) => (
          <div key={index} className={`${sheet.color} shadow-md rounded-lg p-6 flex flex-col items-center hover:shadow-lg transition-shadow w-full`}>
            <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{sheet.name}</h3>
            <a href={sheet.link} target="_blank" rel="noopener noreferrer" className="text-blue-700 font-semibold hover:underline mb-3">{sheet.action}</a>
            <p className="italic text-gray-700 text-center text-sm">{sheet.humour}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
