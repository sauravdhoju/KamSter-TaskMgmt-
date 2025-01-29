import mongoose from 'mongoose';

import ProjectCollaborationSchema from '../db/projectCollaborationSchema';

const ProjectCollaborationModel = mongoose.model(
    'ProjectCollaboration',
    ProjectCollaborationSchema
);

export default ProjectCollaborationModel;
