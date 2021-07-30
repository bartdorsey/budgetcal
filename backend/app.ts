import express, { ErrorRequestHandler } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import logger from 'morgan';
const secret = process.env.SESSION_SECRET || "secret";
import debug from 'debug';
const appError = debug('app:error');

import apiRouter from './routes/api';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret,
    saveUninitialized: true,
    resave: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    }
}));

app.use('/api', apiRouter);

app.use(((error, req, res, next) => {
    appError(error);
    res.status(error.statusCode).json(error);
}) as ErrorRequestHandler);

export default app;