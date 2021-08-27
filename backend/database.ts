import { createConnection } from 'typeorm';

import config from './ormconfig.js';

export async function initialize () {
    const connection = await createConnection(config);
    return connection;
}
