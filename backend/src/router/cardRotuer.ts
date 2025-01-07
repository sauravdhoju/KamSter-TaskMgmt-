import express from 'express';

import {
    createCard,
    updateCard,
    deleteCard,
} from '../controllers/cardControllers';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
    router.post('/api/board/card/', isAuthenticated, createCard);
    router.patch('/api/board/card/:cardId', isAuthenticated, updateCard);
    router.delete('/api/board/card/:cardId', isAuthenticated, deleteCard);
};
