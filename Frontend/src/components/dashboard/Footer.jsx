import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-700 py-10 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

                {/* Logo & Tagline */}
                <div>
                    <h2 className="text-2xl font-bold text-blue-600 mb-2">
                        CodeDéjàVu
                    </h2>
                    <p>
                        Helping you relive your DSA trauma... one problem at a time.
                    </p>
                </div>

               
                {/* Quick Links */}
                <div>
                    <h3 className="font-semibold mb-3 text-lg">Quick Links</h3>

                    <ul className="space-y-2">

                        <li>
                            <Link
                                to="/dashboard"
                                className="hover:text-blue-600 transition-colors duration-200"
                            >
                                Dashboard
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/sheets"
                                className="hover:text-blue-600 transition-colors duration-200"
                            >
                                Sheets
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Socials */}
                <div>
                    <h3 className="font-semibold mb-2">Follow Us</h3>

                    <div className="flex justify-center md:justify-start space-x-4">

                        <a
                            href="https://github.com/SakshiParashar29"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-black"
                        >
                            <FaGithub size={20} />
                        </a>

                        <a
                            href="https://www.linkedin.com/in/sakshi-parashar-753947298"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600"
                        >
                            <FaLinkedin size={20} />
                        </a>

                        <a
                            href="https://x.com/SakshiPara61157"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-sky-500"
                        >
                            <FaTwitter size={20} />
                        </a>

                    </div>
                </div>

            </div>

            {/* Bottom Note */}
            <div className="text-center mt-10 text-sm text-gray-500">
                Made with <FaHeart className="inline text-red-500 mx-1" />
                by a tired coder who still believes in AC
            </div>
        </footer>
    );
};

export default Footer;