import User from '../Models/usermodel.js'
import bcrypt from "bcrypt"
import ApiResponse from '../Utils/ApiResponse.js'
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const user = await User.findOne({ email });
        if (user)
            return res
                .status(400)
                .json(new ApiResponse(400, "User already exist!", null, true));

        const saltRounds = 10;
        const hashPassCode = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({ username, email, password: hashPassCode });
        
         const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.status(201).json(new ApiResponse(201, "Welcome to  feel DejaVu", {user: newUser, token}, true));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, error.message, null, false));
    }
} 


// SignIn
export const signIn = async (req, res) => {
    try {
        const {identifier, password } = req.body;
        
        const user = await User.findOne({ 
            $or: [{email: identifier}, {username: identifier}]
         });
        if (!user) {
            return res
                .status(404)
                .json(new ApiResponse(404, "User not found", null, false));
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(401)
                .json(new ApiResponse(401, "Invalid credentials", null, false));
        }
        
        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: "7d" }
        );

        return res
            .status(200)
            .json(new ApiResponse(200, "Login successful", {user, token}, true));

    } catch (error) {
        return res
            .status(500)
            .json(new ApiResponse(500, error.message, null, false));
    }
};


//Getting the profile pic
export const getProfile = async(req, res) => {
    const user = await User.findById(req.user._id);

    if(!user)
    {
        return res.status(404).json(new ApiResponse(404, "user not found", user, false));
    }

    return res.status(200).json(new ApiResponse(200, "Successfully fetched", {username: user.username}, null));
}