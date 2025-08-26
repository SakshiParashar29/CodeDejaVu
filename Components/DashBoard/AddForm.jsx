import React, { useState } from "react";
import axios from 'axios'

const AddForm = ({ onAction }) => {
  // Generate random activity levels for 30 days
  // const heatMap = Array.from({ length: 95}, () =>
  //   Math.floor(Math.random() * 5)
  // );

  // Map activity level to Tailwind color classes
  // const getLevel = (level) => {
  //   switch (level) {
  //     case 0:
  //       return "bg-gray-200"; // No activity
  //     case 1:
  //       return "bg-green-200"; // Low
  //     case 2:
  //       return "bg-green-400"; // Medium
  //     case 3:
  //       return "bg-green-600"; // High
  //     case 4:
  //       return "bg-green-800"; // Very high
  //     default:
  //       return "bg-gray-200";
  //   }
  // };

  const [name, setProblemName] = useState('');
  const [link, setProblemLink] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [platform, setPlatform] = useState('');

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://codedejavu-1.onrender.com/api/add-problem",
        { name, link, difficulty, platform },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        alert("Successfully saved!!");
        setProblemName('');
        setProblemLink('');
        setDifficulty('');
        setPlatform('');
        if (onAction) onAction();
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      console.log("Error occurred : ", error);
      alert("Something went wrong!!");
    }
  };


  return (
    <div className="max-w-full mt-8 p-8 bg-gray-50 rounded-lg">
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left - Form Section */}
        <div className="shadow-md bg-white rounded-lg p-6">
          <h2 className="text-center text-2xl text-gray-600 font-semibold font-serif mb-6">
            Time to record your Mistakes!!
          </h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={submitForm}>
            {/* Row 1 */}
            <input
              type="text"
              placeholder="Problem Name"
              value={name}
              onChange={(e) => setProblemName(e.target.value)}
              className="p-2 rounded border border-gray-300 shadow-sm bg-white outline-none focus:ring-2 focus:ring-blue-300 text-gray-900"
            />
            <input
              type="url"
              placeholder="Enter Problem Link"
              value={link}
              onChange={(e) => setProblemLink(e.target.value)}
              className="p-2 rounded border border-gray-300 shadow-sm bg-white outline-none focus:ring-2 focus:ring-blue-300 text-gray-900"
            />

            {/* Row 2 */}
            <select
              name="platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="p-2 rounded border border-gray-300 shadow-sm bg-white outline-none focus:ring-2 focus:ring-blue-300 text-gray-900"
            >
              <option value="">--- Platform ---</option>
              <option value="leetcode">LeetCode</option>
              <option value="gfg">GeeksForGeeks</option>
              <option value="codeforces">Codeforces</option>
              <option value="codechef">CodeChef</option>
            </select>

            <select
              name="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="p-2 rounded border border-gray-300 shadow-sm bg-white outline-none focus:ring-2 focus:ring-blue-300 text-gray-900"
            >
              <option value="">--- Difficulty ---</option>
              <option value="easy" className="text-green-600">Easy</option>
              <option value="medium" className="text-yellow-600">Medium</option>
              <option value="hard" className="text-red-600">Hard</option>
            </select>

            {/* Button */}
            <div className="col-span-full flex justify-center mt-4">
              <button
                type="submit"
                className="bg-green-600 rounded shadow-md border-none cursor-pointer text-white font-semibold text-lg px-6 py-2 hover:bg-green-700 transition-colors"
              >
                Save to Suffer later
              </button>
            </div>
          </form>
        </div>

        {/* Right - Heatmap Section */}
        <div className="shadow-md bg-white rounded-lg p-4 text-center">
          <h2 className="text-center text-xl font-semibold mb-4 text-gray-700">
            HeatMap:{" "}
            <span className="text-red-500 font-bold">
              Pain Pattern OverTime!!
            </span>
          </h2>

          {/* Heatmap Grid */}
          <div className="flex justify-center items-center h-24">
            <p className="text-gray-500 italic">Feature coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddForm;
