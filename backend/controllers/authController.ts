import createController from "./createController.js";
import { unauthorizedError, userExistsError } from '../errors.js';
import type { RegistrationRequest, LoginRequest } from '../types/auth.js';
import bcrypt from 'bcrypt';
import { SafeUser, User, userRepository } from "../repositories.js";
import { PG_UNIQUE_VIOLATION } from 'postgres-error-codes';

const SALT_ROUNDS = 10;

const authController = createController({
    async register(req, res, next) {
        console.log("inside Register");
        const { username, email, password } = req.body as RegistrationRequest;
        try {
            const user = await userRepository().insert<User>({
                username,
                email,
                hashedPassword: await bcrypt.hash(password, SALT_ROUNDS)
            });
            const safeUser = user as SafeUser;
            delete safeUser.hashedPassword;
            req.session.user = safeUser
            res.json(safeUser);
        }
        catch (error) {
            switch(error.code) {
                case PG_UNIQUE_VIOLATION:
                    switch(error.constraint) {
                        case 'users_username_unique':
                            next(userExistsError(username))
                            return;
                        case 'users_email_unique':
                            next(userExistsError(email))
                            return;
                        default: 
                            next(error);
                            return;
                    }
                default:
                    next(error);
                    return;
            }
        }
    },
    async login(req, res, next) {
        const { email, password } = req.body as LoginRequest;
        const user = await userRepository().where<User>('email', email).first();
        if (!user) {
            next(unauthorizedError());
            return;
        }
        if (!await bcrypt.compare(password, user.hashedPassword)) {
            next(unauthorizedError());
            return;
        }
        // logged in
        const safeUser = user as SafeUser;
        delete safeUser.hashedPassword;
        req.session.user = safeUser;
        res.json(safeUser);
    },
    async deleteUser(req, res) {
        req.session.destroy(() => {
            res.json({
                message: 'User Logged Out'
            });
        });
    },
    async verify(req, res) {
        res.json(req.session.user);
    }
});

export const { register, login, deleteUser, verify } = authController;
export default authController;
