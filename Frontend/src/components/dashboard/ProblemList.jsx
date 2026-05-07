import { useEffect, useState } from 'react';
import { SiLeetcode, SiCodeforces, SiCodechef, SiGeeksforgeeks } from 'react-icons/si';
import { getProblemsApi } from '../../services/api';
import { FiLink } from "react-icons/fi";

const ITEMS_PER_PAGE = 10;

const ProblemList = ({ reload }) => {
    const [problems, setProblems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await getProblemsApi();
                setProblems(response.data.data || []);
                setCurrentPage(1); 
            } catch (error) {
                console.error("Error fetching problems:", error);
            }
        };
        fetchProblems();
    }, [reload]);

    const totalPages = Math.ceil(problems.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentProblems = problems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const getDifficultyColor = (difficulty) => {
        switch (difficulty.trim().toLowerCase()) {
            case 'easy':   return 'text-green-500';
            case 'medium': return 'text-yellow-500';
            case 'hard':   return 'text-red-500';
            default:       return '';
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

    return (
        <div className="max-w-full mt-8 p-8 shadow-md bg-white rounded-lg">
            <div className="text-center mb-6">
                <h2 className="text-2xl text-blue-600 font-semibold font-serif">
                    Total Problems Saved:{' '}
                    <span className="text-orange-500 text-3xl">{problems.length}</span>
                </h2>
            </div>

            {problems.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">
                    No problems saved yet.
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-3 mt-6 px-2 text-xl font-semibold text-gray-700 mb-2">
                        <div>Problem</div>
                        <div>Difficulty</div>
                        <div className="text-center">Platform</div>
                    </div>

                    {currentProblems.map((problem) => (
                        <div
                            key={problem._id}
                            className="grid grid-cols-3 px-2 py-3 text-gray-600 font-semibold text-lg border-t border-b hover:bg-gray-50 transition-colors items-center"
                        >
                            <div>{problem.name}</div>
                            <div className={`pl-4 ${getDifficultyColor(problem.difficulty)}`}>
                                {problem.difficulty}
                            </div>
                            <div className="flex justify-center text-2xl">
                                <a href={problem.link} target="_blank" rel="noopener noreferrer">
                                    {renderPlatformIcon(problem.platform)}
                                </a>
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

                    {/* Page info */}
                    <p className="text-center text-sm text-gray-400 mt-3">
                        Showing {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, problems.length)} of {problems.length} problems
                    </p>
                </>
            )}
        </div>
    );
};

export default ProblemList;