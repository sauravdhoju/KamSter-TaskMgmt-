const mongoose = require('mongoose');
import cardSchema from '../db/cardSchema';

const cardModel = mongoose.model('Card', cardSchema);

export default cardModel;
