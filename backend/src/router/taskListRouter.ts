import express from 'express';

import { isAuthenticated } from '../middlewares';
import {
    createTaskList,
    getTaskLists,
    updateTaskListName,
    deleteTaskList,
} from '../controllers/taskListController';
export default (router: express.Router) => {
    router.post('/api/task-lists/create', isAuthenticated, createTaskList);
    router.get('/api/task-lists/get', isAuthenticated, getTaskLists);
    router.patch(
        '/api/task-lists/rename/:id',
        isAuthenticated,
        updateTaskListName
    );
    router.delete(
        '/api/task-lists/delete/:id',
        isAuthenticated,
        deleteTaskList
    );
};
