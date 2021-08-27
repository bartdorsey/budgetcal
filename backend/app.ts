import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import logger from 'morgan';
import { AppErrorHandler } from './errors.js';
import apiRouter from './routes/api.js';
import 'reflect-metadata';
import knex from './database';
import connectPGSimple from 'connect-pg-simple';
import { Pool } from 'pg';
const pgSession = connectPGSimple(session);

const secret = process.env.SESSION_SECRET || "secret";

const pool = new Pool({
    ...knex.client.config.connection
});

const store = new pgSession({
    pool: pool,
    tableName: 'sessions'
});

const app = express();

app.use(session({
    secret,
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        sameSite: 'strict'
    },
    store
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(secret));
app.use(express.static(path.resolve('public')));

app.use('/api', apiRouter);

app.use(AppErrorHandler);

export default app;