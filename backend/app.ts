import express from 'express';
import { Sequelize } from 'sequelize';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import logger from 'morgan';
import connectSessionSequelize from 'connect-session-sequelize';
import sequelize from './sequelizeSetup';
import { AppErrorHandler } from './routes/errors';
import apiRouter from './routes/api';
import 'reflect-metadata';

const secret = process.env.SESSION_SECRET || "secret";
const storeConstructor = connectSessionSequelize(session.Store);

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

app.use(AppErrorHandler);

export default app;