import { UniqueConstraintError } from 'sequelize'
import createController from "./createController";
import User from '../models/User';
import { fieldRequiredError, passwordInvalidError, userExistsError, unauthorizedError } from '../routes/errors';
import type { RegistrationRequest, LoginRequest } from '../types/auth';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const authController = createController({
    async register(req, res, next) {
        const { username, email, password, confirmPassword } = req.body as RegistrationRequest;
        if (!username && !email && !password && !confirmPassword) {
            next(fieldRequiredError('username, email and password'));
            return;
        }
        if (password !== confirmPassword) {
            next(passwordInvalidError());
            return;
        }
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
            }
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
    async deleteUser(req, res, next) {
        req.session.destroy(() => {
            res.json({
                message: 'User Logged Out'
            });
        });
    },
    async restore(req, res) {
        const user = await User.findByPk(req.session.user.id);
        res.json(user);
    }
});

export const { register, login, deleteUser, restore } = authController;
export default authController;