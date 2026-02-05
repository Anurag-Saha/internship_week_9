const express = require('express');
const router = express.Router();

/**
 * Temporary in-memory data
 * (Later we’ll replace this with a database)
 */
let posts = [];

// GET all posts
router.get('/', (req, res) => {
  res.json(posts);
});

// GET post by ID
router.get('/:id', (req, res) => {
  const post = posts.find(p => p.id === Number(req.params.id));

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  res.json(post);
});

// CREATE post
router.post('/', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res
      .status(400)
      .json({ error: 'Title and content are required' });
  }

  const newPost = {
    id: Date.now(),
    title,
    content,
    createdAt: new Date().toISOString()
  };

  posts.push(newPost);

  res.status(201).json(newPost);
});

// UPDATE post
router.put('/:id', (req, res) => {
  const post = posts.find(p => p.id === Number(req.params.id));

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;

  res.json(post);
});

// DELETE post
router.delete('/:id', (req, res) => {
  posts = posts.filter(p => p.id !== Number(req.params.id));
  res.json({ message: 'Post deleted successfully' });
});

module.exports = router;
