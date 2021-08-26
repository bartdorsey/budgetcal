import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import path from 'path';
import { promises as fs } from 'fs';
import type { Dialect } from 'sequelize';
import config from './config/config.js';
import sequelizePrettyLogger from 'sequelize-pretty-logger';
import debug from 'debug';
const sqlLogger = debug('sequelize:sql')
const sqlSetupLogger = debug('sequelizeSetup');

const env = process.env.NODE_ENV || 'development';

const [_, __dirname] = path.dirname(import.meta.url).split(':');

const files = await fs.readdir(path.resolve(__dirname, 'models'));
const models = [];
for (const file of files) {
  const { default: model } = await import(path.resolve(__dirname, 'models', file));
  sqlSetupLogger(`Imported ${model.name}`);
  models.push(model);
}

const options: SequelizeOptions = {
  ...config[env],
  dialect: config[env].dialect as Dialect,
  logging: sequelizePrettyLogger({logger: sqlLogger}),
  models
}

const sequelize: Sequelize = new Sequelize(options);

export default sequelize;