import express from 'express';
import { Sequelize } from 'sequelize';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import logger from 'morgan';
import connectSessionSequelize from 'connect-session-sequelize';
import sequelize from './sequelizeSetup.js';
import { AppErrorHandler } from './routes/errors.js';
import apiRouter from './routes/api.js';
// import { createConnection } from 'typeorm';
import 'reflect-metadata';

const [_, __dirname] = path.dirname(import.meta.url).split(':');

const secret = process.env.SESSION_SECRET || "secret";
const storeConstructor = connectSessionSequelize(session.Store);

// const connection = await createConnection();

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