import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SiLeetcode, SiCodeforces, SiCodechef, SiGeeksforgeeks } from 'react-icons/si';

const Problems = ({ reload }) => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/get-problems', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProblems(response.data.data || []);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchProblems();
  }, [reload]);

  const getDifficultyColor = (difficulty) => {
    const lowerDiff = difficulty.trim().toLowerCase();
    if (lowerDiff === 'easy') return 'text-green-500';
    if (lowerDiff === 'medium') return 'text-yellow-500';
    if (lowerDiff === 'hard') return 'text-red-500';
    return '';
  };

  const renderPlatformIcon = (platform) => {
    const lowerPlatform = platform.trim().toLowerCase();
    switch (lowerPlatform) {
      case "leetcode": return <SiLeetcode className="text-orange-500" />;
      case "codeforces": return <SiCodeforces className="text-blue-600" />;
      case "codechef": return <SiCodechef className="text-red-600" />;
      case "geeksforgeeks": return <SiGeeksforgeeks className="text-green-600" />;
      default: return null;
    }
  };

  return (
    <div className="max-w-full mt-8 p-8 shadow-md bg-white rounded-lg">
      {/* Total Problems */}
      <div className="text-center mb-6">
        <h2 className="text-2xl text-blue-600 font-semibold font-serif mb-2">
          Total Problems Saved : <span className='text-orange-500 text-3xl'>{problems.length}</span>
        </h2>
      </div>

      {/* Problems Table */}
      {problems.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No problems saved yet.
        </div>
      ) : (
        <div>
          {/* Table Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 mt-6 px-2 text-xl font-semibold text-gray-700 mb-2">
            <div>Problem</div>
            <div>Difficulty</div>
            <div className="text-center">Platform</div>
          </div>

          {/* Table Rows */}
          {problems.map((problem) => (
            <div
              key={problem._id}
              className="grid grid-cols-1 md:grid-cols-3 px-2 py-3 text-gray-600 font-semibold text-lg border-t border-b hover:bg-gray-50 transition-colors duration-200 items-center"
            >
              <div>{problem.name}</div>
              <div className={`pl-4 ${getDifficultyColor(problem.difficulty)}`}>
                {problem.difficulty}
              </div>
              <div className="flex justify-center items-center text-2xl">
                <a href={problem.link} target="_blank" rel="noopener noreferrer">
                  {renderPlatformIcon(problem.platform)}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Problems;
