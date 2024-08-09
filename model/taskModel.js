const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },
  assignedTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
