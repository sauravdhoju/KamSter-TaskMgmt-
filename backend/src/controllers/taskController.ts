import express from 'express';
import TaskModel from '../models/taskModel';
import { get } from 'lodash';
import { updateTaskListUpdatedAt } from '../helpers/taskListHelpers';

export const addTask = async (req: express.Request, res: express.Response) => {
    try {
        const currentuserId = get(req, 'identity._id');
        const { task_name, task_list_id, due_date, is_important, description } =
            req.body;
        if (!task_name || !task_list_id) {
            return res
                .status(400)
                .json({ message: 'ERROR: You must provide all details!' });
        }
        const newTask: {
            task_name: string;
            task_list_id: string;
            user_id: string;
            due_date?: Date;
            is_important?: boolean;
            description?: string;
        } = {
            task_name,
            task_list_id,
            user_id: currentuserId,
        };
        // add is_important if provided
        if ('is_important' in req.body) {
            newTask.is_important = is_important;
        }
        if (due_date) newTask.due_date = due_date;
        if (description) newTask.description = description;
        const addedTask = await TaskModel.create(newTask);

        return res
            .status(200)
            .json({ message: 'Task added successfully!', addedTask })
            .end();
    } catch (error) {
        console.error(error);
        return res
            .status(400)
            .json({ message: "ERROR: Couldn't add task!", error })
            .end();
    }
};

export const updateTask = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const userId = get(req, 'identity._id') as string;
        const { taskId } = req.params;
        const { task_name, description, due_date, is_important, is_completed } =
            req.body;

        const taskToUpdate = await TaskModel.findById(taskId);
        if (!taskToUpdate)
            return res
                .status(404)
                .json({ message: 'ERROR: Task not found!' })
                .end();

        if (!userId)
            return res
                .status(403)
                .json({ message: "ERROR: You aren't authenticated!" })
                .end();

        if (!taskToUpdate.user_id.equals(userId)) {
            console.log(userId.toString(), taskToUpdate.user_id.toString());

            return res
                .status(403)
                .json({ message: "ERROR: You aren't authenticated!" })
                .end();
        }

        if (!task_name)
            return res
                .status(400)
                .json({ message: 'ERROR: Provide required values!' })
                .end();

        taskToUpdate.task_name = task_name;
        if (due_date) taskToUpdate.due_date = due_date;
        if (description) taskToUpdate.description = description;
        if ('is_completed' in req.body)
            taskToUpdate.is_completed = is_completed;
        if ('is_important' in req.body)
            taskToUpdate.is_important = is_important;
        taskToUpdate.updated_at = new Date(Date.now());
        await taskToUpdate.save();
        await updateTaskListUpdatedAt(taskToUpdate.task_list_id.toString());
        return res
            .status(200)
            .json({ message: 'Task updated successfully!', taskToUpdate })
            .end();
    } catch (error) {
        console.error(error);
        return res
            .status(400)
            .json({ message: "ERROR: Couldn't update task!", error })
            .end();
    }
};

export const deleteTask = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { taskId } = req.params;
        if (!taskId)
            return res
                .status(400)
                .json({ message: 'Please provide task ID!' })
                .end();
        const deletedTask = await TaskModel.findOneAndDelete({ _id: taskId });
        if (!deleteTask)
            return res.status(404).json({ message: 'Task not found' }).end();
        return res
            .status(200)
            .json({ message: 'Task deleted successfully!', deleteTask })
            .end();
    } catch (error) {
        console.error(error);
        return res
            .status(400)
            .json({ message: 'Something went wrong!', error })
            .end();
    }
};
