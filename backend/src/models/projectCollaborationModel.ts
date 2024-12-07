import ProjectCollaborationSchema  from '../db/projectCollaborationSchema';

const mongoose = require('mongoose');
const ProjectCollaborationModel = mongoose.model('Project', ProjectCollaborationSchema );

export default ProjectCollaborationModel;