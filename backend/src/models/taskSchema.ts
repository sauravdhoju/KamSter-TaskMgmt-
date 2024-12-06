import mongoose from 'mongoose';
import TaskSchema from '../db/taskSchema';

const TaskModel = mongoose.model('Task', TaskSchema);

export default TaskModel;
