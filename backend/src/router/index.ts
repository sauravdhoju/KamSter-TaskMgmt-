import express from 'express';

import testRouter from './testRouter';

const router = express.Router();

export default (): express.Router => {
    testRouter(router);
    return router;
};
