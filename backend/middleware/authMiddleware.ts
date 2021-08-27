import type { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { asyncErrorHandler } from '../routes/utils.js';

const unauthorizedError = createHttpError(403, new Error('Unauthorized'));

const authRequired: RequestHandler = asyncErrorHandler(async (req, { locals: { userRepository } }, next) => {
  if (!req.session.user) {
    next(unauthorizedError);
    return;
  }
  const user = await userRepository.findOne(req.session.user.id);
  if (!user) {
    next(unauthorizedError);
    return;
  }
  req.session.user = user;
  next();
});

export { authRequired, unauthorizedError }
