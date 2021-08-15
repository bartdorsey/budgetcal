import express from 'express';
const userRouter = express.Router();
import { authRequired } from '../middleware/authMiddleware';
import { getUser } from '../controllers/userController';

// GET /api/users/profile
userRouter.get('/profile', authRequired, getUser);

export default userRouter;
