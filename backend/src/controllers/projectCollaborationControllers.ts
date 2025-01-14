import express from 'express';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { get } from 'lodash';

import {
    secret,
    jwt_token_expire,
    frontend_url,
    email_user,
    email_password,
} from '../envconfig';

import { getUserByEmail, getUserById } from '../helpers/userHelpers';
import { getProjectById } from '../helpers/projectHelpers';
import {
    createProjectCollab,
    updateProjectCollabStatus,
    deleteProjectCollab,
    getProjectCollabById,
    getCollaboratingProjectsByUserId,
} from '../helpers/projectCollaborationHelpers';

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
        // save a pending collaboration
        const newProjectCollab = await createProjectCollab({
            user_id: user._id,
            project_id: project._id,
        });

        // Generate a secure token
        const token = jwt.sign(
            { userId: user._id, projectId, collabId: newProjectCollab._id },
            secret,
            {
                expiresIn: jwt_token_expire,
            }
        );

        // generate accept and decline links
        const baseURL = frontend_url;
        const acceptLink = `${baseURL}/api/project-collaboration/invitations/accept?token=${token}`;
        const declineLink = `${baseURL}/api/project-collaboration/invitations/decline?token=${token}`;

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
            .json({ message: 'Invitation send via email!', newProjectCollab })
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
        const { action } = req.body;
        if (typeof token !== 'string')
            return res
                .status(400)
                .json({ message: 'Invalid token format!' })
                .end();

        let decoded: { userId: string; projectId: string; collabId: string };

        try {
            decoded = jwt.verify(token, secret) as {
                userId: string;
                projectId: string;
                collabId: string;
            };
        } catch (error) {
            return res
                .status(400)
                .json({ message: 'Invalid or expired token!' })
                .end();
        }

        const { userId, projectId, collabId } = decoded;

        // check if the collaborating user and project exits
        const collabUser = await getUserById(userId);
        if (!collabUser)
            return res.status(404).json({ message: 'User not found!' }).end();
        const collabProject = await getProjectById(projectId);
        if (!collabProject)
            return res
                .status(404)
                .json({ message: 'Project not found!' })
                .end();

        // validate the action
        if (!['accept', 'decline'].includes(action)) {
            return res
                .status(400)
                .json({
                    message:
                        "Invalid action! Please use 'accept' or 'decline'.",
                })
                .end();
        }

        const projectAdminId = collabProject.admin_id.toString();
        console.log(projectAdminId);
        const projectAdmin = await getUserById(projectAdminId);
        if (!projectAdmin)
            return res
                .status(404)
                .json({ message: 'Project Admin not found!' })
                .end();

        const projectAdminEmail = projectAdmin.email;

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

        const mailOptions: {
            from: string;
            to: string;
            subject: string;
            html?: string;
        } = {
            from: email_user,
            to: projectAdminEmail,
            subject: 'Project Invitation Response',
        };
        if (action === 'accept') {
            mailOptions.html = `
            <p>Your invitation to the user <strong>${collabUser.username}</strong> for the project: <strong>${collabProject.name}</strong></p>
            <p>Has been accepted!</p>
            `;
            const updatedProjectCollab = await updateProjectCollabStatus(
                collabId,
                {
                    collabStatus: 'accepted',
                }
            );
            await transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email: ', error);
                } else {
                    console.log('Email sent: ', info.response);
                }
            });
            return res
                .status(200)
                .json({
                    message: 'Project collaboration accepted!',
                    updatedProjectCollab,
                })
                .end();
        }
        const deletedProjectCollab = await deleteProjectCollab(collabId);
        mailOptions.html = `
            <p>Your invitation to the user <strong>${collabUser.username}</strong> for the project: <strong>${collabProject.name}</strong></p>
            <p>Has been declined!</p>
            `;
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email: ', error);
            } else {
                console.log('Email sent: ', info.response);
            }
        });
        return res
            .status(200)
            .json({
                message: 'Project collaboration declined!',
                deletedProjectCollab,
            })
            .end();
    } catch (error) {
        console.error(error);
        return res
            .status(400)
            .json({ message: 'Something went wrong!', error });
    }
};

export const deleteCollaborationInvitation = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { collabId } = req.params;

        const projectCollab = await getProjectCollabById(collabId);

        if (!projectCollab)
            return res
                .status(404)
                .json({ message: 'Project Collaboration not found!' });
        if (projectCollab.collabStatus !== 'pending')
            return res
                .status(400)
                .json({ message: 'Project invitation already accepted!' })
                .end();

        const deletedProjectCollabInvitation = await deleteProjectCollab(
            collabId
        );
        return res.status(200).json({
            message: 'Collaboration invitation deleted successfully!',
            deletedProjectCollabInvitation,
        });
    } catch (error) {
        return res
            .status(400)
            .json({ message: 'Something went wrong!', error });
    }
};

export const getCollaboratingProjects = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const userId = get(req, 'identity._id') as string;
        if (!userId)
            return res
                .status(403)
                .json({ message: 'You cannot perform this action!' })
                .end();

        const collaboratingProjects = await getCollaboratingProjectsByUserId(
            userId
        );

        if (!collaboratingProjects)
            return res
                .status(404)
                .json({ message: 'No collaborations found!' })
                .end();

        return res
            .status(200)
            .json({
                message: 'Collaborations retrieved successfully!',
                collaboratingProjects,
            })
            .end();
    } catch (error) {
        return res
            .status(400)
            .json({ message: 'Cannot get collaborating projects!', error })
            .end();
    }
};
