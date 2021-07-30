import express from 'express';
import authRouter from './auth';
import userRouter from './users';
const apiRouter = express.Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/auth', authRouter);

export default apiRouter;