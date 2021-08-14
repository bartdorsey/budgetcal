import express from 'express';
import authRouter from './auth';
import budgetRouter from './budgets';
import userRouter from './users';
const apiRouter = express.Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/budgets', budgetRouter);

export default apiRouter;