module.exports.validateCreatePost = (req, res, next) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      error: 'Title and content are required'
    });
  }

  next();
};

module.exports.validateUpdatePost = (req, res, next) => {
  const { title, content } = req.body;

  if (!title && !content) {
    return res.status(400).json({
      error: 'At least one field (title or content) must be provided'
    });
  }

  next();
};
