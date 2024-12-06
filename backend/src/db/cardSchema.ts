import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const cardSchema = new mongoose.Schema({
    card_name: {
        type: String,
        required: true
     },
     board_id: {
        type: Schema.Types.ObjectId,
        ref: 'Board', // foreign key
        required: true
    },
    created_user_id: {
        type: Schema.Types.ObjectId, //Indicates a reference to another document
        ref: 'User', // foreign key
        required: true
    },
});

export default cardSchema;
