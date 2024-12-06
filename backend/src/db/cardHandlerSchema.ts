import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const cardHandlerSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId, //Indicates a reference to another document
        ref: 'User', // foreign key
        required: true
    },
    card_id: {
        type: Schema.Types.ObjectId,
        ref: 'Card', // foreign key
        required: true
    }
}, {
    // timestamps: true // Adds createdAt and updatedAt fields
});

export default cardHandlerSchema;
