import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios'

const SignUp = () => {
  const [userName, setuserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    if (!userName || !email || !password) {
      alert("Enter the necessary credentials");
      return;
    }

    try {
      const response = await axios.post('https://codedejavu-1.onrender.com/api/signup', {
        username: userName,
        email: email,
        password: password
      });
       
      if (response.data.success) {
        
        alert("SignUp successfully!!");
        setuserName('');
        setEmail('');
        setPassword('');
        localStorage.setItem('username', response.data.data.user.username)
        navigate('/dashboard');
      }
      else {
        alert('SignUp failed!!');
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Something went wrong. Try again!");
    }
  }
  return (
    <div className="max-w-xl w-full mt-10 mx-auto rounded-md shadow-lg bg-white shadow-gray-500">
      <div className="p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Join. Because you clearly enjoy Pain.</h2>
          <p className="text-gray-500">Sign up to suffer all over again!</p>
        </div>
        <form className="flex flex-col" onSubmit={submitForm}>
          <label className="text-xl font-semibold mb-1">Username</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
            placeholder="Enter a name cooler than your DSA skills."
            className="p-3 rounded-md shadow-sm mb-4 shadow-blue-200 outline-0 text-lg"
          />

          <label className="text-xl font-semibold mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email (Yes, the real one.)"
            className="p-3 rounded-md shadow-sm mb-4 shadow-blue-200 outline-0 text-lg"
          />

          <label className="text-xl font-semibold mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Make it as complex as your love life."
            className="p-3 rounded-md shadow-sm mb-4 shadow-blue-200 outline-0 text-lg"
          />

          <button className="w-full bg-blue-600 p-3 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all cursor-pointer" type='submit'>
            Register
          </button>

          <p className="text-center text-gray-500 mt-4">
            You've been here before. Don't act new!{" "}
            <Link to="/signIn" className="text-blue-600 cursor-pointer font-medium hover:underline" href="#">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
