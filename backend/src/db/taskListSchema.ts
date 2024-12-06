import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TaskListSchema = new mongoose.Schema({
    task_list_name: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

export default TaskListSchema;
