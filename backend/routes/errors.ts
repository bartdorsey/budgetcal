import createHttpError from "http-errors";

export const unauthorizedError = () =>
    createHttpError(403, new Error("Unauthorized"));

export const passwordInvalidError = () =>
    createHttpError(400, new Error("Password Invalid"));

export const fieldRequiredError = (fieldName: string) =>
    createHttpError(400, new Error(`${fieldName} is Required.`));
    
export const userExistsError = (username: string) =>
    createHttpError(400, new Error(`${username} already exists`));
