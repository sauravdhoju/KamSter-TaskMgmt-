import mongoose from 'mongoose';
import CardSchema from '../db/cardSchema';

const CardModel = mongoose.model('Card', CardSchema);

export default CardModel;
