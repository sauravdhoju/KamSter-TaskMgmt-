import express from 'express';

import authenticationRouter from './authenticationRouter';
import userRouter from './userRouter';
import taskListRouter from './taskListRouter';
import taskRouter from './taskRouter';
import projectRouter from './projectRouter';
import projectCollaborationRouter from './projectCollaborationRouter';
import boardRouter from './boardRouter';
import cardRotuer from './cardRotuer';

const router = express.Router();

export default (): express.Router => {
    authenticationRouter(router);
    userRouter(router);
    taskListRouter(router);
    taskRouter(router);
    projectRouter(router);
    projectCollaborationRouter(router);
    boardRouter(router);
    cardRotuer(router);
    return router;
};
