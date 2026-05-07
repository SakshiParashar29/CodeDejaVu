import React, { useState } from 'react';
import { FaUser, FaBell } from 'react-icons/fa';
import {
    RiBarChart2Line,
    RiHeartLine,
    RiLogoutBoxRLine,
} from 'react-icons/ri';

import { NavLink, useNavigate } from 'react-router-dom';
import { logoutApi } from '../../services/api';
import logo from '../../assets/logo.png';

const Navbar = () => {

    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutApi();

            localStorage.clear();
            sessionStorage.clear();

            navigate('/login');
        } catch (error) {
            console.log(error);
            navigate('/login');
        }
    };

    return (
        <div className='flex items-center justify-around px-6 py-4 shadow-sm bg-white relative'>

            {/* Logo */}
            <div className='flex items-center gap-2'>
                <img src={logo} alt="logo" width={48} height={48} />

                <p className='text-xl font-semibold text-gray-700 tracking-wide'>
                    CodeDéjàVu
                </p>
            </div>

            {/* Dashboard */}
            <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                    `flex gap-1 text-xl items-center transition px-3 py-2 rounded-md
                    ${isActive
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    }`
                }
            >
                <RiBarChart2Line className='text-black' />
                Dashboard
            </NavLink>

            {/* Sheet & Soul */}
            <NavLink
                to="/sheets"
                className={({ isActive }) =>
                    `flex gap-1 text-xl items-center transition px-3 py-2 rounded-md
                    ${isActive
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    }`
                }
            >
                <RiHeartLine className='text-black' />
                Sheet & Soul
            </NavLink>

            {/* Right Side */}
            <div className='flex items-center gap-4 relative'>

                {/* Notification */}
                <button className="w-8 h-8 cursor-pointer">
                    <FaBell className="text-gray-600 w-full h-full p-1" />
                </button>

                {/* User Dropdown */}
                <div className='relative'>

                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="w-10 h-10 rounded-full border-2 border-gray-300
                        hover:ring-2 hover:ring-blue-400 transition flex items-center justify-center"
                    >
                        <FaUser className="text-gray-600 text-lg" />
                    </button>

                    {/* Dropdown */}
                    {showMenu && (
                        <div
                            className='absolute right-0 mt-3 w-44 bg-white border border-gray-200
                            rounded-xl shadow-lg overflow-hidden z-50'
                        >

                            <button
                                onClick={handleLogout}
                                className='w-full flex items-center gap-2 px-4 py-3
                                text-gray-700 hover:bg-red-50 hover:text-red-600 transition'
                            >
                                <RiLogoutBoxRLine className='text-lg' />
                                Logout
                            </button>

                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Navbar;