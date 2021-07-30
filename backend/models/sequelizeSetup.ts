import { Sequelize } from 'sequelize';
import type { Options, Dialect } from 'sequelize';
import configJSON from '../config/config.json';
import sequelizePrettyLogger from 'sequelize-pretty-logger';
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

const options: Options = {
  dialect: config[env].dialect as Dialect,
  logging: sequelizePrettyLogger()
}

let sequelize: Sequelize;

if (!database_url) {
  throw new Error("You must set a DATABASE_URL");
}

sequelize = new Sequelize(database_url, options);

export default sequelize;