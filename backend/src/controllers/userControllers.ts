import express from 'express';
import { get } from 'lodash';

import { getUserById, deleteUserById, getUsers } from '../helpers/userHelpers';

// returns the user of current session
export const getCurrentUser = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const userId = get(req, 'identity._id') as string;
        if (!userId) {
            return res
                .status(403)
                .json({ message: 'You are not authenticated!' });
        }

        const user = await getUserById(userId);
        if (!user) {
            return res.status(403).json({ message: 'You are not authorized!' });
        }

        const userDetails = {
            id: user._id,
            username: user.username,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };

        return res
            .status(200)
            .json({ message: 'User authorized!', user: userDetails })
            .end();
    } catch (error) {
        console.log(error);
        return res
            .status(400)
            .json({ message: 'Something went wrong!', error: error })
            .end();
    }
};

// returns all the users
export const getAllUsers = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const users = await getUsers();

        return res
            .status(200)
            .json({ message: 'User authorized!', users })
            .end();
    } catch (error) {
        console.log(error);
        return res
            .status(400)
            .json({ message: 'Something went wrong!', error })
            .end();
    }
};

// deletes user requested by id
export const deleteUser = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { id } = req.params; // param from the url

        const deletedUser = await deleteUserById(id);

        if (!deletedUser) {
            return res
                .status(400)
                .json({ message: 'Something went wrong!' })
                .end();
        }

        return res
            .status(200)
            .clearCookie('jwt_token')
            .json({ message: 'User deleted successfully', deletedUser })
            .end();
    } catch (error) {
        console.log(error);
        return res
            .status(400)
            .json({ message: 'Something went wrong!', error })
            .end();
    }
};

// updates user's username by comparing id
export const updateUser = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { id } = req.params;
        // can take in multiple values (phone no for example if we choose to include it)
        const { username } = req.body;

        if (!username) {
            return res
                .status(400)
                .json({ message: 'Something went wrong!' })
                .end();
        }

        const user = await getUserById(id);
        if (!user) {
            return res
                .status(400)
                .json({ message: 'Something went wrong!' })
                .end();
        }

        user.username = username;
        user.updated_at = new Date(Date.now());
        await user.save();

        return res
            .status(200)
            .json({ message: 'User updated successfully!', user })
            .end();
    } catch (error) {
        console.log(error);
        return res
            .status(400)
            .json({ message: 'Something went wrong!', error });
    }
};
