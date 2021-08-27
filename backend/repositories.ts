import Budget from './entities/Budget.js';
import User from './entities/User.js';
import { Connection, Repository } from 'typeorm';

export interface RepositoryList {
    [repositoryName: string]: Repository<any>
}

export default async function getRepositories(connection: Connection) : Promise<RepositoryList> {
    return {
        userRepository: connection.getRepository(User),
        budgetRepository: connection.getRepository(Budget)
    }
}