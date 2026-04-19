const ApiResponse = require('../utils/api-response');

const errorHandler = (err, req, res, next) => {
   const statusCode = err.statusCode || 500;
   const message = err.message || "Internal server error";

   return res.status(statusCode).json(new ApiResponse(statusCode, message));
}

module.exports = errorHandler;