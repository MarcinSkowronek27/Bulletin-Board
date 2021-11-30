const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({ status: 'published' })
      .select('author created title photo')
      .sort({ created: -1 });
    if (!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post
      .findById(req.params.id);
    if (!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.post('/posts/add', async (req, res) => {
  try {
    const { author, title, text, photo, created, updated, status, price, phone, location } = req.body;

    if (created && updated && status && title.length >= 10 && text.length >= 20 && author.includes('@')) {
      // res.json({ message: 'OK' });
      const newPost = new Post({
        author, created, title, updated, text, photo, phone, location, status, price,
      });
      await newPost.save();
      if (!newPost) res.status(404).json({ post: 'Not found' });
      else res.json(newPost);
    }
    else {
      // res.json({ message: 'something went wrong' });
      throw new Error('Wrong input!');
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
