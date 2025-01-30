import express from 'express';

import {
    createProject,
    deleteProject,
    getProjects,
    udpateProject,
} from '../controllers/projectControllers';
import { isAuthenticated, isProjectOwner } from '../middlewares';

export default (router: express.Router) => {
    router.post('/api/project/create', isAuthenticated, createProject);
    router.patch(
        '/api/project/update/:projectId',
        isAuthenticated,
        isProjectOwner,
        udpateProject
    );
    router.get('/api/project/get', isAuthenticated, getProjects);
    router.delete(
        '/api/project/delete/:projectId',
        isAuthenticated,
        isProjectOwner,
        deleteProject
    );
};
