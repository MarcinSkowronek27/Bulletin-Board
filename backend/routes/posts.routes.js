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
    // console.log('tutaj nie działa1');
    res.status(500).json(err);
  }
});

router.post('/posts/add', async (req, res) => {
  try {
    const { author, title, text, photo, status, price, phone, location } = req.body;

    if (title.length > 10 && text.length > 20 && author.includes('@')) {
      const currentDate = new Date().toISOString();
      res.json({ message: 'OK' });

      const newPost = new Post({
        author,
        title,
        created: currentDate,
        updated: currentDate,
        status,
        text,
        photo,
        price,
        phone,
        location,
      });
      await newPost.save();
      if (!newPost) res.status(404).json({ post: 'Not found' });
      else res.json(newPost);
    }
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
    // console.log('tutaj nie działa2');
    res.status(500).json(err);
  }
});


module.exports = router;
