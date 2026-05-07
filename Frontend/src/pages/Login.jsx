import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginApi } from '../services/api';

const Login = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();

        if (!identifier || !password) {
            alert("All fields are required");
            return;
        }

        try {
            setLoading(true);
            const response = await loginApi({ identifier, password });
            // token is stored in accessToken variable in api.js automatically
            if (response.data.statusCode === 200) {
                navigate('/dashboard');
            }
        } catch (error) {
            const msg = error.response?.data?.message || "Something went wrong. Try again!";
            alert(msg);
        } finally {
            setLoading(false);
        }
    };

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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter the same password you swore you'd never forget."
                        className="p-3 rounded-md shadow-sm mb-4 shadow-blue-200 outline-0 text-lg"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full p-3 text-white rounded-full font-semibold text-lg transition-all cursor-pointer ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>

                    <p className="text-center text-gray-500 mt-4">
                        Still not feeling the déjà vu?{" "}
                        <Link to="/register" className="text-blue-600 font-medium hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;