import { URL } from 'url';
import path from 'path';
import debug from 'debug';
const database_url = process.env.DATABASE_URL;
const database_config = new URL(database_url);
const env = process.env.NODE_ENV || 'development';

const config = {
    "development": {
        "username": database_config.username,
        "password": database_config.password,
        "host": database_config.host,
        "port": database_config.port,
        "database": path.basename(database_config.pathname),
        "dialect": "postgres",
        "seederStorage": "sequelize"
    },
    "test": {
        "dialect": "sqlite",
        "storage": ":memory:",
        "seederStorage": "sequelize"
    },
    "production": {
        "username": database_config.username,
        "password": database_config.password,
        "host": database_config.host,
        "port": database_config.port,
        "database": path.basename(database_config.pathname),
        "dialect": "postgres",
        "seederStorage": "sequelize"
    }
};
debug('app:config')(config[env]);

export default config;