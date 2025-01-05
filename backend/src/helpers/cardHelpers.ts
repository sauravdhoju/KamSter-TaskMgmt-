import CardModel from '../models/cardModel';

export const createNewCard = (values: Record<string, any>) =>
    new CardModel(values).save().then((card) => card.toObject());

export const getCardById = (id: string) => CardModel.findById(id);

export const updateCardById = (id: string, values: Record<string, any>) =>
    CardModel.findByIdAndUpdate(id, values);

export const getCardsByBoardId = (boardId: string) =>
    CardModel.find({ board_id: boardId });

export const deleteCardById = (id: string) => CardModel.findByIdAndDelete(id);
