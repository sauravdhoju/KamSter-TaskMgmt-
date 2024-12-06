import express from 'express';
import { addTask } from '../controllers/tasksController';

export default (router: express.Router) => {
    router.post('/api/task/add', addTask);
};
