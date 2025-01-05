import mongoose from 'mongoose';

const BoardSchema = new mongoose.Schema({
    board_name: { type: String, required: true },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
});

export default BoardSchema;
