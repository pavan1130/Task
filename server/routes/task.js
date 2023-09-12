const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskId: String,
  taskName: String,
  assignedTo: String,
  priority: String,
  dueDate: Date,
  completion: Number,
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
