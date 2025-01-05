import express from 'express';
import { get } from 'lodash';

import {
    createNewBoard,
    getBoardsByProjectId,
    deleteBoardById,
    updateBoardById,
} from '../helpers/boardHelpers';

import { getCardsByBoardId } from '../helpers/cardHelpers';

export const createBoard = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { projectId } = req.params;
        const { board_name } = req.body;

        if (!projectId || !board_name)
            return res
                .status(400)
                .json({ message: 'Please provide project id and board name!' })
                .end();

        const newBoard: { board_name: string; project_id: string } = {
            board_name,
            project_id: projectId,
        };

        const createdBoard = await createNewBoard(newBoard);

        if (!createdBoard)
            return res
                .status(404)
                .json({ message: "Couldn't create board!" })
                .end();

        return res
            .status(200)
            .json({ message: 'Board created successfully!', createdBoard })
            .end();
    } catch (error) {
        return res
            .status(400)
            .json({ message: "Couldn't create board!", error })
            .end();
    }
};

export const getBoardsOfProject = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { projectId } = req.params;

        if (!projectId)
            return res
                .status(400)
                .json({ message: 'Please provide project id of board!' })
                .end();

        const boards = await getBoardsByProjectId(projectId);

        if (!boards)
            return res
                .status(400)
                .json({ message: "Couldn't get boards!" })
                .end();

        return res
            .status(200)
            .json({ message: 'Boards fetched successfully!', boards })
            .end();
    } catch (error) {
        return res.status(400).json({ message: "Couldn't get boards!" }).end();
    }
};

export const deleteBoard = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { boardId } = req.params;
        if (!boardId)
            return res
                .status(400)
                .json({ message: 'Please provide board id to delete!' })
                .end();

        const deletedBoard = await deleteBoardById(boardId);

        if (!deletedBoard)
            return res
                .status(404)
                .json({ message: "Couldn't find board!" })
                .end();

        return res
            .status(400)
            .json({ message: 'Board deleted successfully!', deletedBoard })
            .end();
    } catch (error) {
        return res
            .status(400)
            .json({ message: "Couldn't delete board!", error })
            .end();
    }
};

export const updateBoardName = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { boardId } = req.params;
        const { board_name } = req.body;

        if (!boardId || !board_name)
            return res
                .status(400)
                .json({
                    message: 'Please provide board id and new board name!',
                })
                .end();

        const updatedBoard = await updateBoardById(boardId, { board_name });
        if (!updatedBoard)
            return res
                .status(404)
                .json({ message: 'Board to update not found!' })
                .end();

        return res
            .status(200)
            .json({ message: 'Board updated successfully!', updatedBoard })
            .end();
    } catch (error) {
        return res
            .status(400)
            .json({ message: "Couldn't update board!", error })
            .end();
    }
};

export const getAllCardsAndBoards = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { projectId } = req.params;

        if (!projectId)
            return res
                .status(400)
                .json({ message: 'Please provide project id of board!' })
                .end();

        const boards = await getBoardsByProjectId(projectId);

        if (!boards)
            return res
                .status(400)
                .json({ message: "Couldn't get boards!" })
                .end();

        const cardsAndBoards = await Promise.all(
            boards.map(async (board) => {
                const boardData = board.toObject();
                const cards = await getCardsByBoardId(board._id.toString());
                return {
                    ...boardData,
                    cards,
                };
            })
        );
        return res
            .status(200)
            .json({
                message: 'Boards with cards fetched successfully!',
                cardsAndBoards,
            })
            .end();
    } catch (error) {
        return res
            .status(400)
            .json({ message: "Couldn't get all cards and boards!", error })
            .end();
    }
};
