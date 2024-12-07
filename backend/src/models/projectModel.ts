import ProjectSchema  from '../db/projectSchema';

const mongoose = require('mongoose');
const ProjectModel = mongoose.model('Project', ProjectSchema );

export default ProjectModel;