import { RequestHandler, Request, Response, NextFunction } from "express";
import { RepositoryList } from '../repositories';
import { asyncErrorHandler } from '../routes/utils.js';
import { appLog } from '../logger';

type ControllerHandler = (req: Request, res: Response, next: NextFunction, repositories: RepositoryList ) => void

interface ControllerHandlers {
    [fname:string]: ControllerHandler
}
interface RequestHandlers {
    [method:string]: RequestHandler
}


export default function createController(handlers: ControllerHandlers): RequestHandlers {
    appLog("creating Controller");
    return Object.entries(handlers).reduce((wrappedHandlers, [name, handler]) => {
        return {
            ...wrappedHandlers,
            [name]: asyncErrorHandler(async (req, res, next) => {
                appLog("Calling handler");
                return await handler(req, res, next, res.locals.repositories);
            })
        }
    }, {});
}
