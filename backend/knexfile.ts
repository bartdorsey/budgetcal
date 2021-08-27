import { URL } from 'url';
const database_url =
    process.env.DATABASE_URL ?? 'postgres://localhost:5432/budgetcal_dev';
const database_config = new URL(database_url);
const database = database_config.pathname.slice(1);

// Update with your config settings.
interface AppConfig {
    [environment: string]: any;
}

const config: AppConfig = {
    development: {
        client: 'pg',
        connection: {
            database: database,
            user: database_config.username,
            password: database_config.password,
            host: database_config.hostname,
            port: database_config.port           
        },
        migrations: {
          tableName: 'migrations'
        },
        pool: { min: 0, max: 7}
    },

    staging: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },

    production: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },
};

export default config;
