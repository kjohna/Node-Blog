const express = require('express');

const postsRouter = require('./routers/posts-router.js');
const usersRouter = require('./routers/users-router.js');

const server = express();

function capEnforcer(req, res, next) {
  const name = req.body.name;
  console.log("capEnforcer: ", name);
  if (name) {
    req.body.name = name.toUpperCase();
  }
  next();
}

server.use(express.json());

// server.use(capEnforcer); // ensure all user's names are caps'd before reaching route handlers
server.use('/api/posts', postsRouter); // posts route handlers
server.use('/api/users', capEnforcer, usersRouter); // users route handlers

server.get('/', (req, res) => {
  res.send(`<h2>Server says Hi</h2>`);
});

module.exports = server;