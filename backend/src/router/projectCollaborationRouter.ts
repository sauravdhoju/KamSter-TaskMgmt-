import express from 'express';

import {
    sendCollaborationEmail,
    handleInvitationResponse,
    deleteCollaborationInvitation,
    getCollaboratingProjects,
} from '../controllers/projectCollaborationControllers';
import { isAuthenticated, isProjectOwner } from '../middlewares';
export default (router: express.Router) => {
    router.post(
        '/api/project-collaboration/invite/:projectId',
        isAuthenticated,
        isProjectOwner,
        sendCollaborationEmail
    );
    router.patch('/api/project-collaboration/invite', handleInvitationResponse);
    router.delete(
        '/api/project-collaboration/invite/delete/:projectId/:collabId',
        isAuthenticated,
        isProjectOwner,
        deleteCollaborationInvitation
    );
    router.get(
        '/api/project-collaboration',
        isAuthenticated,
        getCollaboratingProjects
    );
};
