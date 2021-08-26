import Sequelize from 'sequelize';
const { UniqueConstraintError } = Sequelize;
import createController from "./createController.js";
import User from '../models/User.js';
import { userExistsError, unauthorizedError } from '../routes/errors.js';
import type { RegistrationRequest, LoginRequest } from '../types/auth.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const authController = createController({
    async register(req, res, next) {
        console.log("inside Register");
        const { username, email, password } = req.body as RegistrationRequest;
        try {
            const user = await User.create({
                username,
                email,
                hashedPassword: await bcrypt.hash(password, SALT_ROUNDS)
            });
            req.session.user = user;
            res.json(user);
        }
        catch (error) {
            if (error instanceof UniqueConstraintError) {
                next(userExistsError(username));
                return;
            }
            console.error(error);
            next(error);
        }
    },
    async login(req, res, next) {
        const { email, password } = req.body as LoginRequest;
        const user = await User.findOne({
            where: { email }
        });
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
