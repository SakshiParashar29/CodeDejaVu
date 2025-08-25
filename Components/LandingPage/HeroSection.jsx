import React from 'react';
import {Link} from 'react-router-dom'

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-purple-100 to-rose-100 text-gray-800 px-4">
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-lg">
          Ever felt like LeetCode is gaslighting you?
        </h1>
        <p className="text-lg md:text-xl mb-4 drop-shadow">
          <strong>You:</strong> "I swear I solved this exact problem before..." <br />
          <strong>LeetCode:</strong> <em>'First time seeing this, huh?'</em>
        </p>
        <p className="text-base md:text-lg mb-8 drop-shadow-md">
          Welcome to <span className="font-bold text-black">CodeDéjàVu</span> — the platform where forgetting is expected, and mastering is guaranteed.  
          Revisit problems. Get reminded. Defeat déjà vu.
        </p>

        <Link to="/signup">
        <button className="bg-white text-indigo-700 hover:bg-blue-200 hover:text-gray-900 cursor-pointer transition-all px-8 py-3 rounded-full shadow-xl text-lg font-semibold">
          Start Remembering
        </button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
