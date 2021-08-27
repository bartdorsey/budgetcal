import knex from './database.js';

export interface User {
    id: number,
    username: string,
    email: string,
    hashedPassword: string
}

export interface Budget {
    id: number,
    name: string,
    amount: number,
    icon: string,
    color: string
}

export const userRepository = knex('users');
export const budgetRepository = knex('budgets');
