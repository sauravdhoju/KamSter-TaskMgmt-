import mongoose from 'mongoose';
import TaskListSchema from '../db/taskListSchema';

const TaskListModel = mongoose.model('TaskList', TaskListSchema);

export default TaskListModel;
