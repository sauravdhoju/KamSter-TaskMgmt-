import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const projectCollaborationSchema = new mongoose.Schema ({
    user_id : {
        type:Schema.Types.ObjectId , 
        required: true},

    project_id : {
        type:Schema.Types.ObjectId ,
        required: true},

    
})

export default projectCollaborationSchema;