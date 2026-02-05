const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const {
  validateCreatePost,
  validateUpdatePost
} = require("../middleware/validatePost");

const asyncHandler = require("../utils/asyncHandler");

const postController = require("../controllers/postController");

// GET ALL POSTS
router.get("/", postController.getAllPosts);

// GET POST BY ID
router.get("/:id", postController.getPostById);

// CREATE POST
router.post(
  "/",
  auth,
  validateCreatePost,
  asyncHandler(postController.createPost)
);

// UPDATE POST
router.put(
  "/:id",
  auth,
  validateUpdatePost,
  asyncHandler(postController.updatePost)
);

// DELETE POST
router.delete(
  "/:id",
  auth,
  asyncHandler(postController.deletePost)
);

module.exports = router;
