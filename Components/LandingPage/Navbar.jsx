import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div className='flex items-center justify-between px-6 py-4 shadow-sm'>
      <div className='flex items-center'>
        <img src="logo.png" alt="logo" width={48} height={48} />
        <p className='text-xl font-semibold text-gray-700 tracking-wide'>
          CodeDéjàVu
        </p>
      </div>
      <Link to="/signup">
        <button className="flex cursor-pointer items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
          Sign Up <FaArrowRight />
        </button>
      </Link>
    </div>
  );
};

export default Navbar;
