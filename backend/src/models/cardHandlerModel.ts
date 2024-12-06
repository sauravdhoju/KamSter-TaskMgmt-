const mongoose = require('mongoose');
import CardHandlerSchema from '../db/cardHandlerSchema';

const CardHandlerModel = mongoose.model('CardHandler', CardHandlerSchema);

export default CardHandlerModel;
