import express from 'express';

import { sendCollaborationEmail } from '../controllers/projectCollaborationControllers';
import { isAuthenticated, isProjectOwner } from '../middlewares';
export default (router: express.Router) => {
    router.post(
        '/api/project-collaboration/invite/:projectId',
        isAuthenticated,
        isProjectOwner,
        sendCollaborationEmail
    );
};
