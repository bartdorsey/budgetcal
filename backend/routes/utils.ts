import type { RequestHandler } from 'express';

// Decorator
export function async() {
  return asyncErrorHandler;
}

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