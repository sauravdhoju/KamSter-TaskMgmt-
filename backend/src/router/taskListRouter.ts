import express from 'express';

import { isAuthenticated, isTaskListOwner } from '../middlewares';

import {
    createTaskList,
    getTaskLists,
    updateTaskListName,
    deleteTaskList,
    getTasksFromTaskList,
} from '../controllers/taskListController';
export default (router: express.Router) => {
    router.post('/api/task-lists/create', isAuthenticated, createTaskList);
    router.get('/api/task-lists/get', isAuthenticated, getTaskLists);
    router.get(
        '/api/task-lists/tasks/:taskListId',
        isAuthenticated,
        isTaskListOwner,
        getTasksFromTaskList
    );
    router.patch(
        '/api/task-lists/rename/:taskListId',
        isAuthenticated,
        isTaskListOwner,
        updateTaskListName
    );
    router.delete(
        '/api/task-lists/delete/:taskListId',
        isAuthenticated,
        isTaskListOwner,
        deleteTaskList
    );
};
