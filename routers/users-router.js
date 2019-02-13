const express = require('express');

const userDb = require('../data/helpers/userDb.js');

const router = express.Router();

// users-router responds to requests to '/api/users' see server.js

// return all users:
router.get('/', async(req, res) => {
  try {
    // console.log('hello from here');
    const users = await userDb.get();
    res.status(200).json(users);
    return;
  } catch {
    res.status(500).json({ error: "The users could not be retrieved." });
  }
});

// return user with matching :id
router.get('/:id', async(req, res) => {
  try {
    const user = await userDb.getById(req.params.id);
    console.log("user: ", user);
    if (user.length < 1) {
      res.status(404).json({ message: "No users found with that id." })
    } else {
      res.status(200).json(user)
    }
  } catch {
    res.status(500).json({ error: "The user could not be retrieved." })
  }
});

// return all posts matching user :id
router.get('/:id/posts', async(req, res) => {
  try {
    const userId = req.params.id;
    const posts = await userDb.getUserPosts(userId);
    if (posts.length < 1) {
      // check if user exists
      try {
        const user = await userDb.getById(userId);
        if (user.length < 1) {
          res.status(404).json({ message: "No users found with that id." });
        } else {
          res.status(404).json({ message: "User has no posts." });
        }
      } catch {
        res.status(500).json({ error: "The user could not be retrieved while searching for posts (is there a user by that ID?)." });
      }
    } else {
      // post(s) returned
      res.status(200).json(posts);
    }
  } catch {
    res.status(500).json({ error: "posts for that user could not be retrieved." });
  }
});

// insert new user to db, user data from req.body
router.post('/', async(req, res) => {
  try {
    const userData = req.body;
    if (!userData.name) {
      res.status(400).json({ error: "User name required for a user." });
    } else {
      newId = await userDb.insert(userData);
      res.status(200).json({ success: true, message: userData });
    }
  } catch {
    res.status(500).json({ error: "Saving user failed." });
  }
});

// delete a user matching :id
router.delete('/:id', async(req, res) => {
  try {
    const delId = req.params.id
    const numDeleted = await userDb.remove(delId);
    if (numDeleted < 1) {
      res.status(404).json({ message: "Could not find a user with that id." });
    } else {
      res.status(200).json({ message: `Successfully deleted user, id: ${delId}`});
    }
  } catch {
    res.status(500).json({ error: "The user could not be deleted." });
  }
});

// update a user matching :id
router.put('/:id', async(req, res) => {
  try {
    const putId = req.params.id;
    const userData = req.body;
    if (!userData.name) {
      res.status(400).json({ error: "Must provide name to update."})
    } else {
      const numUpdated = await userDb.update(putId, userData);
      if ( numUpdated < 1) {
        res.status(404).json({ error: `The user with id: ${putId} does not exist` });
      } else {
        // PUT was successful
        res.status(200).json({ message: `Successfully update user id: ${putId}`});
      }
    }
  } catch {
    res.status(500).json({ error: "The user could not be updated." });
  }
});

module.exports = router;