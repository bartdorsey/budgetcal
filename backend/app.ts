import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { AppErrorHandler } from './errors.js';
import apiRouter from './routes/api.js';
import 'reflect-metadata';
import type { Express } from 'express';
import { initialize } from './database.js';
import getRepositories from './repositories.js';

const secret = process.env.SESSION_SECRET || "secret";

const createApp: () => Promise<Express> = async () => {
    const connection = await initialize();
    const repositories = await getRepositories(connection);

    const app = express();

    app.use(logger('dev'));
    app.use(express.json());
    app.use(({}, res, next) => {
        res.locals.repositories = repositories
        next();
    });
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser(secret));
    app.use(express.static(path.resolve('public')));

    app.use('/api', apiRouter);

    app.use(AppErrorHandler);

    return app;
}

export default createApp;