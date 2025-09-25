import { Problems } from "../Models/problems.js";
import ApiResponse from "../Utils/ApiResponse.js";

// Add the problem to DataBase
export const addProblem = async (req, res) => {
    try {
        const { name, link, platform, difficulty } = req.body;
        const problem = await Problems.findOne({ link, user: req.user._id });
        if (problem) {
            return res.status(400).json(new ApiResponse(400, "Problem already exists", null, false));
        }

        const newProblem = await Problems.create({
            name, link, platform, difficulty,
            user: req.user._id
        });

        return res.status(201).json(new ApiResponse(201, "Problem added to list", newProblem, true));
    } catch (err) {
        return res.status(500).json(new ApiResponse(500, "Something went wrong", err.message, false));
    }
};
// Get all the problems to display on the dashboard
export const getProblems = async (req, res) => {
    try {
        const problems = await Problems.find({ user: req.user._id }).sort({ createdAt: -1 });

        if (problems.length === 0) {
            return res
                .status(200)
                .json(new ApiResponse(200, "Add some problems to feel DejaVu", [], true));
        }

        return res
            .status(200)
            .json(new ApiResponse(200, "Problems list", problems, true));
    } catch (err) {
        return res
            .status(500)
            .json(new ApiResponse(500, "Error fetching problems", null, false));
    }
};

// Update the problems - mark it as review
export const updateProblem = async (req, res) => {
    try {
        const { problemId, reviewed } = req.body;

        const problem = await Problems.findOneAndUpdate(
            { _id: problemId, user: req.user._id },
            {
                $set: {
                    reviewed: true,
                    reviewedAt: reviewed ? new Date() : null
                }
            },
            { new: true }
        );

        if (!problem) {
            return res.status(404).json(new ApiResponse(404, "Problem not found", null, false));
        }

        return res.status(200).json(
            new ApiResponse(200, "Problem updated successfully", problem, true)
        );
    } catch (err) {
        return res.status(500).json(new ApiResponse(500, "Error updating problem", err.message, false));
    }
};

// Get total problem count
export const problemCount = async (req, res) => {
    try {
        const problems = await Problems.countDocuments({ user: req.user._id });
        return res.status(200).json(new ApiResponse(200, "Total problems", problems, true));
    } catch (err) {
        return res.status(500).json(new ApiResponse(500, "Error fetching problem count", null, false));
    }
};

// Reviewed problems count
export const reviewedProblems = async (req, res) => {
    try {
        let startDay = new Date();
        startDay.setHours(0,0,0,0);

        let endDay = new Date();
        endDay.setHours(23, 59, 59, 999);
        
        const count = await Problems.countDocuments({
            user: req.user._id,
            reviewedAt: {$gte: startDay, $lte: endDay}
        });

        return res.status(200).json(new ApiResponse(200, "Reviewed problems", count, true));
    } catch (err) {
        return res.status(500).json(new ApiResponse(500, "Error fetching reviewed problems", null, false));
    }
};

// Streak count
export const streakCount = async (req, res) => {
    try {
        const problems = await Problems.find({
            user: req.user._id,
            reviewedAt: { $ne: null }
        }).sort({ reviewedAt: 1 });

        if (problems.length === 0) {
            return res.status(200).json(new ApiResponse(200, "Streak count", 0, true));
        }

        const uniqueDaysSet = new Set();
        for (let prob of problems) {
            let day = new Date(prob.reviewedAt).setHours(0, 0, 0, 0);
            uniqueDaysSet.add(day);
        }

        let uniqueDays = Array.from(uniqueDaysSet).sort((a, b) => a - b);

        let streak = 0;
        let today = new Date().setHours(0, 0, 0, 0);
        let lastDay = uniqueDays[uniqueDays.length - 1];
        if (lastDay === today) {
            streak = 1;
        } else {
            return res.status(200).json(new ApiResponse(200, "Streak count", 0, true));
        }

        for (let i = uniqueDays.length - 2; i >= 0; i--) {
            let curr = uniqueDays[i];
            let diff = (lastDay - curr) / (1000 * 60 * 60 * 24);

            if (diff === 1) {
                streak++;
                lastDay = curr;
            } else {
                break;
            }
        }

        return res.status(200).json(new ApiResponse(200, "Streak count", streak, true));
    } catch (err) {
        return res.status(500).json(new ApiResponse(500, "Error calculating streak count", err.message, false));
    }
};


//Analytics for problem solved in a day
export const HeatMap = async (req, res) => {
    try {
        const problems = await Problems.find({ user: req.user._id, reviewedAt: {$ne: null} });

        const currdate = new Date();
        const month = new Date(currdate.getFullYear(), currdate.getMonth() + 1, 0).getDate();

        const monthArr = Array(month).fill(0);

        problems.forEach((problem) => {
            const reviewedDate = new Date(problem.reviewedAt);

            if (reviewedDate.getMonth() === currdate.getMonth() && reviewedDate.getFullYear() === currdate.getFullYear()) {
                const day = reviewedDate.getDate();
                monthArr[day - 1]++;
            }
        });

        return res.status(200).json(new ApiResponse(200, "SuccessFull", monthArr, true));
    } catch (error) {
        return res.status(400).json(new ApiResponse(400, "Something went wrong", null, false));
    }
}