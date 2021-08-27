import { check, validationResult } from 'express-validator';
import type { RequestHandler } from 'express';
import { createAppError } from '../errors.js';

export const validate: RequestHandler = (req, {}, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const response = createAppError(result.array()[0]);
        next(response);
    }
    next();
}

export const registrationValidator = [
    check('username', 'Username is required').exists(),
    check('email', 'email address is required').isEmail(),
    check('password', 'Passwords must match').exists().custom((value, { req }) => {
        return value === req.body.confirmPassword
    }),
    validate
];

