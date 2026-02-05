const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const {
  validateCreatePost,
  validateUpdatePost
} = require("../middleware/validatePost");

const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

let posts = [];

// GET ALL POSTS
router.get("/", (req, res) => {
  res.json(posts);
});

// GET POST BY ID
router.get("/:id", (req, res, next) => {
  const post = posts.find(p => p.id === Number(req.params.id));

  if (!post) {
    return next(new ApiError(404, "Post not found"));
  }

  res.json(post);
});

// CREATE POST
router.post(
  "/",
  auth,
  validateCreatePost,
  asyncHandler(async (req, res) => {
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
  })
);

// UPDATE POST
router.put(
  "/:id",
  auth,
  validateUpdatePost,
  asyncHandler(async (req, res, next) => {
    const post = posts.find(p => p.id === Number(req.params.id));

    if (!post) {
      return next(new ApiError(404, "Post not found"));
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    res.json(post);
  })
);

// DELETE POST
router.delete(
  "/:id",
  auth,
  asyncHandler(async (req, res, next) => {
    const post = posts.find(p => p.id === Number(req.params.id));

    if (!post) {
      return next(new ApiError(404, "Post not found"));
    }

    posts = posts.filter(p => p.id !== Number(req.params.id));

    res.json({ message: "Post deleted successfully" });
  })
);

module.exports = router;
