import express from 'express';
import TaskListModel from '../models/taskListModel';
import { get } from 'lodash';

import { getTasksFromList } from '../helpers/taskHelpers';

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
        const { task_list_name, isInitialList } = req.body;
        if (!task_list_name) {
            return res
                .status(400)
                .json({ message: 'ERROR: You must provide task list name!' });
        }
        const newTaskList: {
            user_id: string;
            task_list_name: string;
            isInitialList?: boolean;
        } = {
            user_id: userId,
            task_list_name,
        };
        if ('isInitialList' in req.body)
            newTaskList.isInitialList = isInitialList;
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
        const taskLists = await TaskListModel.find({ user_id: userId });
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

        const { taskListId } = req.params;
        if (!taskListId)
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

        const taskList = await TaskListModel.findById(taskListId);
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

        const { taskListId } = req.params;
        if (!taskListId)
            return res
                .status(400)
                .json({ message: 'Please provide task list id!' })
                .end();

        const taskList = await TaskListModel.findOneAndDelete({
            _id: taskListId,
        });
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

export const getTasksFromTaskList = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { taskListId } = req.params;

        const tasks = await getTasksFromList(taskListId);

        if (!tasks) {
            return res.status(404).json({ message: 'Tasks not found!' }).end();
        }

        return res
            .status(200)
            .json({ message: 'Tasks retrieved successfully!', tasks })
            .end();
    } catch (error) {
        console.error(error);
        return res
            .status(400)
            .json({ message: "ERROR: Couldn't get tasks!", error });
    }
};
