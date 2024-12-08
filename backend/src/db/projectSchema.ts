import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: null },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    admin_id: { type: mongoose.Schema.Types.ObjectId, required: true },
});

export default ProjectSchema;
