const mongoose = require('mongoose');
import cardHandlerSchema from '../db/cardHandlerSchema';

const cardHandlerModel = mongoose.model('CardHandler', cardHandlerSchema);

export default cardHandlerModel;
