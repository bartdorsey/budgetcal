import express, { ErrorRequestHandler } from 'express';
import { Sequelize } from 'sequelize';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import logger from 'morgan';
import connectSessionSequelize from 'connect-session-sequelize';
import sequelize from './sequelizeSetup';
const secret = process.env.SESSION_SECRET || "secret";
import debug from 'debug';
const appError = debug('app:error');
const storeConstructor = connectSessionSequelize(session.Store);

import apiRouter from './routes/api';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const store = new storeConstructor({db:sequelize as Sequelize});

app.use(session({
    store,
    secret,
    saveUninitialized: true,
    resave: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    }
}));

store.sync();

app.use('/api', apiRouter);

app.use(((error, req, res, next) => {
    
    appError(error);
    if (error.statusCode) {
        res.status(error.statusCode)
    } else {
        res.status(400)
    }
    res.json({
        ...error,
        message: error.message
    });
}) as ErrorRequestHandler);

export default app;