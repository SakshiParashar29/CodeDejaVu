import React from 'react';
import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    localStorage.removeItem('token'); 
    navigate('/dashboard');
  };
  return (
    <footer className="bg-gray-100 text-gray-700 py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Logo & Tagline */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-2">CodeDéjàVu</h2>
          <p>Helping you relive your DSA trauma... one problem at a time.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <button onClick={handleHomeClick} className="hover:underline">
                Home
              </button>
            </li>
            {/* <li><Link href="#features" className="hover:underline">Features</Link></li>
            <li><Link href="#memes" className="hover:underline">Memes</Link></li> */}
            <li><Link to="/signIn" className="hover:underline">Sign In</Link></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"><FaGithub size={20} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin size={20} /></a>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="text-center mt-10 text-sm text-gray-500">
        Made with <FaHeart className="inline text-red-500 mx-1" /> by tired coder who still believe in AC.
      </div>
    </footer>
  );
};

export default Footer;
