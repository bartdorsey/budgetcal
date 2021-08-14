import { RequestHandler } from "express";
import { asyncErrorHandler } from '../routes/utils';

interface ControllerHandlers {
    [fname:string]: RequestHandler
}

export default function createController(handlers: ControllerHandlers): ControllerHandlers {
    return Object.entries(handlers).reduce((wrappedHandlers, [name, handler]) => {
        return {
            ...wrappedHandlers,
            [name]: asyncErrorHandler(handler)
        }
    }, {});
}
