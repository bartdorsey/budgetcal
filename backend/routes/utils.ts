import type { RequestHandler } from 'express';

export function asyncErrorHandler(callback: RequestHandler): RequestHandler {
  return async (req, res, next) => {
    try {
      return await callback(req, res, next);
    }
    catch (e) {
      next(e)
    }
  }
}