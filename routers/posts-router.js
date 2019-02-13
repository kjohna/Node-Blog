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

// return post with matching :id
router.get('/:id', async(req, res) => {
  try {
    const post = await postDb.getById(req.params.id);
    console.log("post: ", post);
    if (post.length < 1) {
      res.status(404).json({ message: "No posts found with that id." })
    } else {
      res.status(200).json(post)
    }
  } catch {
    res.status(500).json({ error: "The post could not be retrieved." })
  }
});

module.exports = router;