import BoardModel from '../models/boardModel';

export const createNewBoard = (values: Record<string, any>) =>
    new BoardModel(values).save().then((board) => board.toObject());

export const getBoardsByProjectId = (projectId: string) =>
    BoardModel.find({ project_id: projectId });

export const deleteBoardById = (boardId: string) =>
    BoardModel.findOneAndDelete({ _id: boardId });

export const updateBoardById = (id: string, values: Record<string, any>) =>
    BoardModel.findByIdAndUpdate(id, values);
