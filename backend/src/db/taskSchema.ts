import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TaskSchema = new mongoose.Schema({
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    task_name: { type: String, required: true },
    due_date: { type: Date, default: null },
    is_completed: { type: Boolean, default: false },
    is_important: { type: Boolean, default: false },

    task_list_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'TaskList',
    },

    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
});

export default TaskSchema;
