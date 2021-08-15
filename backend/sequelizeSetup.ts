import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import path from 'path';
import type { Dialect } from 'sequelize';
import config from './config/config.js';
import sequelizePrettyLogger from 'sequelize-pretty-logger';
import debug from 'debug';
const sqlLogger = debug('sequelize:sql')

const env = process.env.NODE_ENV || 'development';

const options: SequelizeOptions = {
  ...config[env],
  dialect: config[env].dialect as Dialect,
  logging: sequelizePrettyLogger({logger: sqlLogger}),
  models: [path.resolve(__dirname, 'models')]
}

const sequelize: Sequelize = new Sequelize(options);

export default sequelize;