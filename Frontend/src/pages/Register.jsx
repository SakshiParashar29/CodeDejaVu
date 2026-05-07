import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerApi } from '../services/api';

const Register = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();

        if (!userName || !email || !password) {
            alert("All fields are required");
            return;
        }

        try {
            setLoading(true);
            const response = await registerApi({ username: userName, email, password });

            if (response.data.statusCode === 201) {
                navigate('/check-email');
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
                    <h2 className="text-3xl font-bold mb-2">Join. Because you clearly enjoy Pain.</h2>
                    <p className="text-gray-500">Sign up to suffer all over again!</p>
                </div>
                <form className="flex flex-col" onSubmit={submitForm}>
                    <label className="text-xl font-semibold mb-1">Username</label>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
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

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full p-3 text-white rounded-lg font-semibold text-lg transition-all cursor-pointer ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>

                    <p className="text-center text-gray-500 mt-4">
                        You've been here before. Don't act new!{" "}
                        <Link to="/login" className="text-blue-600 cursor-pointer font-medium hover:underline">
                            Sign In
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;