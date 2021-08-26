import { ErrorRequestHandler } from "express";
import createHttpError, { HttpError } from "http-errors";
import type { ValidationError } from 'express-validator';
import { appError, appLog } from '../logger';
import { serializeError } from 'serialize-error';

export interface AppError {
    value?: string,
    msg: string,
    param?: string,
    location?: string
}

type AppErrorCollection = AppError[];

export interface AppErrorResponse {
    errors: AppErrorCollection | ValidationError[],
    httpError: HttpError,
    message: string
}

export const createAppError = (...errors:AppErrorCollection| string[]) : AppErrorResponse => {
    const messages = errors.map(e => {
        return typeof e === 'string'? e : e.msg
    });
    const message = messages.join('\n');
    const response = {
        message: message,
        httpError: createHttpError(400, message),
        errors: errors.map(e => typeof e === 'string' ? { msg: e }: e)
    } 
    appLog(response);
    return response;
}

export const AppErrorHandler: ErrorRequestHandler = (error: AppErrorResponse, {}, res) => {
    appError(error);
    res.status(error.httpError.statusCode);
    res.json({
        ...error,
        httpError: serializeError(error.httpError)
    });
}

export const unauthorizedError = () =>
    createHttpError(403, createAppError('Unauthorized'));

export const passwordInvalidError = () =>
    createHttpError(400, createAppError("Password Invalid"));
  
export const userExistsError = (username: string) =>
    createHttpError(400, createAppError(`${username} already exists`));
