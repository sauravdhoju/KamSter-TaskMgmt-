import mongoose from 'mongoose';
import ProjectSchema from '../db/projectSchema';

const ProjectModel = mongoose.model('Project', ProjectSchema);

export default ProjectModel;
