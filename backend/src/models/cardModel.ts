const mongoose = require('mongoose');
import CardSchema from '../db/cardSchema';

const CardModel = mongoose.model('Card', CardSchema);

export default CardModel;
