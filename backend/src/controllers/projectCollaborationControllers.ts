import express from 'express';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import {
    secret,
    jwt_token_expire,
    frontend_url,
    email_user,
    email_password,
} from '../envconfig';

import { getUserByEmail } from '../helpers/userHelpers';
import { getProjectById } from '../helpers/projectHelpers';

export const sendCollaborationEmail = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { projectId } = req.params;
        const { userEmail } = req.body;

        if (!projectId && !userEmail)
            return res
                .status(400)
                .json({ message: 'Please provide project ID and user Email!' })
                .end();

        const user = await getUserByEmail(userEmail);
        const project = await getProjectById(projectId);

        if (!user && !project)
            return res
                .status(404)
                .json({ message: 'User or Project not found' })
                .end();

        // Generate a secure token
        const token = jwt.sign({ userId: user._id, projectId }, secret, {
            expiresIn: jwt_token_expire,
        });

        // generate accept and decline links
        const baseURL = frontend_url;
        const acceptLink = `${frontend_url}/api/project-collaboration/invitations/accept?token=${token}`;
        const declineLink = `${frontend_url}/api/project-collaboration/invitations/decline?token=${token}`;

        // send email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: email_user,
                pass: email_password,
            },
        });

        const mailOptions = {
            from: email_user,
            to: user.email,
            subject: 'Project Collaboration Invitation',
            html: `
            <p>You have been invited to collaborate on the project: <strong>${project.name}</strong></p>
            <p>Click below to accept or decline the invitation:</p>
            <p>
            <a href="${acceptLink}" style="color: green; font-weight: bold;" target="_blank">Accept Invitation</a>
            </p>
            <p>
            <a href="${declineLink}" style="color: red; font-weight: bold;" target="_blank">Decline Invitation</a>
            </p>
            `,
        };

        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email: ', error);
            } else {
                console.log('Email sent: ', info.response);
            }
        });
        return res
            .status(200)
            .json({ message: 'Invitation send via email!' })
            .end();
    } catch (error) {
        console.error(error);
        return res
            .status(400)
            .json({ message: 'Something went wrong!', error })
            .end();
    }
};

export const handleInvitationResponse = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { token } = req.query;
        if (typeof token !== 'string')
            return res
                .status(400)
                .json({ message: 'Invalid token format!' })
                .end();

        const decoded = jwt.verify(token, secret);
        const { userId, projectId } = decoded;

        const collaboration = L;
    } catch (error) {
        console.error(error);
        return res
            .status(400)
            .json({ message: 'Something went wrong!', error });
    }
};
