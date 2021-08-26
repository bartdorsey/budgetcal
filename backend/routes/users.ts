import express from 'express';
const userRouter = express.Router();
import { authRequired } from '../middleware/authMiddleware.js';
import { getUser } from '../controllers/userController.js';

// GET /api/users/profile
userRouter.get('/profile', authRequired, getUser);

export default userRouter;
