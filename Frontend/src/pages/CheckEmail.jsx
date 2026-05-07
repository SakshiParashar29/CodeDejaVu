import { Link } from 'react-router-dom';

const CheckEmail = () => {
    return (
        <div className="max-w-xl w-full mt-10 mx-auto rounded-md shadow-lg bg-white shadow-gray-500">
            <div className="p-6 text-center">
                <h2 className="text-3xl font-bold mb-2">Check your email!</h2>
                <p className="text-gray-500 mb-6">
                    We sent a verification link to your email address. Click it to activate your account.
                </p>
                <p className="text-sm text-gray-400">
                    Already verified?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default CheckEmail;