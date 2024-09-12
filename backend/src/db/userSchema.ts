import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String },
    username: { type: String, required: true },
    email: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    authentication: {
        password: { type: String, required: true, select: false }, // select: false avoids fetching authentication data
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
});

export default UserSchema;
