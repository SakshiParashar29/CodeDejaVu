const Problem = require('../models/problem-model');
const asyncHandler = require('../utils/async-handler');
const ApiResponse = require('../utils/api-response');

const saveProblemsHandler = asyncHandler(async(req, res) => {
    const {name, link, difficulty, platform} = req.body;

    if(!name || !link || !difficulty || !platform){
        return res.status(400).json(new ApiResponse(400, "All fields are required"));
    }

    const problemExists = await Problem.findOne({link, user: req.user._id});

    if(problemExists){
        return res.status(409).json(new ApiResponse(409, "Problem already exists"));
    }

    const problem = await Problem.create({
        name,
        link,
        difficulty,
        platform,
        user: req.user._id,
        reviewed: false
    });

    return res.status(201).json(new ApiResponse(201, "Problem saved", problem));

});

const updateProblemHandler = asyncHandler(async (req, res) => {
    const problemId = req.params.id;
    
    const problem = await Problem.findOne({_id: problemId, user: req.user._id});

    if(!problem){
        return res.status(404).json(new ApiResponse(404, "Problem not found"));
    }

    problem.reviewed = !problem.reviewed;
    problem.reviewedAt = new Date();
    await problem.save();

    return res.status(200).json(new ApiResponse(200, 'Marked as reviewed', problem));

});

const getProblemsHandler = asyncHandler(async (req, res) => {
    const problems = await Problem.find({user: req.user._id}).sort({ createdAt: -1 });

    if(problems.length == 0){
       return res.status(200).json(new ApiResponse(200, "No problem found!! Mark the problem for revision"));
    }

    return res.status(200).json(new ApiResponse(200, 'Problems fetched successfully', problems));
});

const totalCountHandler = asyncHandler(async(req, res) => {
    const problemsCnt = await Problem.countDocuments({user: req.user._id});

    return res.status(200).json(new ApiResponse(200, 'Total problem counts', problemsCnt));
});

const getCompletedCountHandler = asyncHandler(async (req, res) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const fifteenDaysAgo = new Date(today);
    fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

    const count = await Problem.countDocuments({
        user: req.user._id,
        reviewedAt: { $ne: null },
        createdAt: { $lte: fifteenDaysAgo }
    });

    return res.status(200).json(new ApiResponse(200, "Completed revision cycle count", count));
});

const getHeatMapHandler = asyncHandler(async(req, res) => {
    const problems = await Problem.find({
        user: req.user._id,
        reviewedAt: {$ne: null}
    });

    console.log(problems);
    console.log(typeof problems);

    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const monthArr = Array(daysInMonth).fill(0);

    problems.forEach((problem) => {
        const reviewedDate = new Date(problem.reviewedAt);
        const sameMonth = reviewedDate.getMonth() === today.getMonth();
        const sameYear = reviewedDate.getFullYear() === today.getFullYear();

        if(sameMonth && sameYear){
            monthArr[reviewedDate.getDate() - 1]++;
        }
    });

    return res.status(200).json(new ApiResponse(200, 'HeatMap data', monthArr));
});

const getRevisionListHandler = asyncHandler(async(req, res) => {
    const problems = await Problem.find({user: req.user._id});

    if(problems.length == 0){
      return res.status(200).json(new ApiResponse(200, "No problems found", []));
    }

    const today = new Date();
    today.setHours(0,0,0,0);

    const revisionIntervals = [0,1, 2, 5, 7, 15];

    const result = problems.filter(problem => {
        const createdAt = new Date(problem.createdAt);
        createdAt.setHours(0,0,0,0);

        const dayDiff = Math.round((today - createdAt) / 1000 * 60 * 60 * 24);

        return revisionIntervals.includes(dayDiff);
    })
    
    return res.status(200).json(new ApiResponse(200, "Today's problems list", result));
});

const deleteProblemHandler = asyncHandler(async(req, res) => {
    const problemId = req.params.id;

    const problem = await Problem.findOne({_id: problemId, user: req.user._id});

    if(!problem){
        return res.status(404).json(new ApiResponse(404, "Problem not found"));
    }

    await Problem.findByIdAndDelete(problemId);

    return res.status(200).json(new ApiResponse(200, "Problem deleted"));
})

module.exports = {getRevisionListHandler, getHeatMapHandler, getCompletedCountHandler, totalCountHandler, getProblemsHandler, updateProblemHandler, saveProblemsHandler, deleteProblemHandler};