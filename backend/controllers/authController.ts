import createController from "./createController.js";
import { unauthorizedError, userExistsError } from '../errors.js';
import type { RegistrationRequest, LoginRequest } from '../types/auth.js';
import bcrypt from 'bcrypt';
import { User, userRepository } from "../repositories.js";
import { PG_UNIQUE_VIOLATION } from 'postgres-error-codes';

const SALT_ROUNDS = 10;

const authController = createController({
    async register(req, res, next) {
        console.log("inside Register");
        const { username, email, password } = req.body as RegistrationRequest;
        try {
            const user = await userRepository.insert<User>({
                username,
                email,
                hashedPassword: await bcrypt.hash(password, SALT_ROUNDS)
            });
            req.session.user = user
            res.json({
                username,
                email
            });
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
        const user = await userRepository.where<User>('email', email).limit(1);
        if (!user) {
            next(unauthorizedError());
            return;
        }
        if (!await bcrypt.compare(password, user.hashedPassword)) {
            next(unauthorizedError());
            return;
        }
        // logged in
        req.session.user = user;
        res.json(user);
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
