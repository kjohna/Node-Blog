const express = require('express');

const postsRouter = require('./routers/posts-router.js');
const usersRouter = require('./routers/users-router.js');

const server = express();

server.use(express.json());

server.use('/api/posts', postsRouter); // posts route handlers
server.use('/api/users', usersRouter); // users route handlers

server.get('/', (req, res) => {
  res.send(`<h2>Server says Hi</h2>`);
});

module.exports = server;