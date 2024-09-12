import express from 'express';

import {
    deleteUser,
    getAllUsers,
    getCurrentUser,
    updateUser,
} from '../controllers/userControllers';

import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
    router.get('/api/user', isAuthenticated, getCurrentUser);
    router.get('/api/users', isAuthenticated, getAllUsers);
    router.delete('/api/user/:id', isAuthenticated, isOwner, deleteUser); // isAuthenticated should be first
    router.patch('/api/user/:id', isAuthenticated, isOwner, updateUser);
};
