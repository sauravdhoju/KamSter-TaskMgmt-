import express from 'express';
import TaskListModel from '../models/taskListSchema';
import { get } from 'lodash';

export const createTaskList = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const userId = get(req, 'identity._id');
        if (!userId) {
            return res.status(401).json({
                message: 'ERROR: You must be logged in to perform this action!',
            });
        }
        const { task_list_name } = req.body;
        if (!task_list_name) {
            return res
                .status(400)
                .json({ message: 'ERROR: You must provide task list name!' });
        }
        const newTaskList = {
            user_id: userId,
            task_list_name,
        };
        const createdTaskList = await TaskListModel.create(newTaskList);

        return res
            .status(200)
            .json({ message: 'New list created!', createdTaskList });
    } catch (error) {
        console.error(error);
        return res
            .status(400)
            .json({ message: "New list couldn't be added!", error });
    }
};

export const getTaskLists = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const userId = get(req, 'identity._id');
        if (!userId)
            return res
                .status(403)
                .json({
                    message:
                        "ERROR: You aren't authenticated to perform this action!",
                })
                .end();
        const taskLists = await TaskListModel.find();
        return res
            .status(200)
            .json({ message: 'Successfully retrieved task lists!', taskLists })
            .end();
    } catch (error) {
        console.error(error);
        return res
            .status(400)
            .json({ message: "ERROR: Couldn't fetch taskLists!", error })
            .end();
    }
};

export const updateTaskListName = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const userId = get(req, 'identity._id');
        if (!userId)
            return res
                .status(403)
                .json({ message: "ERROR: You aren't authenticated!" })
                .end();

        const { id } = req.params;
        if (!id)
            return res
                .status(400)
                .json({ message: 'Please provide task list id!' })
                .end();

        const { newTaskName } = req.body;
        if (!newTaskName)
            return res
                .status(400)
                .json({ message: 'Please provide new task list name!' })
                .end();

        const taskList = await TaskListModel.findById(id);
        if (!taskList)
            return res
                .status(404)
                .json({ message: 'Task List Not Found!' })
                .end();

        taskList.task_list_name = newTaskName;
        taskList.updated_at = new Date(Date.now());
        await taskList.save();

        return res
            .status(200)
            .json({ message: 'Task list updated successfully!', taskList })
            .end();
    } catch (error) {
        console.error(error);
        return res
            .status(400)
            .json({ message: "ERROR: Couln't rename task list!", error })
            .end();
    }
};

export const deleteTaskList = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const userId = get(req, 'identity._id');
        if (!userId)
            return res
                .status(403)
                .json({ message: "ERROR: You aren't authenticated!" })
                .end();

        const { id } = req.params;
        if (!id)
            return res
                .status(400)
                .json({ message: 'Please provide task list id!' })
                .end();

        const taskList = await TaskListModel.findOneAndDelete({ _id: id });
        if (!taskList)
            return res
                .status(404)
                .json({ message: 'Task List Not Found!' })
                .end();

        return res
            .status(200)
            .json({ message: 'Task list deleted successfully!', taskList })
            .end();
    } catch (error) {
        console.error(error);
        return res
            .status(400)
            .json({ message: "ERROR: Couln't delete task list!", error })
            .end();
    }
};
