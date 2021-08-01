import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import type { Dialect } from 'sequelize';
import configJSON from './config/config.json';
import sequelizePrettyLogger from 'sequelize-pretty-logger';
import path from 'path';
import { User } from './models/User';
import { Budget } from './models/Budget';
import { UserBudget } from './models/UserBudget';
const env = process.env.NODE_ENV || 'development';
const database_url = process.env.DATABASE_URL;
const config = configJSON as Config;


type EnvironmentConfig = {
  dialect: string,
  use_env_variable?: string
}

type Config = {
  [environment: string]: EnvironmentConfig
}

const options: SequelizeOptions = {
  dialect: config[env].dialect as Dialect,
  logging: sequelizePrettyLogger(),
  models: [path.resolve(__dirname, 'models')]
}

if (!database_url) {
  throw new Error("You must set a DATABASE_URL");
}

const sequelize: Sequelize = new Sequelize(database_url, options);

export default sequelize;