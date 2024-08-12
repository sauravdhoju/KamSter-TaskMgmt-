import express from 'express';

import {
    testController,
    arkoTestController,
} from '../controllers/testController';

const testRouter = (router: express.Router) => {
    router.get('/', testController);
    router.get('/whatistoday', arkoTestController);
};

export default testRouter;
