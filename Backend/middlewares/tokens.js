import jwt from "jsonwebtoken";
import User from "../Models/usermodel.js";
import ApiResponse from "../Utils/ApiResponse.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json(new ApiResponse(401, "No token, authorization denied", null, false));
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    // Attach user (without password)
    req.user = user;

    if (!req.user) {
      return res
        .status(404)
        .json(new ApiResponse(404, "User not found", null, false));
    }

    next();
  } catch (err) {
    return res
      .status(403)
      .json(new ApiResponse(403, "Invalid or expired token", null, false));
  }
};
