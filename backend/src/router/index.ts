import express from 'express';

import authenticationRouter from './authenticationRouter';
import userRouter from './userRouter';
import taskListRouter from './taskListRouter';
import tasksRouter from './tasksRouter';

const router = express.Router();

export default (): express.Router => {
    authenticationRouter(router);
    userRouter(router);
    taskListRouter(router);
    tasksRouter(router);
    return router;
};
