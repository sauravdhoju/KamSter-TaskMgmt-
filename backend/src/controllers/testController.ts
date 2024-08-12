import express from 'express';

export const testController = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const response = {
            message: 'jeena nakarmi',
        };
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: error });
    }
};

export const arkoTestController = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const response = {
            message: 'Today is Monday!',
        };
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: error });
    }
};
