import { useEffect, useState } from "react";
import { getHeatMapApi } from "../../services/api";

const HeatMap = ({ reload }) => {
    const [monthData, setMonthData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHeatMap = async () => {
            try {
                const res = await getHeatMapApi();
                setMonthData(res.data.data || []);
            } catch (err) {
                console.error("Error fetching heatmap:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchHeatMap();
    }, [reload]);

    const getColor = (count) => {
        if (count === 0) return "bg-gray-100";
        if (count === 1) return "bg-emerald-200";
        if (count === 2) return "bg-emerald-400";
        if (count === 3) return "bg-emerald-600";
        return "bg-emerald-800";
    };

    const today = new Date();
    const monthName = today.toLocaleString("default", { month: "long" });
    const year = today.getFullYear();

    return (
        <div className="w-full flex justify-center mt-8">
            <div className="w-full max-w-3xl bg-gray-50 rounded-xl p-6">

                {/* HEADER */}
                <div className="text-center mb-6">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-700">
                        HeatMap{" "}
                        <span className="text-red-500 font-bold">
                            Pain Pattern Over Time
                        </span>
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">
                        {monthName} {year}
                    </p>
                </div>

                {/* GRID */}
                <div className="flex justify-center p-4">
                    {loading ? (
                        <p className="text-gray-400">Loading...</p>
                    ) : (
                        <div className="grid grid-cols-7 gap-2">
                            {monthData.map((count, index) => (
                                <div
                                    key={index}
                                    title={`Day ${index + 1}: ${count} entries`}
                                    className={`
                                        w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10
                                        rounded-md transition-all duration-200
                                        hover:scale-110 hover:shadow-md
                                        ${getColor(count)}
                                    `}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* LEGEND */}
                <div className="flex flex-wrap justify-center items-center gap-2 mt-6 text-xs text-gray-500">
                    <span>Less</span>
                    <div className="w-4 h-4 bg-gray-100 rounded" />
                    <div className="w-4 h-4 bg-emerald-200 rounded" />
                    <div className="w-4 h-4 bg-emerald-400 rounded" />
                    <div className="w-4 h-4 bg-emerald-600 rounded" />
                    <div className="w-4 h-4 bg-emerald-800 rounded" />
                    <span>More</span>
                </div>
            </div>
        </div>
    );
};

export default HeatMap;