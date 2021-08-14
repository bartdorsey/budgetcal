import type { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import User from '../models/User';
import { asyncErrorHandler } from '../routes/utils';

const unauthorizedError = createHttpError(403, new Error('Unauthorized'));

const authRequired: RequestHandler = asyncErrorHandler(async (req, res, next) => {
  if (!req.session.user) {
    next(unauthorizedError);
    return;
  }
  const user = await User.findByPk(req.session.user.id);
  if (!user) {
    next(unauthorizedError);
    return;
  }
  req.session.user = user;
  user.reload();
  next();
});

export { authRequired, unauthorizedError }
