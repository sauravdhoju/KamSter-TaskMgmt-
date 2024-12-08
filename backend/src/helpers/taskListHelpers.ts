import mongoose from 'mongoose';
import TaskListModel from '../models/taskListModel';

export const getTaskList = async (id: string) => {
    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid Task List ID');
    }

    // Retrieve the task list by ID
    const taskList = await TaskListModel.findById(id);

    if (!taskList) {
        throw new Error('Task List not found');
    }

    return taskList;
};

export const updateTaskListUpdatedAt = async (id: string) => {
    const taskList = await getTaskList(id);
    taskList.updated_at = new Date(Date.now());
    await taskList.save();
};
