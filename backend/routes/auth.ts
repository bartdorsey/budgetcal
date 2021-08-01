import express from 'express';
const authRouter = express.Router();
import User from '../models/User';
import bcrypt from 'bcrypt';
import { asyncErrorHandler } from './utils';
import { RegistrationRequest, LoginRequest, UserSession } from '../types/auth';
import createError from 'http-errors';
import { authRequired } from '../middleware/authMiddleware';

const SALT_ROUNDS = 10;

authRouter.post('/register', asyncErrorHandler(async(req, res, next) => {
    const { username, email, password, confirmPassword } = req.body as RegistrationRequest;
    if (!username && !email && !password && !confirmPassword) {
        next(createError(400, new Error('Fields Required')));
        return;
    }
    if (password !== confirmPassword) {
        next(createError(400, new Error("Passwords don't match")));
        return;
    }
    const user = await User.create({
        username,
        email,
        hashedPassword: await bcrypt.hash(password, SALT_ROUNDS)
    });
    const userSession = req.session as UserSession;
    userSession.user = user;
    res.json(user);
}));


authRouter.post('/login', asyncErrorHandler(async(req, res, next) => {
    const { email, password } = req.body as LoginRequest;
    const user = await User.findOne({
        where: { email }
    });
    if (!user) {
        next(createError(401, new Error('Unauthorized')));
        return;
    }
    if (!await bcrypt.compare(password, user.hashedPassword)) {
        next(createError(401, new Error('Unauthorized')));
        return;
    }
    // logged in
    const userSession = req.session as UserSession;
    userSession.user = user;
    res.json(user);
}));

authRouter.delete('/', asyncErrorHandler(async(req, res) => {
    req.session.destroy(() => {
        res.json({
          message: 'User Logged Out'
        });
    });
}));

// GET /api/auth/restore
authRouter.get('/restore', authRequired, asyncErrorHandler(async (req, res, next) => {
  const userSession = req.session as UserSession;
  const user = await User.findByPk(userSession.user.id);
  res.json(user);
}));

export default authRouter;