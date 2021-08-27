import { URL } from 'url';
import path from 'path';
import debug from 'debug';
const database_url = process.env.DATABASE_URL ?? 'postgres://localhost:5432/budgetcal_dev';
const database_config = new URL(database_url);
const env = process.env.NODE_ENV || 'development';
import type { ConnectionOptions } from 'typeorm';

interface AppConfig {
    [environment: string]: ConnectionOptions
}

// const entitiesPath = path.resolve('dist/entities');

// const entities = [];
// const files = fs.readdirSync(entitiesPath);

// for (const file of files) {
//     const { default: entity } = await import(path.join(entitiesPath, file));
//     entities.push(entity);
// }

const commonConfig: Partial<ConnectionOptions> = {
    entities: ['dist/entities/*.js'],
    migrations: ['dist/migrations/*.js'],
    cli: {
        migrationsDir: path.resolve('migrations'),
        entitiesDir: path.resolve('entities')
    }
}

const config: AppConfig = {
    development: {
        ...commonConfig,
        username: database_config.username,
        password: database_config.password,
        host: database_config.hostname,
        port: Number(database_config.port),
        database: path.basename(database_config.pathname),
        type: "postgres",
        logging: "all",
    },
    test: {
        ...commonConfig,
        type: "sqlite",
        database: ":memory:"
    },
    production: {
        ...commonConfig,
        username: database_config.username,
        password: database_config.password,
        host: database_config.hostname,
        port: Number(database_config.port),
        database: path.basename(database_config.pathname),
        type: "postgres",
        logging: false,
    }
};
debug('app:config')(config[env]);

export default config[env];