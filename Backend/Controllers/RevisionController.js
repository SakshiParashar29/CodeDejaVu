import { Problems } from "../Models/problems.js";
import ApiResponse from "../Utils/ApiResponse.js";

export const Revision = async(req, res) => {
    const problems = await Problems.find({user: req.user._id});

    const currDate = new Date();
    currDate.setHours(0, 0, 0, 0);

    let revisionProblems = [];

    for(let i = 0; i < problems.length; i++){
        let createdDate = new Date(problems[i].createdAt);
        createdDate.setHours(0, 0, 0, 0);
        
        let diff = Math.round((currDate - createdDate)/(1000 * 60 * 60 * 24));
        if(diff == 0 || diff === 1 || diff === 2 || diff === 4 || diff === 7 || diff === 15){
            revisionProblems.push(problems[i]);
        }
    }

    return res.status(200).json(new ApiResponse(200, "Revised Problems ", revisionProblems, true));
}