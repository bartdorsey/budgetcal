import { Model } from 'objection';
import Budget from './Budget.js';
import knex from '../database';

interface User {
    id: number,
    username: string,
    email: string,
    hashedPassword: string,
    created_at: Date,
    updated_at: Date
}

class User extends Model {
    static override tableName = 'users';
    
    static override relationMappings = {
        budgets: {
            relation: Model.ManyToManyRelation,
            modelClass: Budget,
            join: {
                from: 'users.id',
                through: {
                    from: 'users_budgets.user_id',
                    to: 'users_budgets.budget_id'
                },
                to: 'budgets.id'
            }
        }
    }
    async budgets() {
        return this.$relatedQuery('budgets');
    }
    safe() {
        return this.$omit('hashedPassword');
    }
}

User.knex(knex);

export default User;
