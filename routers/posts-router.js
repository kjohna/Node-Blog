const express = require('express');

const postDb = require('../data/helpers/postDb.js');

const router = express.Router();

// posts-router responds to requests to '/api/posts' see server.js

// return all posts:
router.get('/', async(req, res) => {
  try {
    // console.log('hello from here');
    const posts = await postDb.get();
    res.status(200).json(posts);
    return;
  } catch {
    res.status(500).json({ error: "The posts could not be retrieved." });
  }
});

module.exports = router;