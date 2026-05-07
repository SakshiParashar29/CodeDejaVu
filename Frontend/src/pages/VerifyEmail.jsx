import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyEmailApi } from '../services/api';

const VerifyEmail = () => {
    const [status, setStatus] = useState('verifying');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');

        if (!token) {
            setStatus('invalid');
            return;
        }

        const verify = async () => {
            try {
                await verifyEmailApi(token);
                setStatus('success');
                setTimeout(() => navigate('/login'), 2000);
            } catch (err) {
                setStatus('invalid');
            }
        };

        verify();
    }, []);

    return (
        <div className="max-w-xl w-full mt-10 mx-auto rounded-md shadow-lg bg-white shadow-gray-500">
            <div className="p-6 text-center">
                {status === 'verifying' && <p className="text-gray-600">Verifying your email...</p>}
                {status === 'success' && (
                    <>
                        <h2 className="text-2xl font-bold text-green-600 mb-2">Email Verified!</h2>
                        <p className="text-gray-500">Redirecting to login...</p>
                    </>
                )}
                {status === 'invalid' && (
                    <>
                        <h2 className="text-2xl font-bold text-red-500 mb-2">Invalid or expired link</h2>
                        <p className="text-gray-500">Please register again.</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;