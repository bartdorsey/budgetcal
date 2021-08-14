import express from 'express';
const authRouter = express.Router();
import { authRequired } from '../middleware/authMiddleware';
import { register, login, deleteUser, restore } from '../controllers/authController'

// POST /api/auth/register
authRouter.post('/register', register);

// POST /api/auth/login
authRouter.post('/login', login);

// DELETE /api/auth
authRouter.delete('/', deleteUser);

// GET /api/auth/restore
authRouter.get('/restore', authRequired, restore);

export default authRouter;