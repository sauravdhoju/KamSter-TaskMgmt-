import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProjectSchema = new mongoose.Schema ({
    project_name : {type:String, required: true},
    project_description : {type: String, required: true},
    created_at : {type: Date, default: Date.now },
})

export default ProjectSchema;