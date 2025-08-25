import React, { useState } from 'react';
import { FaUser, FaBell } from 'react-icons/fa';
import { RiBarChart2Line, RiMoonLine, RiSunLine, RiSettings3Line } from 'react-icons/ri';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className='flex items-center justify-around px-6 py-4 shadow-sm'>
            <div className='flex items-center'>
                <img src="logo.png" alt="logo" width={48} height={48} />
                <p className='text-xl font-semibold text-gray-700 tracking-wide'>
                    CodeDéjàVu
                </p>
            </div>

            <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                    `flex gap-1 text-xl items-center transition 
                    ${isActive
                        ? "text-blue-600 bg-blue-50 p-2 rounded-md"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:p-2 hover:rounded-md"
                    }`
                }
            >
                <RiBarChart2Line className='text-black' />
                Dashboard
            </NavLink>

            <NavLink
                to="/analytics"
                className={({ isActive }) =>
                    `flex gap-1 text-xl items-center transition 
                    ${isActive
                        ? "text-blue-600 bg-blue-50 p-2 rounded-md"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:p-2 hover:rounded-md"
                    }`
                }
            >
                <RiBarChart2Line className='text-black' />
                Analytics
            </NavLink>


            <NavLink
                to="/settings"
                className={({ isActive }) =>
                    `flex gap-1 text-xl items-center transition 
                    ${isActive
                        ? "text-blue-600 bg-blue-50 p-2 rounded-md"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:p-2 hover:rounded-md"
                    }`
                }
            >
                <RiBarChart2Line className='text-black' />
                Settings
            </NavLink>


            {/* Dark Mode Toggle Button */}
            <button onClick={toggleMode} className='text-2xl text-gray-700 hover:text-blue-600 transition cursor-pointer'>
                {darkMode ? <RiSunLine /> : <RiMoonLine />}
            </button>
            
            {/* Notifications icon */}
            <button className="w-8 h-8 cursor-pointer">
                <FaBell className="text-gray-600 w-full h-full p-1" />
            </button>
            {/* User Icon Button */}
            <button className="w-10 h-10 rounded-full border-2 border-gray-500 hover:ring-2 hover:ring-blue-400 transition">
                <FaUser className="text-gray-600 w-full h-full p-1" />
            </button>

        </div>
    );
};

export default Navbar;
