// import Sequelize from 'sequelize';
// const { UniqueConstraintError } = Sequelize;
import createController from "./createController.js";
import { databaseError, unauthorizedError, userExistsError } from '../errors.js';
import type { RegistrationRequest, LoginRequest } from '../types/auth.js';
import bcrypt from 'bcrypt';
import { PG_UNIQUE_VIOLATION } from 'postgres-error-codes'

const SALT_ROUNDS = 10;

const authController = createController({
    async register(req, res, next, { userRepository }) {
        console.log("inside Register");
        const { username, email, password } = req.body as RegistrationRequest;
        try {
            const user = await userRepository.create({
                username,
                email,
                hashedPassword: await bcrypt.hash(password, SALT_ROUNDS)
            });
            const results = await userRepository.save(user);
            req.session.user = results;
            res.json(results);
        }
        catch (error) {
            if (error.driverError) {
                switch(error.driverError.code) {
                    case PG_UNIQUE_VIOLATION:
                        next(userExistsError());
                        return;
                    default:
                        next(databaseError(error.driverError));
                        return;
                }
            }
            next(error);
        }
    },
    async login(req, res, next, { userRepository }) {
        const { email, password } = req.body as LoginRequest;
        const user = await userRepository.findOne({
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
