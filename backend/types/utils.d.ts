import type { RequestHandler } from 'express';

declare namespace RouterUtils {
}

declare function asyncErrorHandler(callback: RequestHandler): RequestHandler;

export { asyncErrorHandler }