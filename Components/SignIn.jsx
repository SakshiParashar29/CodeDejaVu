import React, { useState } from 'react'
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    if (!identifier || !password) {
      alert("Enter the necessary credentials");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/signin', {
        identifier,
        password
      });

      if (response.data.success) {
        // alert("Successfully SignIn!!");
        localStorage.setItem("token", response.data.data.token);
        setIdentifier('');
        setPassword('');
        navigate('/dashboard')
      }
      else {
        alert("SignIn failed!");
      }
    } catch (error) {
      console.log("error occured : ", error);
      alert("Something went wrong. Try again!");
    }
  }

  return (
    <div className="max-w-xl w-full mt-10 mx-auto rounded-md shadow-lg bg-white shadow-gray-500">
      <div className="p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Sign In</h2>
          <p className="text-gray-500">Because at least your code gives you a response.</p>
        </div>
        <form className="flex flex-col" onSubmit={submitForm}>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Username or Email"
            className="p-3 rounded-md shadow-sm mb-4 shadow-blue-200 outline-0 text-lg"
          />
          <input
            type="password"
            placeholder="Enter the same password you swore you'd never forget."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-md shadow-sm mb-4 shadow-blue-200 outline-0 text-lg"
          />

          <button className="w-full bg-blue-600 p-3 text-white rounded-full font-semibold text-lg hover:bg-blue-700 transition-all cursor-pointer" type='submit'>
            Sign In
          </button>
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-4 text-gray-500 font-medium">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <button className="w-full p-3 rounded-full font-semibold text-lg cursor-pointer bg-white shadow-md shadow-gray-400 flex items-center justify-center gap-3">
            <FcGoogle className="text-2xl" />
            Sign In with Google
          </button>

          <p className="text-center text-gray-500 mt-4">
            Still not feeling the déjà vu?{" "}
            <Link to="/signup" className="text-blue-600 cursor-pointer font-medium hover:underline" href="#">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignIn
