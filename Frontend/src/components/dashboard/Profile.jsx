import { useEffect, useState } from 'react';
import { getProfileApi, getTotalCountApi, getCompletedCountApi, updateNemesisApi } from '../../services/api';
import defaultDp from '../../assets/rabbitdp.jpg'; // keep your image

const Profile = ({ reload }) => {
    const [totalProblems, setTotalProblems] = useState(0);
    const [completed, setCompleted] = useState(0);
    const [username, setUsername] = useState('Guest');
    const [nemesis, setNemesis] = useState('DP');
    const [profilePic, setProfilePic] = useState(null);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileRes, countRes, completedRes] = await Promise.all([
                    getProfileApi(),
                    getTotalCountApi(),
                    getCompletedCountApi(),
                ]);

                const profileData = profileRes.data.data;
                console.log('profile response:', profileData); 

                setUsername(profileData.username);
                setNemesis(profileData.nemesis || 'DP');
                setProfilePic(profileData.profile || null);
                setTotalProblems(countRes.data.data);
                setCompleted(completedRes.data.data);
            } catch (err) {
                console.error("Error fetching profile data:", err);
            }
        };
        fetchData();
    }, [reload]);

    const saveNemesis = async () => {
        try {
            await updateNemesisApi(nemesis);
            setEditing(false);
        } catch (err) {
            console.error("Error updating nemesis:", err);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg grid grid-cols-2 gap-6 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-100 text-center p-4 rounded-md font-semibold text-gray-800">
                    Total Problems
                    <p className="text-green-500 text-xl">{totalProblems}</p>
                </div>
                <div className="bg-yellow-100 text-center p-4 rounded-md font-semibold text-gray-800">
                    Cycles Completed
                    <p className="text-blue-500 text-xl">{completed}</p>
                </div>
                <div className="bg-red-100 text-center p-4 rounded-md font-semibold text-gray-800 col-span-2">
                    Your Nemesis
                    <div className="flex justify-center items-center gap-2 mt-1">
                        <input
                            type="text"
                            className="text-xl text-center w-24 text-red-700 border-b border-red-300 outline-none"
                            value={nemesis}
                            onChange={(e) => { setNemesis(e.target.value); setEditing(true); }}
                        />
                        {editing && (
                            <button
                                onClick={saveNemesis}
                                className="bg-red-700 text-white px-3 py-1 rounded text-sm"
                            >
                                Save
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center text-gray-700">
                <img
                    src={profilePic && profilePic !== './logo.png' ? profilePic : defaultDp}
                    alt="Profile"
                    className="w-44 h-44 rounded-full border border-gray-300 shadow object-cover"
                />
                <h2 className="mt-4 text-lg font-bold">{username}</h2>
                <p className="text-sm text-gray-500">Trust issues? I've seen my code run on the first try.</p>
            </div>
        </div>
    );
};

export default Profile;