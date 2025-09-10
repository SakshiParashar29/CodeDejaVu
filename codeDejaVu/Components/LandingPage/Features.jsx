import React from 'react';
import { FaRedo, FaCheckCircle, FaChartLine, FaStickyNote } from 'react-icons/fa';

const features = [
  {
    icon: <FaRedo size={28} className="text-blue-600" />,
    title: 'Spaced Revisions',
    description: "Revisit solved problems using 1-2-4-7-15 technique and never forget what you've learned."
  },
  {
    icon: <FaCheckCircle size={28} className="text-green-600" />,
    title: 'Track Your Progress',
    description: 'Mark problems as solved and monitor your growth across all major coding platforms.'
  },
  {
    icon: <FaChartLine size={28} className="text-purple-600" />,
    title: 'Sheets & Sets',
    description: 'Access curated coding sheets like Striver, Love Babbar, and LeetCode 150 in one place.'
  },
  {
    icon: <FaStickyNote size={28} className="text-yellow-400" />,
    title: 'Personal Notes',
    description: "Add your own hints, edge cases, or strategies for each problem. It's your second brain."
  }
];

const Features = () => {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800">
          Why Choose <span className="text-blue-600">CodeDéjàVu</span>?
        </h2>
        <div className="grid gap-10 md:grid-cols-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl shadow-sm hover:shadow-md transition duration-200">
              <div>{feature.icon}</div>
              <div className="text-left">
                <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 mt-1">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
