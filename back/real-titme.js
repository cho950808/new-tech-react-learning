const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors());

let data = {
  revenue: 10000,
  users: 1000,
  sales: 500,
};

const generateRandomData = () => {
  data = {
    revenue: Math.random() * 10000,
    users: Math.floor(Math.random() * 10000),
    sales: Math.floor(Math.random() * 5000),
  };
};

setInterval(() => {
  generateRandomData();
  io.emit('data', data);
}, 10000);

server.listen(4000, () => {
  console.log('Server is running on port 4000');
});