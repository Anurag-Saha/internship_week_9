const ApiError = require("../utils/ApiError");

let posts = [];

// GET ALL POSTS
exports.getAllPosts = (req, res) => {
  res.json(posts);
};

// GET POST BY ID
exports.getPostById = (req, res, next) => {
  const post = posts.find(p => p.id === Number(req.params.id));

  if (!post) {
    return next(new ApiError(404, "Post not found"));
  }

  res.json(post);
};

// CREATE POST
exports.createPost = (req, res) => {
  const { title, content } = req.body;

  const newPost = {
    id: Date.now(),
    title,
    content,
    author: req.user.id,
    createdAt: new Date().toISOString()
  };

  posts.push(newPost);

  res.status(201).json(newPost);
};

// UPDATE POST
exports.updatePost = (req, res, next) => {
  const post = posts.find(p => p.id === Number(req.params.id));

  if (!post) {
    return next(new ApiError(404, "Post not found"));
  }

  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;

  res.json(post);
};

// DELETE POST
exports.deletePost = (req, res, next) => {
  const post = posts.find(p => p.id === Number(req.params.id));

  if (!post) {
    return next(new ApiError(404, "Post not found"));
  }

  posts = posts.filter(p => p.id !== Number(req.params.id));

  res.json({ message: "Post deleted successfully" });
};
