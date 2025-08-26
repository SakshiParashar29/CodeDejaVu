import React, { useEffect, useState } from 'react'; 
import { SiLeetcode, SiCodeforces, SiCodechef, SiGeeksforgeeks } from 'react-icons/si';
import axios from 'axios';

const MarkedProblems = ({onAction, reload}) => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://codedejavu-1.onrender.com/api/marked-problems', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProblems(response.data.data);
      } catch (error) {
        console.log("Error getting problems: ", error);
      }
    };

    fetchProblems();
  }, [reload]);

  const toggleReviewed = async (index) => {
    try {
      const updatedProblems = [...problems];
      const problem = updatedProblems[index];
      const newReviewed = !problem.reviewed;

      problem.reviewed = newReviewed;
      setProblems(updatedProblems);

      // Send PATCH request to backend
      const token = localStorage.getItem("token");
      await axios.post(
        `https://codedejavu-1.onrender.com/api/update-problem`,
        { problemId: problem._id, reviewed: newReviewed },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if(onAction) onAction();
    } catch (error) {
      console.error("Error updating problem:", error);

      // Rollback UI if API fails
      const rollbackProblems = [...problems];
      rollbackProblems[index].reviewed = !rollbackProblems[index].reviewed;
      setProblems(rollbackProblems);
    }
  };

  // Map platform name to icon
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

  // Difficulty color
  const getDifficultyColor = (difficulty) => {
    const lowerDiff = difficulty.trim().toLowerCase();
    if (lowerDiff === 'easy') return 'text-green-500';
    if (lowerDiff === 'medium') return 'text-yellow-500';
    if (lowerDiff === 'hard') return 'text-red-500';
    return '';
  };

  return (
    <div className="max-w-full mt-8 p-8 shadow-md bg-white rounded-lg">
      <h2 className="text-center text-2xl text-blue-600 font-semibold font-serif">
        Revision Vault -{' '}
        <span className="text-gray-500 italic font-normal text-lg">
          Problems You've Marked for Mastery.
        </span>
      </h2>

      {problems.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No problems marked yet. Start adding some to build your revision vault!
        </div>
      ) : (
        <>
          {/* Table Header */}
          <div className="grid grid-cols-1 md:grid-cols-4 mt-6 px-20 text-xl font-semibold text-gray-700 mb-2">
            <div>Problem</div>
            <div>Difficulty</div>
            <div className="text-center">Platform</div>
            <div className="text-center">Reviewed</div>
          </div>

          {/* Problems Rows */}
          {problems.map((problem, index) => (
            <div
              key={problem._id}
              className="grid grid-cols-1 md:grid-cols-4 px-20 py-3 text-gray-600 font-semibold text-lg border-t border-b hover:bg-gray-50 transition-colors duration-200 items-center"
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
              <div className="flex justify-center items-center">
                <input
                  type="checkbox"
                  checked={problem.reviewed}
                  onChange={() => toggleReviewed(index)}
                />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default MarkedProblems;
