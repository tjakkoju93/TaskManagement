const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controller/userController');
const { createTask, viewTasks, updateTask, deleteTask } = require('../controller/taskController');
const { authenticateToken, authorizeRole } = require('../middleware/authmiddleware');

// User routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Task routes
router.post('/create_tasks', authenticateToken, createTask);
router.get('/get_tasks', authenticateToken, viewTasks);
router.patch('/update_tasks/:taskId', authenticateToken, authorizeRole(['ADMIN', 'MANAGER']), updateTask);
router.delete('/delete_tasks/:taskId', authenticateToken, authorizeRole(['ADMIN', 'MANAGER']), deleteTask);

module.exports = router;
