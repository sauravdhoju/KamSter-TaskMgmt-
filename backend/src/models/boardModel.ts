import mongoose from 'mongoose';
import BoardSchema from '../db/boardSchema';

const BoardModel = mongoose.model('Board', BoardSchema);

export default BoardModel;
