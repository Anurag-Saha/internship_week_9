const ApiError = require("../utils/ApiError");

exports.validateCreatePost = (req, res, next) => {
  const { title, content } = req.body;

  if (!title || !content) {
    throw new ApiError(400, "Title and content are required");
  }

  next();
};

exports.validateUpdatePost = (req, res, next) => {
  const { title, content } = req.body;

  if (!title && !content) {
    throw new ApiError(
      400,
      "At least one field (title or content) must be provided"
    );
  }

  next();
};
