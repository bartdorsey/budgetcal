import Umzug from 'umzug';
import path from 'path';
import sequelize from './sequelizeSetup';

const umzug = new Umzug({
    migrations: {
        path: path.join(__dirname, 'migrations'),
        params: [sequelize.getQueryInterface()],
    },
    storage: 'sequelize',
    storageOptions: {
        sequelize: sequelize,
    },
});

export async function migrateAll() {
    try {
        await umzug.up();
    }
    catch(error) {
        console.error(error);
    }
}
