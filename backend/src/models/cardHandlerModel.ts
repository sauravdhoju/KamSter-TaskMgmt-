import CardHandlerSchema from '../db/cardHandlerSchema';
const mongoose = require('mongoose');

const CardHandlerModel = mongoose.model('CardHandler', CardHandlerSchema);

export default CardHandlerModel;
