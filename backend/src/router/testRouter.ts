import express from 'express';

const testRouter = (router: express.Router) => {
    router.get('/', (req, res) => {
        const response = {
            name: 'nimesh shakya',
        };
        res.status(200).json(response);
    });
};

export default testRouter;
