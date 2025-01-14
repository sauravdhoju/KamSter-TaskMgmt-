import mongoose from 'mongoose';

const ProjectCollaborationSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    collabStatus: {
        type: String,
        default: 'pending',
    },
});

export default ProjectCollaborationSchema;
