import { useEffect, useState } from 'react';
import { SiLeetcode, SiCodeforces, SiCodechef, SiGeeksforgeeks } from 'react-icons/si';
import { getRevisionListApi, updateProblemApi } from '../../services/api';
import { FiLink } from "react-icons/fi";


const ITEMS_PER_PAGE = 6;

const RevisionList = ({ reload, onAction }) => {
    const [problems, setProblems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await getRevisionListApi();
                setProblems(response.data.data || []);
                setCurrentPage(1); 
            } catch (error) {
                console.error("Error fetching revision list:", error);
            }
        };
        fetchProblems();
    }, [reload]);

    const totalPages = Math.ceil(problems.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentProblems = problems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const toggleReviewed = async (index) => {
        const actualIndex = startIndex + index;
        const updatedProblems = [...problems];
        updatedProblems[actualIndex].reviewed = !updatedProblems[actualIndex].reviewed;
        setProblems(updatedProblems);

        try {
            await updateProblemApi(updatedProblems[actualIndex]._id);
            if (onAction) onAction();
        } catch (error) {
            updatedProblems[actualIndex].reviewed = !updatedProblems[actualIndex].reviewed;
            setProblems([...updatedProblems]);
        }
    };

    const renderPlatformIcon = (platform) => {
        switch (platform.trim().toLowerCase()) {
            case "leetcode":   return <SiLeetcode className="text-orange-500" />;
            case "codeforces": return <SiCodeforces className="text-blue-600" />;
            case "codechef":   return <SiCodechef className="text-red-600" />;
            case "gfg":        return <SiGeeksforgeeks className="text-green-600" />;
            case "other":      return <FiLink className="text-gray-500" />;
            default:           return null;
        }
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty.trim().toLowerCase()) {
            case 'easy':   return 'text-green-500';
            case 'medium': return 'text-yellow-500';
            case 'hard':   return 'text-red-500';
            default:       return '';
        }
    };

    return (
        <div className="max-w-full mt-8 p-8 shadow-md bg-white rounded-lg">
            <h2 className="text-center text-2xl text-blue-600 font-semibold font-serif">
                Revision Vault —{' '}
                <span className="text-gray-500 italic font-normal text-lg">
                    Problems Due Today.
                </span>
            </h2>

            {problems.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">
                    No problems due for revision today. Go add some!
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-4 mt-6 px-4 text-xl font-semibold text-gray-700 mb-2">
                        <div>Problem</div>
                        <div>Difficulty</div>
                        <div className="text-center">Platform</div>
                        <div className="text-center">Reviewed</div>
                    </div>

                    {currentProblems.map((problem, index) => (
                        <div
                            key={problem._id}
                            className="grid grid-cols-4 px-4 py-3 text-gray-600 font-semibold text-lg border-t border-b hover:bg-gray-50 transition-colors items-center"
                        >
                            <div>{problem.name}</div>
                            <div className={getDifficultyColor(problem.difficulty)}>
                                {problem.difficulty}
                            </div>
                            <div className="flex justify-center text-2xl">
                                <a href={problem.link} target="_blank" rel="noopener noreferrer">
                                    {renderPlatformIcon(problem.platform)}
                                </a>
                            </div>
                            <div className="flex justify-center">
                                <input
                                    type="checkbox"
                                    checked={problem.reviewed}
                                    onChange={() => toggleReviewed(index)}
                                    className="w-5 h-5 cursor-pointer"
                                />
                            </div>
                        </div>
                    ))}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-6">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 rounded border text-sm font-medium disabled:opacity-40 hover:bg-gray-100 transition"
                            >
                                Prev
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-1 rounded border text-sm font-medium transition
                                        ${currentPage === page
                                            ? 'bg-blue-600 text-white border-blue-600'
                                            : 'hover:bg-gray-100'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 rounded border text-sm font-medium disabled:opacity-40 hover:bg-gray-100 transition"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default RevisionList;