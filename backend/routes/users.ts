import express from 'express';
const userRouter = express.Router();
import { asyncErrorHandler } from './utils';
import { authRequired } from '../middleware/authMiddleware';
import User from '../models/User';
import { UserSession } from '../types/auth';

// GET /api/users/profile
userRouter.get('/profile', authRequired, asyncErrorHandler(async (req, res, next) => {
  const userSession = req.session as UserSession;
  const user = await User.findByPk(userSession.user.id);
  res.json(user);
}));

export default userRouter;
