import express from 'express';
const authRouter = express.Router();
import { authRequired } from '../middleware/authMiddleware';
import { register, login, deleteUser, verify } from '../controllers/authController'
import { registrationValidator } from '../middleware/validators'

// POST /api/auth/register
authRouter.post('/register', registrationValidator, register);

// POST /api/auth/login
authRouter.post('/login', login);

// DELETE /api/auth
authRouter.delete('/', deleteUser);

// GET /api/auth/verify
authRouter.get('/verify', authRequired, verify);

export default authRouter;