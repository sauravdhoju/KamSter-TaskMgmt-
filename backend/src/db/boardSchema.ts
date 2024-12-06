import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const BoardSchema = new mongoose.Schema({
    board_name: {
        type: String,
        required: true
     },
     project_id: {
        type: Schema.Types.ObjectId,
        ref: 'Project', // foreign key
        required: true
    },
   created_at: {
    type: Date,
    required: true
   },
   updated_at: {
    type: Date,
    required: true
   },
});

export default BoardSchema;
