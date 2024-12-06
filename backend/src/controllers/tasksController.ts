import express from 'express';
import TaskModel from '../models/taskSchema';
import { get } from 'lodash';

export const addTask = async (req: express.Request, res: express.Response) => {
    const { task } = req.body;
    const newTask = await TaskModel.create(task);
    return res.status(200).json({ message: 'Task Added!', newTask }).end();
};
