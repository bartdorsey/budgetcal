import type { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { asyncErrorHandler } from '../routes/utils.js';
import User from '../models/User';
const secret = process.env.SESSION_SECRET ?? 'secret';
const jwt = require('jsonwebtoken');

const unauthorizedError = createHttpError(403, new Error('Unauthorized'));

const authRequired: RequestHandler = asyncErrorHandler(async (req, res, next) => {
    const token = req.signedCookies.token;
    let tokenData;
    try {
        tokenData = jwt.verify(token, secret);
    } catch (error) {
        next(unauthorizedError);
    }
    const user = await User.query().where('id', tokenData.id).first();

    if (!user) {
        next(unauthorizedError);
        return;
    }
    
    // Glue the user to the locals for later use
    res.locals.user = user.$omit('hashedPassword');
    next();
});

export { authRequired, unauthorizedError }
