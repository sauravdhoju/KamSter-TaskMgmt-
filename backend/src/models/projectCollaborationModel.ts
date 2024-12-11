import mongoose from 'mongoose';

import ProjectCollaborationSchema from 'db/projectCollaborationSchema';

const ProjectCollaborationModel = new mongoose.Model(
    'ProjectCollaboration',
    ProjectCollaborationSchema
);

export default ProjectCollaborationModel;
