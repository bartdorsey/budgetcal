import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { AppErrorHandler } from './errors.js';
import apiRouter from './routes/api.js';
import 'reflect-metadata';

const secret = process.env.SESSION_SECRET || "secret";

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(secret));
app.use(express.static(path.resolve('public')));

app.use('/api', apiRouter);

app.use(AppErrorHandler);

export default app;