import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const boardSchema = new mongoose.Schema({
    board_name: {
        type: String,
        required: true
     },
     project_id: {
        type: Schema.Types.ObjectId,
        ref: 'Project', // foreign key
        required: true
    },
    created_user_id: {
        type: Schema.Types.ObjectId, //Indicates a reference to another document
        ref: 'User', // foreign key
        required: true
    },
});

export default boardSchema;
