import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    task_name: { type: String, required: true },
    is_completed: { type: Boolean, default: false },
    is_important: { type: Boolean, default: false },
    task_list_id: { type: Number, required: true },
    user_id: { type: Number, required: true },
});

export default TaskSchema;