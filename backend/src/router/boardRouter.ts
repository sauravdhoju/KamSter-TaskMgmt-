import express from 'express';

import {
    createBoard,
    getBoardsOfProject,
    deleteBoard,
    updateBoardName,
    getAllCardsAndBoards,
} from '../controllers/boardControllers';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
    router.post('/api/project/board/:projectId', isAuthenticated, createBoard);
    router.get(
        '/api/project/boards/:projectId',
        isAuthenticated,
        getBoardsOfProject
    );
    router.delete('/api/project/board/:boardId', isAuthenticated, deleteBoard);
    router.patch(
        '/api/project/board/:boardId',
        isAuthenticated,
        updateBoardName
    );
    router.get(
        '/api/project/boards/cards/:projectId',
        isAuthenticated,
        getAllCardsAndBoards
    );
};
