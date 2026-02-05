const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

/**
 * Temporary in-memory data
 * (Later we’ll replace this with a database)
 */
let posts = [];

// GET all posts (public)
router.get('/', (req, res) => {
  res.json(posts);
});

// GET post by ID (public)
router.get('/:id', (req, res) => {
  const post = posts.find(p => p.id === Number(req.params.id));

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  res.json(post);
});

// CREATE post (protected)
router.post('/', auth, (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      error: 'Title and content are required'
    });
  }

  const newPost = {
    id: Date.now(),
    title,
    content,
    author: req.user.id, // comes from JWT
    createdAt: new Date().toISOString()
  };

  posts.push(newPost);

  res.status(201).json(newPost);
});

// UPDATE post (protected)
router.put('/:id', auth, (req, res) => {
  const post = posts.find(p => p.id === Number(req.params.id));

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;

  res.json(post);
});

// DELETE post (protected)
router.delete('/:id', auth, (req, res) => {
  posts = posts.filter(p => p.id !== Number(req.params.id));
  res.json({ message: 'Post deleted successfully' });
});

module.exports = router;
