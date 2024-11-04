require('dotenv').config();
const express = require('express');
const mongoose = require('./config/db');
const http = require('http');
const socketIo = require('socket.io');
const passport = require('passport');
require('./config/passport')(passport);

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { verifyToken } = require('./middleware/auth');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(passport.initialize());
app.use('/auth', authRoutes);
app.use('/tasks', verifyToken, taskRoutes);

// Real-time notifications with Socket.IO
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Notify clients of task changes
app.set('io', io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
