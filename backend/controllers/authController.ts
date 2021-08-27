import createController from "./createController.js";
import { unauthorizedError, userExistsError } from '../errors.js';
import type { RegistrationRequest, LoginRequest } from '../types/auth.js';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { PG_UNIQUE_VIOLATION } from 'postgres-error-codes';
import jwt from 'jsonwebtoken';
import type { Response } from 'express';
const secret = process.env.SESSION_SECRET ?? 'secret'

const SALT_ROUNDS = 10;

const setTokenCookie = (res: Response, user: User) => {
    const token = jwt.sign(
        {
            ...user,
        },
        secret,
    );
    res.cookie('token', token, {
        sameSite: 'strict',
        httpOnly: true,
        signed: true
    });
    return res;
}

const authController = createController({
    async register(req, res, next) {
        console.log("inside Register");
        const { username, email, password } = req.body as RegistrationRequest;
        try {
            const user = await User.query().insert({
                username,
                email,
                hashedPassword: await bcrypt.hash(password, SALT_ROUNDS)
            });
            const userWithoutPassword = user.$omit('hashedPassword');
            res = setTokenCookie(res, userWithoutPassword);
            res.json(userWithoutPassword);
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
        const user = await User.query().where('email', email).first();
        console.log(user);
        if (!user) {
            next(unauthorizedError());
            return;
        }
        if (!await bcrypt.compare(password, user.hashedPassword)) {
            next(unauthorizedError());
            return;
        }
        const userWithoutPassword = user.$omit('hashedPassword');
        res = setTokenCookie(res, userWithoutPassword);
        res.json(userWithoutPassword);
    },
    async deleteUser({}, res) {
        res.clearCookie('token', {
            httpOnly: true, 
            signed: true,
            sameSite: 'strict'
        });
        res.sendStatus(204);
    },
    async verify({}, res) {
        res.json(res.locals.user);
    }
});

export const { register, login, deleteUser, verify } = authController;
export default authController;
