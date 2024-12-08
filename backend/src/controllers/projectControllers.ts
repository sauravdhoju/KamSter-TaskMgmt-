import express from 'express';
import { get } from 'lodash';

import {
    createNewProject,
    deleteProjectById,
    getAllProjects,
    getProjectById,
} from '../helpers/projectHelpers';

export const createProject = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const currentUserId = get(req, 'identity._id') as string;
        const { name, description } = req.body;
        if (!name)
            return res
                .status(400)
                .json({ message: 'ERROR: Please provide user name!' })
                .end();

        const newProject: {
            admin_id: string;
            name: string;
            description?: string;
        } = {
            admin_id: currentUserId,
            name,
        };

        if (description) newProject.description = description;

        const createdProject = await createNewProject(newProject);

        return res
            .status(200)
            .json({ message: 'Successfully created project!', createdProject });
    } catch (error) {
        console.error(error);
        return res
            .status(400)
            .json({ message: 'Something went wrong!', error });
    }
};

export const udpateProject = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { projectId } = req.params;
        const { name, description } = req.body;

        if (!name && !description)
            return res
                .status(400)
                .json({ message: 'Please provide attribute to update!' })
                .end();

        const projectToUpdate = await getProjectById(projectId);

        if (name) projectToUpdate.name = name;
        if (description) projectToUpdate.description = description;

        projectToUpdate.updated_at = new Date(Date.now());
        await projectToUpdate.save();

        return res
            .status(200)
            .json({
                message: 'Successfully udpated project!',
                updatedProject: projectToUpdate,
            })
            .end();
    } catch (error) {
        console.error(error);
        return res
            .status(400)
            .json({ message: 'Something went wrong!', error });
    }
};

export const getProjects = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const currentUserId = get(req, 'identity._id') as string;

        const projects = await getAllProjects(currentUserId);

        return res
            .status(200)
            .json({ message: 'Successfully retrieved all projects!', projects })
            .end();
    } catch (error) {
        return res
            .status(400)
            .json({ message: 'Something went wrong!', error })
            .end();
    }
};

export const deleteProject = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { projectId } = req.params;
        const deletedProject = await deleteProjectById(projectId);
        if (!deleteProject)
            return res
                .status(404)
                .json({ message: 'Project not found!' })
                .end();

        return res
            .status(200)
            .json({ message: 'Project deleted successfully!', deletedProject })
            .end();
    } catch (error) {
        console.error(error);
        return res
            .status(400)
            .json({ message: 'Something went wrong!', error })
            .end();
    }
};
