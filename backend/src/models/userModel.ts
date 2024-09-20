import mongoose from 'mongoose';
import UserSchema from '../db/userSchema';

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
