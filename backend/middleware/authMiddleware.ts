import type { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { asyncErrorHandler } from '../routes/utils.js';
import { User, userRepository } from '../repositories.js';

const unauthorizedError = createHttpError(403, new Error('Unauthorized'));

const authRequired: RequestHandler = asyncErrorHandler(async (req, {}={}, next) => {
  if (!req.session.user) {
    next(unauthorizedError);
    return;
  }
  const user = await userRepository().where<User>('id', req.session.user.id).limit(1);
  if (!user) {
    next(unauthorizedError);
    return;
  }
  req.session.user = user;
  next();
});

export { authRequired, unauthorizedError }
