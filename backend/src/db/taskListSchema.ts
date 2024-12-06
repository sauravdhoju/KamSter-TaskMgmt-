import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TaskListSchema = new mongoose.Schema({
    task_list_id: { 
        type: Schema.Types.ObjectId, 
        required: true },
        
    task_list_name: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

export default TaskListSchema;