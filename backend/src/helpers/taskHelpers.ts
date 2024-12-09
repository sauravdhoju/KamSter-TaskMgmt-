import TaskModel from '../models/taskModel';

export const getTasksFromList = (taskListId: string) => {
    return TaskModel.find({ task_list_id: taskListId });
};
