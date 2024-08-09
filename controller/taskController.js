const Task = require('../model/taskModel');

const createTask = async (req, res) => {
  const { title, description, assignedTo } = req.body;
  const userId = req.user.id;

  const newTask = new Task({
    title,
    description,
    assignedTo, // Array of user IDs
    createdBy: userId
  });

  try {
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const viewTasks = async (req, res) => {
  const userId = req.user.id;
  const userRole = req.user.role;

  try {
    let tasks;

    if (userRole === 'ADMIN') {
      tasks = await Task.find().populate('assignedTo', 'username');
    } else if (userRole === 'MANAGER') {
      tasks = await Task.find({ createdBy: userId }).populate('assignedTo', 'username');
    } else {
      tasks = await Task.find({ assignedTo: userId }).populate('assignedTo', 'username');
    }

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, status, assignedTo } = req.body;
  const userId = req.user.id;
  const userRole = req.user.role;

  try {
    let task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (userRole === 'MANAGER' && task.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.assignedTo = assignedTo || task.assignedTo;

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};




const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  const userId = req.user.id;
  const userRole = req.user.role;

  try {
    let task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (userRole === 'MANAGER' && task.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Task.findByIdAndDelete(taskId)
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createTask,
  viewTasks,
  updateTask,
  deleteTask
}