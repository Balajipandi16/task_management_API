const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

// Create task
router.post('/', async (req, res) => {
  const task = new Task({ ...req.body, assignedTo: req.user._id });
  await task.save();
  req.app.get('io').emit('taskCreated', task);
  res.json(task);
});

// Get all tasks
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

module.exports = router;
