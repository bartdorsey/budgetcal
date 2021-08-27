import Knex from 'knex';
import knexFile from './knexfile.js';

const env = process.env.NODE_ENV ?? 'development';

const config = {
    ...knexFile[env]
}

const knex =  Knex(config)

export default knex;