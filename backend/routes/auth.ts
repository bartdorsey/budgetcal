import express from 'express';
const authRouter = express.Router();
import { authRequired } from '../middleware/authMiddleware.js';
import { register, login, deleteUser, verify } from '../controllers/authController.js'
import { registrationValidator } from '../middleware/validators.js'

// POST /api/auth/register
authRouter.post('/register', registrationValidator, register);

// POST /api/auth/login
authRouter.post('/login', login);

// DELETE /api/auth
authRouter.delete('/', deleteUser);

// GET /api/auth/verify
authRouter.get('/verify', authRequired, verify);

export default authRouter;