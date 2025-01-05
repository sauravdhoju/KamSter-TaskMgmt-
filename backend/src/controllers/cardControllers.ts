import express from 'express';
import { get } from 'lodash';

import {
    createNewCard,
    updateCardById,
    getCardById,
    deleteCardById,
} from '../helpers/cardHelpers';
import { updateBoardById } from '../helpers/boardHelpers';

export const createCard = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const userId = get(req, 'identity._id') as string;
        const { card_name, board_id } = req.body;

        if (!card_name || !board_id)
            return res
                .status(400)
                .json({ message: 'Please provide card name and board id' })
                .end();

        const newCard: {
            card_name: string;
            board_id: string;
            creating_user_id: string;
            updating_user_id: string;
        } = {
            card_name,
            board_id,
            creating_user_id: userId,
            updating_user_id: userId,
        };

        const createdCard = await createNewCard(newCard);

        if (!createdCard)
            return res
                .status(404)
                .json({ message: "Couldn't create card!" })
                .end();

        await updateBoardById(board_id, {
            updated_at: new Date(Date.now()),
        });

        return res
            .status(200)
            .json({ message: 'Card created successfully!', createdCard })
            .end();
    } catch (error) {
        return res
            .status(400)
            .json({ message: "Couldn't create new card!", error })
            .end();
    }
};

export const updateCard = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const userId = get(req, 'identity._id');
        const { cardId } = req.params;
        const { boardId, card_name } = req.body;

        if (!cardId)
            return res
                .status(400)
                .json({ message: 'Please provide card id!' })
                .end();

        if (!boardId && !card_name)
            return res
                .status(400)
                .json({ message: 'Please provide value to update!' })
                .end();

        const cardToUpdate = await getCardById(cardId);

        if (boardId) {
            await updateBoardById(cardToUpdate.board_id.toString(), {
                updated_at: new Date(Date.now()),
            });
            cardToUpdate.board_id = boardId;
        }
        if (card_name) cardToUpdate.card_name = card_name;
        cardToUpdate.updating_user_id = userId;

        cardToUpdate.updated_at = new Date(Date.now());

        cardToUpdate.save();

        await updateBoardById(cardToUpdate.board_id.toString(), {
            updated_at: new Date(Date.now()),
        });

        return res
            .status(200)
            .json({
                message: 'Card updated successfully',
                updatedCard: cardToUpdate,
            })
            .end();
    } catch (error) {
        return res
            .status(400)
            .json({ message: "Couldn't update card!", error })
            .end();
    }
};

export const deleteCard = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { cardId } = req.params;

        if (!cardId)
            return res
                .status(400)
                .json({ message: 'Please provide card id!' })
                .end();

        const deletedCard = await deleteCardById(cardId);

        if (!deletedCard)
            return res
                .status(200)
                .json({ message: 'Card deleted successfully!', deletedCard })
                .end();

        return res
            .status(200)
            .json({ message: 'Card deleted successfully!', deletedCard })
            .end();
    } catch (error) {
        return res
            .status(400)
            .json({ message: 'Something went wrong!', error })
            .end();
    }
};
