import express from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../helpers/userHelpers';
import { getTaskList } from '../helpers/taskListHelpers';

// checks if there is a sessionToken and if it matches with one of the existing user entries
export const isAuthenticated = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const sessionToken = req.cookies['jwt_token']; // 'jwt_token' name set during creation of token

        // return error if there is no sessionToken
        if (!sessionToken) {
            return res
                .status(403)
                .json({ message: 'You are not authenticated!' })
                .end();
        }

        // checks if there is an entry among users that matches above sessionToken
        const existingUser = await getUserBySessionToken(sessionToken);
        if (!existingUser) {
            return res
                .status(403)
                .json({ message: 'You are not authenticated' })
                .end();
        }

        // if the user exists with above session token then merge the 'identity' property with request
        merge(req, { identity: existingUser });
        return next(); // call next function thingy
    } catch (error) {
        console.log(error);
        return res
            .status(400)
            .json({ message: 'Something went wrong!', error: error })
            .end();
    }
};

// Checks if the id of user with sessionToken that was sent as 'identity' above  matches that of the requested id
// i.e., checks if the requesting user is the owner of the account with requested id
export const isOwner = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as string;
        if (!currentUserId) {
            return res
                .status(403)
                .json('You are not authenticated to perform this action!');
        }
        if (currentUserId.toString() !== id) {
            return res
                .status(403)
                .json('You are not authorized to perform this action!');
        }
        return next();
    } catch (error) {
        console.log(error);
        return res
            .status(400)
            .json({ message: 'Something went wrong!', error: error });
    }
};

export const isTaskListOwner = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const currentUserId = get(req, 'identity._id') as string;
        const { taskListId } = req.params;
        const taskList = await getTaskList(taskListId);

        if (!taskList.user_id.equals(currentUserId))
            return res
                .status(403)
                .json({ message: 'You are not authorized!' })
                .end();

        if (!taskListId) {
            return res
                .status(400)
                .json({ message: 'Please provide task list id!' })
                .end();
        }

        return next();
    } catch (error) {
        console.error(error);
        return res
            .status(400)
            .json({ message: 'Something went wrong!', error })
            .end();
    }
};
