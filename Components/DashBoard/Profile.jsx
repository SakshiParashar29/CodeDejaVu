import React, { useEffect, useState } from 'react';
import { FaFire } from 'react-icons/fa';
import axios from 'axios'

const Profile = ({ reload }) => {
  const [totalProblems, setTotalProblems] = useState(0);
  const [streak, setStreak] = useState(0);
  const [solved, setSolved] = useState(0);

  const [username, setUsername] = useState("Guest");
  const [nemesis, setNemesis] = useState("DP");
  const [edit, canEdit] = useState(false);

  const saveNemesis = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('https://codedejavu-1.onrender.com/api/nemesis',
        { nemesis },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Error updating nemesis:", err);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const problemsCount = await axios.get('https://codedejavu-1.onrender.com/api/problem-count', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTotalProblems(problemsCount.data.data);

        const streakData = await axios.get('https://codedejavu-1.onrender.com/api/streak', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStreak(streakData.data.data);

        const reviewedCnt = await axios.get('https://codedejavu-1.onrender.com/api/reviewed-problems', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSolved(reviewedCnt.data.data);

        const profileName = await axios.get('https://codedejavu-1.onrender.com/api/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsername(profileName.data.data.username);
        setNemesis(profileName.data.data.nemesis || "DP");

      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };

    fetchData();
  }, [reload]);

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg grid grid-cols-2 gap-6 border-t border-gray-200">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-100 text-center p-4 rounded-md font-semibold text-gray-800">
          Total Problems
          <p className='text-green-500 text-xl'>{totalProblems}</p>
        </div>
        <div className="bg-green-100 text-center p-4 rounded-md font-semibold text-gray-800">
          Streak
          <p className='flex justify-center items-center gap-1 text-xl'>{streak} <FaFire className='text-orange-600' /></p>
        </div>
        <div className="bg-yellow-100 text-center p-4 rounded-md font-semibold text-gray-800">
          Victory Count
          <p className='text-lg text-blue-500'>{solved}</p>
        </div>
        <div className="bg-red-100 text-center p-4 rounded-md font-semibold text-gray-800">
          Your Nemesis
          {/* <p className='text-xl text-red-700'>DP</p> */}
          <input type="text" className='text-xl text-center w-24 text-red-700' value={nemesis} onChange={(e) => {setNemesis(e.target.value); canEdit(true)}} />
          {edit ?
            <button
              onClick={() => {saveNemesis(); canEdit(false)}}
              className='bg-red-700 text-white px-3 py-1 rounded mt-1 text-sm'
            >
              Save
            </button> : ""}
        </div>

      </div>
      <div className="flex flex-col items-center justify-center text-gray-700">
        <img
          src="/logo.png"
          alt="Profile"
          className="w-24 h-24 rounded-full border border-gray-300 shadow"
        />
        <h2 className="mt-4 text-lg font-bold">{username}</h2>
        <p className="text-sm text-gray-500">Trust issues? I've seen my code run on the first try.</p>
      </div>
    </div>
  );
};

export default Profile;
