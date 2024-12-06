import mongoose from 'mongoose';

const TaskListSchema = new mongoose.Schema({
    task_list_id: { type: Number, required: true },
    task_list_name: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

export default TaskListSchema;