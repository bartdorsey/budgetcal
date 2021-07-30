import type { RequestHandler } from 'express';
import type { UserSession } from '../types/auth';
import createError from 'http-errors';

const authRequired: RequestHandler = (req, res, next) => {
  const userSession = req.session as UserSession;
  if (userSession.user) {
    next();
    return;
  }
  next(createError(403, new Error('Unauthorized')));
}

export { authRequired }
