const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new ApiError(401, "No token provided");
  }

  if (!process.env.JWT_SECRET) {
    throw new ApiError(500, "JWT secret not configured");
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid token");
  }
};
