const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>Server says Hi</h2>`);
});

module.exports = server;