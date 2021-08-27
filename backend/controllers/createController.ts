import { RequestHandler } from "express";
import { asyncErrorHandler } from '../routes/utils.js';
import { appLog } from '../logger';

interface ControllerHandlers {
    [fname:string]: RequestHandler
}

export default function createController(handlers: ControllerHandlers): ControllerHandlers {
    appLog("creating Controller");
    return Object.entries(handlers).reduce((wrappedHandlers, [name, handler]) => {
        return {
            ...wrappedHandlers,
            [name]: asyncErrorHandler(handler)
        }
    }, {});
}
