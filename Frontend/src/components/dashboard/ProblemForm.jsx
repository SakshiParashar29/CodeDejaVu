import { useState } from 'react';
import { saveProblemApi } from '../../services/api';

const ProblemForm = ({ onAction }) => {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [platform, setPlatform] = useState('');
    const [loading, setLoading] = useState(false);

    const submitForm = async (e) => {
        e.preventDefault();

        if (!name || !link || !difficulty || !platform) {
            alert("All fields are required");
            return;
        }

        try {
            setLoading(true);
            await saveProblemApi({ name, link, difficulty, platform });
            setName('');
            setLink('');
            setDifficulty('');
            setPlatform('');
            if (onAction) onAction();
        } catch (error) {
            const msg = error.response?.data?.message || "Something went wrong!";
            alert(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-full mt-8 p-8 bg-gray-50 rounded-lg">
            <div className="shadow-md bg-white rounded-lg p-6">
                <h2 className="text-center text-2xl text-gray-600 font-semibold font-serif mb-6">
                    Time to record your Mistakes!!
                </h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={submitForm}>
                    <input
                        type="text"
                        placeholder="Problem Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-2 rounded border border-gray-300 shadow-sm bg-white outline-none focus:ring-2 focus:ring-blue-300 text-gray-900"
                    />
                    <input
                        type="url"
                        placeholder="Enter Problem Link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className="p-2 rounded border border-gray-300 shadow-sm bg-white outline-none focus:ring-2 focus:ring-blue-300 text-gray-900"
                    />
                    <select
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                        className="p-2 rounded border border-gray-300 shadow-sm bg-white outline-none focus:ring-2 focus:ring-blue-300 text-gray-900"
                    >
                        <option value="">--- Platform ---</option>
                        <option value="leetcode">LeetCode</option>
                        <option value="gfg">GeeksForGeeks</option>
                        <option value="codeforces">Codeforces</option>
                        <option value="codechef">CodeChef</option>
                        <option value="other">Other</option>
                    </select>
                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="p-2 rounded border border-gray-300 shadow-sm bg-white outline-none focus:ring-2 focus:ring-blue-300 text-gray-900"
                    >
                        <option value="">--- Difficulty ---</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                    <div className="col-span-full flex justify-center mt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`rounded shadow-md text-white font-semibold text-lg px-6 py-2 transition-colors cursor-pointer ${loading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'}`}
                        >
                            {loading ? 'Saving...' : 'Save to Suffer Later'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProblemForm;