import express from 'express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

import { secret, token_expire, jwt_token_expire } from '../envconfig';
import { authentication, random } from '../helpers/authenticationHelpers';
import { getUserByEmail, createUser } from '../helpers/userHelpers';

export const login = async (req: express.Request, res: express.Response) => {
    try {
        // get email and password sent with the request
        const { email, password } = req.body;
        // needs email and password
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: 'Email and Password requried!' })
                .end();
        }
        // can't access aauthentication salt and password if not passed in select
        const user = await getUserByEmail(email).select(
            '+authentication.salt +authentication.password'
        );

        if (!user) {
            return res
                .status(400)
                .json({ message: 'Account does not exist!' })
                .end();
        }

        // compare hash instead of directly comparing the passwords
        const expectedHash = authentication(user.authentication.salt, password);
        if (user.authentication.password !== expectedHash) {
            return res
                .status(403)
                .json({ message: 'Wrong email or password!' })
                .end();
        }

        // json web token to set in cookie for client session identification
        const jwt_token = jwt.sign(
            {
                id: user._id,
            },
            secret,
            { expiresIn: jwt_token_expire }
        );

        // needed options setup to set cookie
        const options = {
            domain: 'localhost', // client domain
            path: '/',
            httpOnly: true,
            maxAge: parseInt(token_expire),
        };

        // save the session token to the user entry
        user.authentication.sessionToken = jwt_token;
        await user.save();

        const currentUser = {
            id: user._id,
            username: user.username,
            name: user.name,
            email: user.email,
        };

        return res
            .status(200)
            .cookie('jwt_token', jwt_token, options)
            .json({
                message: 'Logged in successfully!',
                jwt_token,
                currentUser,
                success: true,
            })
            .end();
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Something went wrong!' }).end();
    }
};

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { name, email, password, username } = req.body;
        if (!email || !password || !username) {
            return res
                .status(400)
                .json({ message: 'Required values not provided!' });
        }

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json('User already exists!');
        }

        const salt = random();
        const user = await createUser({
            email,
            name,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });

        const createdUser = {
            name: user.name,
            username: user.username,
            email: user.email,
        };

        return res
            .status(200)
            .json({ message: 'Registered Successfully', createdUser })
            .end();
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Something went wrong!' }).end();
    }
};
