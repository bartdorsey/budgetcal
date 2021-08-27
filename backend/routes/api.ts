import express from 'express';
import authRouter from './auth.js';
import budgetRouter from './budgets.js';
import userRouter from './users.js';
const apiRouter = express.Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/budgets', budgetRouter);

export default apiRouter;