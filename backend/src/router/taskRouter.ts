import express from 'express';
import { addTask, updateTask, deleteTask } from '../controllers/taskController';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
    router.post('/api/task/add', isAuthenticated, addTask);
    router.patch('/api/task/update/:taskId', isAuthenticated, updateTask);
    router.delete('/api/task/delete/:taskId', isAuthenticated, deleteTask);
};
